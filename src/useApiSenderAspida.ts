import { useCallback, useState } from "react";

type AspidaMethods = "$post" | "$put" | "$delete" | "$patch";
type AspidaApiAny = {
  $post?: (option: any) => Promise<any>;
  $put?: (option: any) => Promise<any>;
  $delete?: (option: any) => Promise<any>;
  $patch?: (option: any) => Promise<any>;
};
type PickPost<T> = T extends {
  $post?: infer Post;
}
  ? Post
  : never;

function useAspidaSender<Api extends { $post: () => unknown }>(
  api: Api
): PickPost<Api> {
  return api.$post;
}

// type ResponseData<T extends (option: unknown) => Promise<any>> =
//   ReturnType<T> extends Promise<infer S> ? S : never;

// type SendAspidaApi<
//   T extends {
//     $post?: (option: unknown) => Promise<any>;
//     $put?: (option: unknown) => Promise<any>;
//     $delete?: (option: unknown) => Promise<any>;
//     $patch?: (option: unknown) => Promise<any>;
//   }
// > = T extends {
//   $post?: infer Post;
//   $put?: infer Put;
//   $delete?: infer Delete;
//   $patch?: infer Patch;
// }
//   ? {
//       $post?: Post;
//       $put?: Put;
//       $delete?: Delete;
//       $patch?: Patch;
//     }
//   : never;

type ReturnValue<Post, Put, Delete, Patch> = ("$post" extends keyof T
  ? {
      post: Post;
      isPosting: boolean;
      isPostSuccessful: boolean;
      postError: Error | undefined;
    }
  : Record<string, never>) &
  ("$put" extends keyof T
    ? {
        put: Put;
        isPutting: boolean;
        isPutSuccessful: boolean;
        putError: Error | undefined;
      }
    : Record<string, never>) &
  ("$delete" extends keyof T
    ? {
        deleteApi: Delete;
        isDeleting: boolean;
        isDeleteSuccessful: boolean;
        deleteError: Error | undefined;
      }
    : Record<string, never>) &
  ("$patch" extends keyof T
    ? {
        patch: Patch;
        isPatching: boolean;
        isPatchSuccessful: boolean;
        patchError: Error | undefined;
      }
    : Record<string, never>);

type Options = {
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
};
type Func = <
  T extends {
    $post?: (option: any) => Promise<any>;
    $put?: (option: any) => Promise<any>;
    $delete?: (option: any) => Promise<any>;
    $patch?: (option: any) => Promise<any>;
  }
>(
  api: T,
  options?: Options
) => T extends {
  $post?: infer Post;
  $put?: infer Put;
  $delete?: infer Delete;
  $patch?: infer Patch;
}
  ? ReturnValue<Post, Put, Delete, Patch>
  : never;

export const useApiSenderAspida: Func = (api, options) => {
  return {
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
  };
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
