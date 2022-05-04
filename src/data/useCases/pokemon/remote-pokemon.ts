import { RequestError } from "../../../domain/error";
import { InfoPokemons, Pokemons } from "../../../domain/models/pokemon-models";
import { Pokemon } from "../../../domain/useCases/pokemon";
import { HttpGetClient, HttpStatusCode } from "../../protocols/http";
export class RemotePokemon implements Pokemon {
    constructor(
        private readonly url: string,
        private readonly httpGetClientPokemons: HttpGetClient<Pokemons>,
        private readonly httpGetClientInfoPokemons: HttpGetClient<InfoPokemons>
    ){}

    async getPokemons(count: number): Promise<Pokemons>{
        const response = await this.httpGetClientPokemons.get({ url: `${this.url}?limit=${count}` });
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

    filter(words: string, pokemons: InfoPokemons[]): InfoPokemons[] | null {
        if(words === '') return null
        return pokemons.filter((item: InfoPokemons)=> item.name.slice(0, words.length) === words);
    }
}      