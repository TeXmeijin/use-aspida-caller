## useAspidaCaller

REST APIを**型安全に呼び出し・状態管理ができるReact Hooks**ライブラリを書きました。

すでにaspidaを使ってREST APIを型安全に実行しており、かつReactを使っている方に**強くおすすめ**します。

https://github.com/TeXmeijin/use-aspida-caller

## install

```
npm i use-aspida-caller
yarn add use-aspida-caller
```

## 特長① ローディングやエラーなどのAPI呼び出しに関連する状態管理ができる

`useAspidaCaller`を使うと、POSTやPUTといった更新系のAPIを型安全に叩けるとともに、ローディングやエラーといった状態管理も宣言的に実装できます。

```tsx:サンプルコード
const Sample = () => {
  const {
    put,
    isPutting,
    isPutSuccessful,
    putError,
  } = useAspidaCaller(client.people._id(1));

  const handlePutClick = async () => {
    await put({ body: { name: "hoge" } }).catch((err) => null);
  };

  return (
      <Form>
        <Button isLoading={isPutting} onClick={handlePutClick}>Put Value</Button>
        {
          putError && <ErrorMessage>{putError.message}</ErrorMessage>
        }
        {
          isPutSuccessful && <SuccessMessage>送信に成功しました</SuccessMessage>
        }
      </Form>
  );
};
```

`useAspidaCaller`にaspidaで定義したAPIオブジェクトを渡すと、呼び出しメソッドとローディング、成功フラグ、エラーオブジェクトが返ってきます。各種フラグとエラーオブジェクトは呼び出しメソッドの実行に伴って内容が変化します。

たとえばフォームのSubmit時にリクエストを投げるため、ローディングやエラーをそれぞれ`useState`を使ったステートで管理している場面では、コードを**より宣言的に、かつシンプルにすることができます**。

## 特長② aspidaを用いることでリクエストおよびレスポンスが型安全になる

前節の特長だけだと[react-useのuseAsyncFn](https://github.com/streamich/react-use/blob/master/docs/useAsyncFn.md)などと特長が変わりません。

しかし本ライブラリの特筆すべきところは`aspida`を用いることでリクエストおよびレスポンスを型安全にしている点です。

aspidaについては以下のリポジトリをご覧ください。

https://github.com/aspida/aspida

aspidaを使って、`/people/{id}`のAPIに対してPUTリクエストが型定義されている場合、

```ts
export type Methods = {
  put: {
    reqBody: {
      name: string;
    };
    resBody: {
      status: number;
    };
  };
};
```

`useAspidaCaller`から返される`put`メソッドは**指定した通りのリクエストボディの型で呼び出さなければ型エラーになります。**

```ts
  const handlePutClick = async () => {
    //                ↓ここがname以外のキー名だったり、string以外を渡しているとエラーとなる
    await put({ body: { name: "hoge" } }).catch((err) => null);
  };
```

## 特長③ aspidaで定義しているHTTPアクションによって戻り値が異なる

前節の例ではputメソッドを定義しているため、`useAspidaCaller`の戻り値も`put`関連の変数でした。

```ts
  const {
    put,
    isPutting,
    isPutSuccessful,
    putError,
  } = useAspidaCaller(client.people._id(1));
```

しかし、HTTPアクションは同一のエンドポイントに対してPUTだけでなくPOSTやDELETE、GETなど定義可能です。

そこで、もとのAPI定義にたとえばPOSTが定義されている場合、`useAspidaCaller`の戻り値も`post`関連の変数で返ってくるように実装されています。

```ts
export type Methods = {
  post: {
    reqBody: {
      name: string;
    };
    resBody: {
      status: number;
    };
  };
};
```

```ts
  const {
    post,
    isPosting,
    isPostSuccessful,
    postError,
  } = useAspidaCaller(client.people._id(1));
```

もとのAPI定義に、POST、PUT、DELETEが定義されている場合、`useAspidaCaller`の戻り値にはそれら**全てに応じた**戻り値が返ってきます。

```ts
export type Methods = {
  post: {
    reqBody: {
      name: string;
    };
    resBody: {
      status: number;
    };
  };
  put: {
    reqBody: {
      name: string;
    };
    resBody: {
      status: number;
    };
  };
  delete: {
    reqBody: {};
    resBody: {
      status: number;
    };
  };
};
```

```ts
  const {
    // POSTの呼び出しメソッド、および状態変数
    post,
    isPosting,
    isPostSuccessful,
    postError,
    // PUTの呼び出しメソッド、および状態変数
    put,
    isPutting,
    isPutSuccessful,
    putError,
    // DELETEの呼び出しメソッド、および状態変数
    deleteApi,
    isDeleting,
    isDeleteSuccessful,
    deleteError,
  } = useAspidaCaller(client.people._id(1));
```

たとえば、もとのAPI定義にPUTが無い場合は`put`や`isPutting`などを利用することはできず、使おうとしても型エラーになります。

## 仕様の解説

### 対応しているHTTPアクション

GET/POST/PUT/DELETE/PATCHに対応しています。

### 戻り値の解説

`put`を例に説明します。

| キー名          | 内容                                                                                           |
| --------------- | ---------------------------------------------------------------------------------------------- |
| put             | `useAspidaCaller`に渡しているエンドポイントに対してPUTリクエストを飛ばす。引数は型定義の通り。 |
| isPutting       | `put`メソッドを実行している間`true`になる。そのため初期値は`false`。                           |
| isPutSuccessful | `put`メソッドを実行し、1度でも成功すれば`true`となる。初期値は`false`。                        |
| putError        | `put`メソッドを実行し、失敗知ればそのエラー内容が入る。初期値は`undefined`                     |

なお、DELETEメソッドの場合のみ、`deleteApi`という名前で実行用のメソッドが返ってきます。

### 詳細な挙動

テストコードを読むことで詳細な挙動を知ることができます。
[https://github.com/TeXmeijin/use-sender-aspida-hooks/blob/2273ca9a4bdf965e2c02bbd2f1b62f1a7bf4f5fa/src/__tests__/useAspidaCaller.spec.ts](https://github.com/TeXmeijin/use-sender-aspida-hooks/blob/2273ca9a4bdf965e2c02bbd2f1b62f1a7bf4f5fa/src/__tests__/useAspidaCaller.spec.ts)

---

- [x] ❤️ READMEにaspidaなどの背景知識を記載
- [x] ❤️ READMEに解決したい課題を記載
- [x] ❤️ aspidaのメソッドに応じて返り値のオブジェクトのキーが変わる点を記載
- [x] ❤️ ステータスを返すことで、フォームでの用途に特に便利である点を記載
- [ ] 💀 細かいテストケースが網羅できていないので地道に追加
- [ ] 💀 テストは通っているが実際に使ったわけではないので実アプリケーションにて挙動を確認する
- [ ] ⏳ GitHub Actionsを用いて、Pull Requestに対してLint、TSCを実行する
- [ ] ⏳ GitHub Actionsを用いて、npm publish周りのワークフローを自動化できないか調べる/実践する
- [ ] 😊 contributeセクションを作成し、tsdによる型テストと、vitestによるユニットテストを記載している点を明記
- [ ] 🎌 英語版READMEを作成、日本語版と切り替えられるようにする(本家aspidaなどを参考)
- [x] 🎌 日本語にて解説記事を書いて公開
- [ ] 🎌 英語にて解説記事を書いて公開
