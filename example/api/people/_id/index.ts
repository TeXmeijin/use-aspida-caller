export type Methods = {
  get: {
    query: {
      with_detail: boolean;
    };
    resBody: { name: string };
  };
  put: {
    reqBody: {
      name: string;
    };
    resBody: {
      status: number;
    };
  };
};
