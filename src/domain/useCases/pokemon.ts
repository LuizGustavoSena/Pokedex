import { InfoPokemons, Pokemons } from "../models";

export interface Pokemon {
    getPokemons(): Promise<Pokemons>;
    getInfoPokemon(pokemon: string): Promise<InfoPokemons>;
}