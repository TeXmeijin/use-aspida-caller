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
          response: getResponse,
        } = useSingleAspida(api.$get, options);
        return { get, isGetting, isGetSuccessful, getError, getResponse };
      })()
      : {}),
    ...(api.$post
      ? (() => {
        const {
          send: post,
          isSending: isPosting,
          isSendSuccessful: isPostSuccessful,
          error: postError,
          response: postResponse,
        } = useSingleAspida(api.$post, options);
        return { post, isPosting, isPostSuccessful, postError, postResponse };
      })()
      : {}),
    ...(api.$put
      ? (() => {
        const {
          send: put,
          isSending: isPutting,
          isSendSuccessful: isPutSuccessful,
          error: putError,
          response: putResponse,
        } = useSingleAspida(api["$put"], options);
        return { put, isPutting, isPutSuccessful, putError, putResponse };
      })()
      : {}),
    ...(api.$delete
      ? (() => {
        const {
          send: deleteApi,
          isSending: isDeleting,
          isSendSuccessful: isDeleteSuccessful,
          error: deleteError,
          response: deleteResponse,
        } = useSingleAspida(api["$delete"], options);
        return { deleteApi, isDeleting, isDeleteSuccessful, deleteError, deleteResponse };
      })()
      : {}),
    ...(api.$patch
      ? (() => {
        const {
          send: patch,
          isSending: isPatching,
          isSendSuccessful: isPatchSuccessful,
          error: patchError,
          response: patchResponse,
        } = useSingleAspida(api.$patch, options);
        return { patch, isPatching, isPatchSuccessful, patchError, patchResponse };
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
  response: any | undefined;
  send: typeof method;
} = (method, options) => {
  const [isSending, setIsSending] = useState(false);
  const [isSendSuccessful, setIsSendSuccessful] = useState(false);
  const [error, setError] = useState<Error>();
  const [response, setResponse] = useState<any>();
  const send: typeof method = useCallback(
    async (sendProps) => {
      setIsSending(true);
      return await method(sendProps)
        .then((res) => {
          setIsSendSuccessful(true);
          setError(undefined);
          setResponse(res);
          options?.onSuccess && options.onSuccess();
          return res;
        })
        .catch((err: unknown) => {
          options?.onError && options.onError(err);
          setResponse(undefined);
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
    response,
    send,
  };
};
