## use-sender-aspida-hooks

React Hooks for POST/PUT/DELETE requests by aspida

⚠️This hook is PoC.⚠️

## Usage

```ts
const { send, isSending, isSendSuccessful, error } = useApiSenderAspida(apiClient.person, { method: "$post" })
```