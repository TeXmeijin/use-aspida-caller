import { useCallback, useState } from "react";
import { AllResult, AspidaMethods } from "../types/index";

type Options = {
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
};
type Func = <T extends AspidaMethods>(
  api: T,
  options?: Options
) => AllResult<T>;

export const useAspidaCaller: Func = (api, options) => {
  return {
    ...(api.$get
      ? (() => {
          const {
            send: get,
            isSending: isGetting,
            isSendSuccessful: isGetSuccessful,
            error: getError,
          } = useSingleAspida(api.$get, options);
          return { get, isGetting, isGetSuccessful, getError };
        })()
      : {}),
    ...(api.$post
      ? (() => {
          const {
            send: post,
            isSending: isPosting,
            isSendSuccessful: isPostSuccessful,
            error: postError,
          } = useSingleAspida(api.$post, options);
          return { post, isPosting, isPostSuccessful, postError };
        })()
      : {}),
    ...(api.$put
      ? (() => {
          const {
            send: put,
            isSending: isPutting,
            isSendSuccessful: isPutSuccessful,
            error: putError,
          } = useSingleAspida(api["$put"], options);
          return { put, isPutting, isPutSuccessful, putError };
        })()
      : {}),
    ...(api.$delete
      ? (() => {
          const {
            send: deleteApi,
            isSending: isDeleting,
            isSendSuccessful: isDeleteSuccessful,
            error: deleteError,
          } = useSingleAspida(api["$delete"], options);
          return { deleteApi, isDeleting, isDeleteSuccessful, deleteError };
        })()
      : {}),
    ...(api.$patch
      ? (() => {
          const {
            send: patch,
            isSending: isPatching,
            isSendSuccessful: isPatchSuccessful,
            error: patchError,
          } = useSingleAspida(api.$patch, options);
          return { patch, isPatching, isPatchSuccessful, patchError };
        })()
      : {}),
  } as AllResult<typeof api>;
};

const useSingleAspida: (
  method: (option: unknown) => Promise<any>,
  options?: Options
) => {
  error: Error | undefined;
  isSending: boolean;
  isSendSuccessful: boolean;
  send: typeof method;
} = (method, options) => {
  const [isSending, setIsSending] = useState(false);
  const [isSendSuccessful, setIsSendSuccessful] = useState(false);
  const [error, setError] = useState<Error>();
  const send: typeof method = useCallback(
    async (sendProps) => {
      setIsSending(true);
      return await method(sendProps)
        .then((res) => {
          setIsSendSuccessful(true);
          setError(undefined)
          options?.onSuccess && options.onSuccess();
          return res;
        })
        .catch((err: unknown) => {
          options?.onError && options.onError(err);
          if (err instanceof Error) {
            setError(err);
            throw err;
          }
          throw new Error();
        })
        .finally(() => {
          setIsSending(false);
        });
    },
    [method, options]
  );

  return {
    error,
    isSending,
    isSendSuccessful,
    send,
  };
};
