export type httpGetParams = {
    url: string
}

export interface HttpGetClient {
    get(params: httpGetParams):Promise<void>;
}