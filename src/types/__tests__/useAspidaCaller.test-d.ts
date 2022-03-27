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
  put: async (props: { title: string }) => props.title,
  isPutting: false,
  isPutSuccessful: false,
  putError: new Error(),
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
  deleteApi: async (props: { title: string }) => props.title,
  isDeleting: false,
  isDeleteSuccessful: false,
  deleteError: new Error(),
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
  deleteApi: async (props: { title: string }) => props.title,
  isDeleting: false,
  isDeleteSuccessful: false,
  deleteError: new Error(),
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
  post: async (props: { title: string }) => props.title,
  isPosting: false,
  isPostSuccessful: false,
  postError: new Error(),
  put: async (props: { title: string }) => props.title,
  isPutting: false,
  isPutSuccessful: false,
  putError: new Error(),
  patch: async (props: { title: string }) => props.title,
  isPatching: false,
  isPatchSuccessful: false,
  patchError: new Error(),
  deleteApi: async (props: { title: string }) => props.title,
  isDeleting: false,
  isDeleteSuccessful: false,
  deleteError: new Error(),
});
