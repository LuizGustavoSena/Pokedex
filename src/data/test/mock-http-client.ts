import { HttpGetClient, httpGetParams, HttpResponse, HttpStatusCode } from "../protocols/http";

export class HttpGetClientSpy<T> implements HttpGetClient<T> {
    url?: string;
    response: HttpResponse<T> = {
        statusCode: HttpStatusCode.ok
    }

    async get(params: httpGetParams): Promise<HttpResponse<T>> {
        this.url = params.url;
        return Promise.resolve(this.response);
    }
}