import { ResponsePokemonAll, ResponsePokemonOnly } from "../models/pokemon-model";

export interface GetPokemons {
    getAll(params: Pokemons.ParamsAll): Promise<Pokemons.ModelOnly[]>;
    getOnly(params: Pokemons.ParamsOnly): Promise<Pokemons.ModelOnly>;
}

export namespace Pokemons {
    export type ParamsAll = {
        limit: number
    };
    export type ParamsOnly = {
        url: string
    };
    export type ModelAll = ResponsePokemonAll;
    export type ModelOnly = ResponsePokemonOnly;
}