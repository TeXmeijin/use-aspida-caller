## use-sender-aspida-hooks

React Hooks for getting callers and states by aspida.

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

## TODO

- [ ] ❤️ READMEにaspidaなどの背景知識を記載
- [ ] ❤️ READMEに解決したい課題を記載
- [ ] ❤️ aspidaのメソッドに応じて返り値のオブジェクトのキーが変わる点を記載
- [ ] ❤️ ステータスを返すことで、フォームでの用途に特に便利である点を記載
- [ ] 💀 細かいテストケースが網羅できていないので地道に追加
- [ ] 💀 テストは通っているが実際に使ったわけではないので実アプリケーションにて挙動を確認する
- [ ] ⏳ GitHub Actionsを用いて、Pull Requestに対してLint、TSCを実行する
- [ ] ⏳ GitHub Actionsを用いて、npm publish周りのワークフローを自動化できないか調べる/実践する
- [ ] 😊 contributeセクションを作成し、tsdによる型テストと、vitestによるユニットテストを記載している点を明記
- [ ] 🎌 英語版READMEを作成、日本語版と切り替えられるようにする(本家aspidaなどを参考)
- [ ] 🎌 日本語にて解説記事を書いて公開
- [ ] 🎌 英語にて解説記事を書いて公開