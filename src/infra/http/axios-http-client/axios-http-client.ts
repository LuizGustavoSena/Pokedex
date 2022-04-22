import { httpGetParams, HttpResponse } from "../../../data/protocols/http";
import axios from "axios";
import { PokemonResponse } from "../../../domain/models";
export class AxiosHttpClient{
    async get(params: httpGetParams): Promise<HttpResponse<PokemonResponse>>{
        const response = await axios.get(params.url);

        return {
            statusCode: response.status,
            body: response.data
        }
    }
}