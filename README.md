## use-sender-aspida-hooks

React Hooks for POST/PUT/DELETE requests by aspida

⚠️This hook is PoC.⚠️

## Usage

```tsx
const AwesomeComponent = () => {
    const { send, isSending, isSendSuccessful, error } = useApiSenderAspida(apiClient.person, { method: "$post" })
    const onSubmit = useCallback(async () => {
        await send({
            body: {
                name: personName
            }
        })
    })

    return (
        <View>
            <Text>{error.message}</Text>
            <Input value={personName} onChangeText={setPersonName}></Input>
            <Button isLoading={isSending} isDisabled={isSending || isSendSuccessful} onClick={onSubmit}>Send</Button>
        </View>
    )
}
```