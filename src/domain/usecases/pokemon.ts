import { ResponsePokemon } from "../models/pokemon-model";

export interface GetPokemons {
    get(): Promise<Pokemons.Model>;
}

export namespace Pokemons {
    export type Model = ResponsePokemon;
}