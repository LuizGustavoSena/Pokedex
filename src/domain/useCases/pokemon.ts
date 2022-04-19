import { PokemonResponse } from "../models/pokemon-models";

export interface Pokemon {
    get(): Promise<PokemonResponse>
}