import { useCallback, useState } from 'react';

type SendAspidaApi<Method extends '$post' | '$put' | '$delete', PropsType, ReturnType> = {
  [k in Method]: (props: PropsType) => Promise<ReturnType>;
};

type ReturnValue<PropType, ReturnType> = {
  send: (params: PropType) => Promise<ReturnType>;
  isSending: boolean;
  isSendSuccessful: boolean;
  error: Error | undefined;
};

type Func = <M extends '$post' | '$put' | '$delete', PropsType, ReturnType>(
  api: SendAspidaApi<M, PropsType, ReturnType>,
  options?: {
    method?: M;
    onSuccess?: () => void;
    onError?: (err: unknown) => void;
  },
) => ReturnValue<PropsType, ReturnType>;

export const useApiSenderAspida: Func = (api, options) => {
  const [isSending, setIsSending] = useState(false);
  const [isSendSuccessful, setIsSendSuccessful] = useState(false);
  const [error, setError] = useState<Error>();

  const method = (options?.method ?? '$post') as NonNullable<NonNullable<typeof options>['method']>;
  const send: typeof api[typeof method] = useCallback(
    async (sendProps) => {
      setIsSending(true);
      return await api[method](sendProps)
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
    [api, method, options],
  );

  return {
    send,
    isSending,
    isSendSuccessful,
    error,
  };
};
