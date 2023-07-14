import { ResponsePokemonOnly } from "../models/pokemon-model";

export interface GetPokemons {
    getAll(params: Pokemons.ParamsAll): Promise<Pokemons.Model[]>;
    getOnly(params: Pokemons.ParamsOnly): Promise<Pokemons.Model>;
}

export namespace Pokemons {
    export type ParamsAll = {
        limit: number
    };
    export type ParamsOnly = {
        url: string
    };
    export type Model = ResponsePokemonOnly;
}