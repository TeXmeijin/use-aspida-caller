import { SpreadTwo } from "./utils";

export type AspidaMethods = {
  $get?: (option: any) => Promise<any>;
  $post?: (option: any) => Promise<any>;
  $put?: (option: any) => Promise<any>;
  $delete?: (option: any) => Promise<any>;
  $patch?: (option: any) => Promise<any>;
};
type GetResult<
  AspidaMethods extends {
    $get?: (option: any) => Promise<any>;
  }
> = AspidaMethods extends {
  $get: infer GetAction;
}
  ? {
      get: GetAction;
      isGetting: boolean;
      isGetSuccessful: boolean;
      getError: Error | null;
    }
  : undefined;
type PostResult<
  AspidaMethods extends {
    $post?: (option: any) => Promise<any>;
  }
> = AspidaMethods extends {
  $post: infer PostAction;
}
  ? {
      post: PostAction;
      isPosting: boolean;
      isPostSuccessful: boolean;
      postError: Error | null;
    }
  : undefined;
type PutResult<
  AspidaMethods extends {
    $put?: (option: any) => Promise<any>;
  }
> = AspidaMethods extends { $put: infer PutAction }
  ? {
      put: PutAction;
      isPutting: boolean;
      isPutSuccessful: boolean;
      putError: Error | null;
    }
  : undefined;
type DeleteResult<
  AspidaMethods extends {
    $delete?: (option: any) => Promise<any>;
  }
> = AspidaMethods extends { $delete: infer PutAction }
  ? {
      deleteApi: PutAction;
      isDeleting: boolean;
      isDeleteSuccessful: boolean;
      deleteError: Error | null;
    }
  : undefined;
type PatchResult<
  AspidaMethods extends {
    $patch?: (option: any) => Promise<any>;
  }
> = AspidaMethods extends { $patch: infer PutAction }
  ? {
      patch: PutAction;
      isPatching: boolean;
      isPatchSuccessful: boolean;
      patchError: Error | null;
    }
  : undefined;

export type AllResult<M extends AspidaMethods> = SpreadTwo<
  GetResult<M>,
  SpreadTwo<
    SpreadTwo<PostResult<M>, PutResult<M>>,
    SpreadTwo<DeleteResult<M>, PatchResult<M>>
  >
>;
