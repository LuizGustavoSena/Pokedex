import { HttpGetClient, httpGetParams, HttpResponse } from "../../../data/protocols/http";
import axios from "axios";
export class AxiosHttpClient implements HttpGetClient<any>{
    statusCode: number;
    body?: any;
    
    async get(params: httpGetParams): Promise<HttpResponse<any>>{
        let response;
        
        try{
            response = await axios.get(params.url);
        }catch(error){
            response = error.response;
        }

        return {
            statusCode: response.status,
            body: response.data
        }
    }
}