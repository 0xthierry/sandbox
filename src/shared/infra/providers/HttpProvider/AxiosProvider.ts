import axios, { AxiosInstance } from 'axios';
import IHttpProvider, {
  IRequestOptions,
  IResponse,
} from 'shared/providers/HttpProvider/IHttpProvider';

export default class AxiosProvider implements IHttpProvider {
  private axios: AxiosInstance;

  constructor(options?: IRequestOptions) {
    this.axios = axios.create(options);
  }

  get<T>(
    url: string,
    options?: IRequestOptions | undefined,
  ): Promise<IResponse<T>> {
    return this.axios.get<T>(url, options);
  }

  put<T>(
    url: string,
    options?: IRequestOptions | undefined,
  ): Promise<IResponse<T>> {
    return this.axios.put<T>(url, options);
  }

  delete<T>(
    url: string,
    options?: IRequestOptions | undefined,
  ): Promise<IResponse<T>> {
    return this.axios.delete<T>(url, options);
  }

  post<T>(
    url: string,
    options?: IRequestOptions | undefined,
  ): Promise<IResponse<T>> {
    return this.axios.post<T>(url, options);
  }

  patch<T>(
    url: string,
    options?: IRequestOptions | undefined,
  ): Promise<IResponse<T>> {
    return this.axios.patch<T>(url, options);
  }

  request<T>(options: IRequestOptions): Promise<IResponse<T>> {
    return this.axios.request(options);
  }
}
