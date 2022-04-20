import { HttpGetClient, httpGetParams } from "../protocols/http/http-get-client";

export class HttpGetClientSpy implements HttpGetClient {
    url?: string;

    async get(params: httpGetParams): Promise<void> {
        this.url = params.url;
        return Promise.resolve();
    }
}