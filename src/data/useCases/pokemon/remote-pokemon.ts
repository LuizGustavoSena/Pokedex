import { RequestError } from "../../../domain/error";
import { PokemonResponse } from "../../../domain/models/pokemon-models";
import { Pokemon } from "../../../domain/useCases/pokemon";
import { HttpGetClient } from "../../protocols/http/http-get-client";
import { HttpStatusCode } from "../../protocols/http/http-response";
export class RemotePokemon implements Pokemon {
    constructor(
        private readonly url: string,
        private readonly httpGetClient: HttpGetClient<PokemonResponse>
    ){}

    async get():Promise<PokemonResponse>{
        const response = await this.httpGetClient.get({ url: this.url });
        switch(response.statusCode){
            case HttpStatusCode.serverError: 
                throw new RequestError();
                
            default:
                return Promise.resolve(response.body);
        }
    }
}      