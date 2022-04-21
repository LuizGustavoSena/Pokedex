import { HttpResponse } from "./http-response";

export type httpGetParams = {
    url: string
}

export interface HttpGetClient {
    get(params: httpGetParams):Promise<HttpResponse>;
}