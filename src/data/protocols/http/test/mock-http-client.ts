import { HttpGetClient, httpGetParams } from "../protocols/http/http-get-client";
import { HttpResponse, HttpStatusCode } from "../protocols/http/http-response";

export class HttpGetClientSpy implements HttpGetClient {
    url?: string;
    response: HttpResponse ={
        statusCode: HttpStatusCode.ok
    }

    async get(params: httpGetParams): Promise<HttpResponse> {
        this.url = params.url;
        return Promise.resolve(this.response);
    }
}