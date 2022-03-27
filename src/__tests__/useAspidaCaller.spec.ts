import { act, renderHook } from "@testing-library/react-hooks";
import { vi } from "vitest";
import { useAspidaCaller } from "..";

describe("getメソッドのみがある場合", () => {
  const getApi: {
    $get: (props: { title: string }) => Promise<string>;
  } = {
    $get: (props) => new Promise((resolve) => resolve(props.title)),
  };
  test("GET APIを呼び出すことができ、フラグなども正しく設定されている", async () => {
    const { result } = renderHook(() => useAspidaCaller(getApi));
    let response = "";

    await act(async () => {
      response = await result.current.get({ title: "this is title" });
    });

    expect(result.current.isGetting).toBeFalsy();
    expect(result.current.isGetSuccessful).toBeTruthy();
    expect(result.current.getError).toBeUndefined();
    expect(response).toBe("this is title");
  });
});
describe("postメソッドのみがある場合", () => {
  const postApi: {
    $post: (props: { title: string }) => Promise<string>;
  } = {
    $post: (props) => new Promise((resolve) => resolve(props.title)),
  };
  const postApiError = {
    $post: () => new Promise((resolve, reject) => reject(new Error("error!!"))),
  };

  test("POST APIを呼び出すことができ、フラグなども正しく設定されている", async () => {
    const { result } = renderHook(() => useAspidaCaller(postApi));
    let response = "";

    await act(async () => {
      response = await result.current.post({ title: "this is title" });
    });

    expect(result.current.isPosting).toBeFalsy();
    expect(result.current.isPostSuccessful).toBeTruthy();
    expect(result.current.postError).toBeUndefined();
    expect(response).toBe("this is title");
  });
  test("例外が発生した場合、throwされる。また、onErrorメソッドが呼ばれている", async () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();
    const { result } = renderHook(() =>
      useAspidaCaller(postApiError, { onSuccess, onError })
    );

    let errorMessage;
    await act(async () => {
      await result.current.post().catch((err) => {
        errorMessage = err.message as string;
      });
    });

    expect(errorMessage).toBeTruthy();
    expect(errorMessage).toEqual("error!!");
    expect(result.current.postError?.message).toEqual("error!!");
    expect(result.current.isPosting).toBeFalsy();
    expect(result.current.isPostSuccessful).toBeFalsy();
    expect(onSuccess.mock.calls.length).toBe(0);
    expect(onError.mock.calls.length).toBe(1);
  });
  test("onSuccessメソッドが成功時に呼ばれている", async () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();
    const { result } = renderHook(() =>
      useAspidaCaller(postApi, { onSuccess, onError })
    );
    let response = "";

    await act(async () => {
      response = await result.current.post({ title: "this is title" });
    });

    expect(result.current.isPosting).toBeFalsy();
    expect(result.current.isPostSuccessful).toBeTruthy();
    expect(response).toBe("this is title");
    expect(onSuccess.mock.calls.length).toBe(1);
    expect(onError.mock.calls.length).toBe(0);
  });
  test("存在しないAPIは含まれない", () => {
    const { result } = renderHook(() => useAspidaCaller(postApi));
    expect("get" in result.current).toBe(false);
    expect("isGetting" in result.current).toBe(false);
    expect("isGetSuccessful" in result.current).toBe(false);
    expect("getError" in result.current).toBe(false);
    expect("post" in result.current).toBe(true);
    expect("isPosting" in result.current).toBe(true);
    expect("isPostSuccessful" in result.current).toBe(true);
    expect("postError" in result.current).toBe(true);
    expect("put" in result.current).toBe(false);
    expect("isPutting" in result.current).toBe(false);
    expect("isPutSuccessful" in result.current).toBe(false);
    expect("putError" in result.current).toBe(false);
    expect("deleteApi" in result.current).toBe(false);
    expect("isDeleting" in result.current).toBe(false);
    expect("isDeleteSuccessful" in result.current).toBe(false);
    expect("deleteApi" in result.current).toBe(false);
    expect("patch" in result.current).toBe(false);
    expect("isPatching" in result.current).toBe(false);
    expect("isPatchSuccessful" in result.current).toBe(false);
    expect("patchError" in result.current).toBe(false);
  });
});

describe("POST/PUT/DELETEメソッドがある場合", () => {
  const postAndPutAndDeleteApi: {
    $post: (props: { title: string }) => Promise<string>;
    $put: (props: { title: string }) => Promise<string>;
    $delete: (props: { title: string }) => Promise<string>;
  } = {
    $post: (props: { title: string }) =>
      new Promise((resolve) => resolve(props.title)),
    $put: (props: { title: string }) =>
      new Promise((resolve) => props.title && resolve("this is put method")),
    $delete: (props: { title: string }) =>
      new Promise(
        (resolve) => props.title && resolve("this is deleteApi method")
      ),
  };

  test("POST APIを呼び出すことができ、フラグなども正しく設定されている", async () => {
    const { result } = renderHook(() =>
      useAspidaCaller(postAndPutAndDeleteApi)
    );
    let response = "";

    await act(async () => {
      response = await result.current.post({ title: "this is title" });
    });

    expect(result.current.isPosting).toBeFalsy();
    expect(result.current.isPostSuccessful).toBeTruthy();
    expect(response).toBe("this is title");
  });
  test("PUT APIを呼び出すことができ、フラグなども正しく設定されている", async () => {
    const { result } = renderHook(() =>
      useAspidaCaller(postAndPutAndDeleteApi)
    );
    let response = "";

    await act(async () => {
      response = await result.current.put({ title: "this is title" });
    });

    expect(result.current.isPutting).toBeFalsy();
    expect(result.current.isPutSuccessful).toBeTruthy();
    expect(response).toBe("this is put method");
  });
  test("DELETE APIを呼び出すことができ、フラグなども正しく設定されている", async () => {
    const { result } = renderHook(() =>
      useAspidaCaller(postAndPutAndDeleteApi)
    );
    let response = "";

    await act(async () => {
      response = await result.current.deleteApi({ title: "this is title" });
    });

    expect(result.current.isDeleting).toBeFalsy();
    expect(result.current.isDeleteSuccessful).toBeTruthy();
    expect(response).toBe("this is deleteApi method");
  });
  test("存在しないAPIは含まれない", () => {
    const { result } = renderHook(() =>
      useAspidaCaller(postAndPutAndDeleteApi)
    );
    expect("get" in result.current).toBe(false);
    expect("isGetting" in result.current).toBe(false);
    expect("isGetSuccessful" in result.current).toBe(false);
    expect("getError" in result.current).toBe(false);
    expect("post" in result.current).toBe(true);
    expect("isPosting" in result.current).toBe(true);
    expect("isPostSuccessful" in result.current).toBe(true);
    expect("postError" in result.current).toBe(true);
    expect("put" in result.current).toBe(true);
    expect("isPutting" in result.current).toBe(true);
    expect("isPutSuccessful" in result.current).toBe(true);
    expect("putError" in result.current).toBe(true);
    expect("deleteApi" in result.current).toBe(true);
    expect("isDeleting" in result.current).toBe(true);
    expect("isDeleteSuccessful" in result.current).toBe(true);
    expect("deleteApi" in result.current).toBe(true);
    expect("patch" in result.current).toBe(false);
    expect("isPatching" in result.current).toBe(false);
    expect("isPatchSuccessful" in result.current).toBe(false);
    expect("patchError" in result.current).toBe(false);
  });
});
