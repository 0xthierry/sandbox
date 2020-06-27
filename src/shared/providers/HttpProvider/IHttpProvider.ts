/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRequestOptions {
  auth?: {
    password: string;
    username: string;
  };
  baseURL?: string;
  data?: any;
  headers?: any;
  params?: any;
  url?: string;
  responseType?:
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'stream'
    | 'text';
  method?:
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'patch'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'
    | 'link'
    | 'LINK'
    | 'unlink'
    | 'UNLINK'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'patch'
    | undefined;
}

export interface IResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: IRequestOptions;
  request?: any;
}

export default interface IHttpProvider {
  get<T = any>(
    url: string,
    options?: IRequestOptions | undefined,
  ): Promise<IResponse<T>>;
  put<T = any>(
    url: string,
    options?: IRequestOptions | undefined,
  ): Promise<IResponse<T>>;
  delete<T = any>(
    url: string,
    options?: IRequestOptions | undefined,
  ): Promise<IResponse<T>>;
  patch<T = any>(
    url: string,
    options?: IRequestOptions | undefined,
  ): Promise<IResponse<T>>;
  post<T = any>(
    url: string,
    options?: IRequestOptions | undefined,
  ): Promise<IResponse<T>>;
  request<T = any>(options: IRequestOptions): Promise<IResponse<T>>;
}
