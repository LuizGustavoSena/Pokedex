import { httpGetParams, HttpResponse } from "../../../data/protocols/http";
import axios from "axios";
export class AxiosHttpClient<T> implements HttpResponse<T>{
    statusCode: number;
    body?: T;
    
    async get(params: httpGetParams): Promise<HttpResponse<T>>{
        const response = await axios.get(params.url);

        return {
            statusCode: response.status,
            body: response.data
        }
    }
}