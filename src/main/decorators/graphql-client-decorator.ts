import { HttpClient, HttpRequest, HttpResponse } from "@/data/protocols/http";

export class GraphqlClientDecorator implements HttpClient {

    constructor(
        private readonly httpClient: HttpClient
    ) { }

    async request<T = any>(params: HttpRequest): Promise<HttpResponse<T>> {
        type request = {
            data: T
        };

        const { method, url, body, headers } = params;

        let response = await this.httpClient.request<request>({
            url,
            method,
            body: JSON.stringify(body),
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            }
        });

        return {
            statusCode: response.statusCode,
            body: response.body?.data
        }
    }

}