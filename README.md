## use-sender-aspida-hooks

React Hooks for getting callers and states by aspida

⚠️This hook is PoC.⚠️

## Usage

```tsx
const AwesomeComponent = () => {
    const { post, isPosting, isPostSuccessful, postError } = useAspidaCaller(apiClient.person)
    const onSubmit = useCallback(async () => {
        await post({
            body: {
                name: personName
            }
        })
    })

    return (
        <View>
            <Text>{error.message}</Text>
            <Input value={personName} onChangeText={setPersonName}></Input>
            <Button isLoading={isPosting} isDisabled={isPosting || isPostSuccessful} onClick={onSubmit}>Send</Button>
        </View>
    )
}
```