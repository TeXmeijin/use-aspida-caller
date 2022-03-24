import { act, renderHook } from "@testing-library/react-hooks";
import { vi } from "vitest";
import { useApiSenderAspida } from "../";

describe("postメソッドのみがある場合", () => {
  const postApi = {
    $post: (props: { title: string }) =>
      new Promise((resolve) => resolve(props.title)),
  };
  const postApiError = {
    $post: () => new Promise((resolve, reject) => reject(new Error("error!!"))),
  };

  test("POST APIを呼び出すことができ、フラグなども正しく設定されている", async () => {
    const { result } = renderHook(() =>
      useApiSenderAspida(postApi, { method: "$post" })
    );
    let response;

    await act(async () => {
      response = await result.current.send({ title: "this is title" });
    });

    expect(result.current.isSending).toBeFalsy();
    expect(result.current.isSendSuccessful).toBeTruthy();
    expect(response).toBe("this is title");
  });
  test("Methodを指定しない場合はデフォルトでPOST APIが呼び出される", async () => {
    const { result } = renderHook(() => useApiSenderAspida(postApi));
    let response;

    await act(async () => {
      response = await result.current.send({ title: "this is title2" });
    });

    expect(result.current.isSending).toBeFalsy();
    expect(result.current.isSendSuccessful).toBeTruthy();
    expect(response).toBe("this is title2");
  });
  test("例外が発生した場合、throwされる。また、onErrorメソッドが呼ばれている", async () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();
    const { result } = renderHook(() =>
      useApiSenderAspida(postApiError, { onSuccess, onError })
    );

    let errorMessage;
    await act(async () => {
      await result.current.send({}).catch((err) => {
        errorMessage = err.message as string;
      });
    });

    expect(errorMessage).toBeTruthy();
    expect(errorMessage).toEqual("error!!");
    expect(result.current.error?.message).toEqual("error!!");
    expect(result.current.isSending).toBeFalsy();
    expect(result.current.isSendSuccessful).toBeFalsy();
    expect(onSuccess.mock.calls.length).toBe(0);
    expect(onError.mock.calls.length).toBe(1);
  });
  test("onSuccessメソッドが成功時に呼ばれている", async () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();
    const { result } = renderHook(() =>
      useApiSenderAspida(postApi, { method: "$post", onSuccess, onError })
    );
    let response;

    await act(async () => {
      response = await result.current.send({ title: "this is title" });
    });

    expect(result.current.isSending).toBeFalsy();
    expect(result.current.isSendSuccessful).toBeTruthy();
    expect(response).toBe("this is title");
    expect(onSuccess.mock.calls.length).toBe(1);
    expect(onError.mock.calls.length).toBe(0);
  });
});

describe("POST/PUT/DELETEメソッドがある場合", () => {
  const postAndPutApi = {
    $post: (props: { title: string }) =>
      new Promise((resolve) => resolve(props.title)),
    $put: (props: { title: string }) =>
      new Promise((resolve) => props.title && resolve("this is put method")),
    $delete: (props: { title: string }) =>
      new Promise((resolve) => props.title && resolve("this is delete method")),
  };

  test("POST APIを呼び出すことができ、フラグなども正しく設定されている", async () => {
    const { result } = renderHook(() =>
      useApiSenderAspida(postAndPutApi, { method: "$post" })
    );
    let response;

    await act(async () => {
      response = await result.current.send({ title: "this is title" });
    });

    expect(result.current.isSending).toBeFalsy();
    expect(result.current.isSendSuccessful).toBeTruthy();
    expect(response).toBe("this is title");
  });
  test("デフォルトでPOST APIを呼び出すことができ、フラグなども正しく設定されている", async () => {
    const { result } = renderHook(() => useApiSenderAspida(postAndPutApi));
    let response;

    await act(async () => {
      response = await result.current.send({ title: "this is title" });
    });

    expect(result.current.isSending).toBeFalsy();
    expect(result.current.isSendSuccessful).toBeTruthy();
    expect(response).toBe("this is title");
  });
  test("PUT APIを呼び出すことができ、フラグなども正しく設定されている", async () => {
    const { result } = renderHook(() =>
      useApiSenderAspida(postAndPutApi, { method: "$put" })
    );
    let response;

    await act(async () => {
      response = await result.current.send({ title: "this is title" });
    });

    expect(result.current.isSending).toBeFalsy();
    expect(result.current.isSendSuccessful).toBeTruthy();
    expect(response).toBe("this is put method");
  });
  test("DELETE APIを呼び出すことができ、フラグなども正しく設定されている", async () => {
    const { result } = renderHook(() =>
      useApiSenderAspida(postAndPutApi, { method: "$delete" })
    );
    let response;

    await act(async () => {
      response = await result.current.send({ title: "this is title" });
    });

    expect(result.current.isSending).toBeFalsy();
    expect(result.current.isSendSuccessful).toBeTruthy();
    expect(response).toBe("this is delete method");
  });
});
