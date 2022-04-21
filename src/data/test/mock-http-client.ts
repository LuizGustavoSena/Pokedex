import { HttpGetClient, httpGetParams } from "../protocols/http/http-get-client";
import { HttpResponse, HttpStatusCode } from "../protocols/http/http-response";

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