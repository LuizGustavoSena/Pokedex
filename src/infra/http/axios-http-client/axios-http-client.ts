import { httpGetParams, HttpResponse } from "../../../data/protocols/http";
import { PokemonResponse } from "../../../domain/models";
import axios from "axios";
export class AxiosHttpClient implements HttpResponse<PokemonResponse>{
    statusCode: number;
    body?: PokemonResponse;
    
    async get(params: httpGetParams): Promise<HttpResponse<PokemonResponse>>{
        const response = await axios.get(params.url);

        return {
            statusCode: response.status,
            body: response.data
        }
    }
}