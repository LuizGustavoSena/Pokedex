import { RequestError } from "../../../domain/error";
import { InfoPokemons, Pokemons } from "../../../domain/models/pokemon-models";
import { Pokemon } from "../../../domain/useCases/pokemon";
import { HttpGetClient } from "../../protocols/http/http-get-client";
import { HttpStatusCode } from "../../protocols/http/http-response";
export class RemotePokemon implements Pokemon {
    constructor(
        private readonly url: string,
        private readonly httpGetClientPokemons: HttpGetClient<Pokemons>,
        private readonly httpGetClientInfoPokemons: HttpGetClient<InfoPokemons>
    ){}

    async getPokemons(): Promise<Pokemons>{
        const response = await this.httpGetClientPokemons.get({ url: `${this.url}?60` });
        switch(response.statusCode){
            case HttpStatusCode.serverError: 
                throw new RequestError();
                
            default:
                return Promise.resolve(response.body);
        }
    }

    async getInfoPokemon(pokemon: string):Promise<InfoPokemons>{
        const response = await this.httpGetClientInfoPokemons.get({ url: `${this.url}/${pokemon}` });
        switch(response.statusCode){
            case HttpStatusCode.serverError:
                throw new RequestError();
            default:
                return Promise.resolve(response.body);
        }
    }
}      