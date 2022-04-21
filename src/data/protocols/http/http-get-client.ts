import { HttpResponse } from "./http-response";

export type httpGetParams = {
    url: string
}

export interface HttpGetClient<T> {
    get(params: httpGetParams):Promise<HttpResponse<T>>;
}