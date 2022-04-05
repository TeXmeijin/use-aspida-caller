## useAspidaCaller

React Hooks for calling type-safe REST APIs with aspida.

⚠️This hook is PoC.⚠️

## Usage

```tsx
const Home: NextPage = () => {
  const [getResult, setGetResult] = useState<{ name: string }>();
  const {
    get,
    isGetting,
    isGetSuccessful,
    getError,
    put,
    isPutting,
    isPutSuccessful,
    putError,
  } = useAspidaCaller(client.people._id(1));

  const handleGetClick = async () => {
    setGetResult(await get({ query: { with_detail: true } }));
  };
  const handlePutClick = async () => {
    await put({ body: { name: "hoge" } }).catch((err) => null);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <button onClick={handleGetClick}>Get Value</button>
        {isGetting && <p className={styles.description}>Loading...</p>}
        <p className={styles.description}>
          Result: {getResult?.name} / {isGetSuccessful && "Success!"}
        </p>
        <button onClick={handlePutClick}>Put Value</button>
        {isPutting && <p className={styles.description}>Loading...</p>}
        <p className={styles.description}>
          Error: {putError?.message} / {isPutSuccessful && "Success!"}
        </p>
      </main>
    </div>
  );
};
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