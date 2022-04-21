import { PokemonResponse } from "../models";

export interface Pokemon {
    get(): Promise<PokemonResponse>
}