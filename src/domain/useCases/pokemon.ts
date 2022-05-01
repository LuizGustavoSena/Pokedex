import { InfoPokemons, Pokemons } from "../models";

export interface Pokemon {
    getPokemons(count: number): Promise<Pokemons>;
    getInfoPokemon(pokemon: string): Promise<InfoPokemons>;
}