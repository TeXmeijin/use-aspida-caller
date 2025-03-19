import { expectAssignable } from "tsd";
import { AllResult } from "..";

expectAssignable<
  AllResult<{
    $get: (props: { title: string }) => Promise<string>;
  }>
>({
  get: async (props: { title: string }) => props.title,
  isGetting: false,
  isGetSuccessful: false,
  getError: new Error(),
  getResponse: "response data",
});
expectAssignable<
  AllResult<{
    $post: (props: { title: string }) => Promise<string>;
  }>
>({
  post: async (props: { title: string }) => props.title,
  isPosting: false,
  isPostSuccessful: false,
  postError: new Error(),
  postResponse: "response data",
});
expectAssignable<
  AllResult<{
    $put: (props: { title: string }) => Promise<string>;
  }>
>({
  put: async (props: { title: string }) => props.title,
  isPutting: false,
  isPutSuccessful: false,
  putError: new Error(),
  putResponse: "response data",
});
expectAssignable<
  AllResult<{
    $delete: (props: { title: string }) => Promise<string>;
  }>
>({
  deleteApi: async (props: { title: string }) => props.title,
  isDeleting: false,
  isDeleteSuccessful: false,
  deleteError: new Error(),
  deleteResponse: "response data",
});
expectAssignable<
  AllResult<{
    $patch: (props: { title: string }) => Promise<string>;
  }>
>({
  patch: async (props: { title: string }) => props.title,
  isPatching: false,
  isPatchSuccessful: false,
  patchError: new Error(),
  patchResponse: "response data",
});
expectAssignable<
  AllResult<{
    $post: (props: { title: string }) => Promise<string>;
    $put: (props: { title: string }) => Promise<string>;
  }>
>({
  post: async (props: { title: string }) => props.title,
  isPosting: false,
  isPostSuccessful: false,
  postError: new Error(),
  postResponse: "response data",
  put: async (props: { title: string }) => props.title,
  isPutting: false,
  isPutSuccessful: false,
  putError: new Error(),
  putResponse: "response data",
});
expectAssignable<
  AllResult<{
    $post: (props: { title: string }) => Promise<string>;
    $delete: (props: { title: string }) => Promise<string>;
  }>
>({
  post: async (props: { title: string }) => props.title,
  isPosting: false,
  isPostSuccessful: false,
  postError: new Error(),
  postResponse: "response data",
  deleteApi: async (props: { title: string }) => props.title,
  isDeleting: false,
  isDeleteSuccessful: false,
  deleteError: new Error(),
  deleteResponse: "response data",
});
expectAssignable<
  AllResult<{
    $patch: (props: { title: string }) => Promise<string>;
    $delete: (props: { title: string }) => Promise<string>;
  }>
>({
  patch: async (props: { title: string }) => props.title,
  isPatching: false,
  isPatchSuccessful: false,
  patchError: new Error(),
  patchResponse: "response data",
  deleteApi: async (props: { title: string }) => props.title,
  isDeleting: false,
  isDeleteSuccessful: false,
  deleteError: new Error(),
  deleteResponse: "response data",
});
expectAssignable<
  AllResult<{
    $get: (props: { title: string }) => Promise<string>;
    $post: (props: { title: string }) => Promise<string>;
    $put: (props: { title: string }) => Promise<string>;
    $patch: (props: { title: string }) => Promise<string>;
    $delete: (props: { title: string }) => Promise<string>;
  }>
>({
  get: async (props: { title: string }) => props.title,
  isGetting: false,
  isGetSuccessful: false,
  getError: new Error(),
  getResponse: "response data",
  post: async (props: { title: string }) => props.title,
  isPosting: false,
  isPostSuccessful: false,
  postError: new Error(),
  postResponse: "response data",
  put: async (props: { title: string }) => props.title,
  isPutting: false,
  isPutSuccessful: false,
  putError: new Error(),
  putResponse: "response data",
  patch: async (props: { title: string }) => props.title,
  isPatching: false,
  isPatchSuccessful: false,
  patchError: new Error(),
  patchResponse: "response data",
  deleteApi: async (props: { title: string }) => props.title,
  isDeleting: false,
  isDeleteSuccessful: false,
  deleteError: new Error(),
  deleteResponse: "response data",
});
