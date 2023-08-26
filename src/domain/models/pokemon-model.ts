export type ResponsePokemonAll = {
    pokemons: Pokemons
}

type Pokemons = {
    results: Results[];
}

type Results = {
    name: string;
}

export type ResponsePokemonOnly = {
    id: number;
    name: string;
    sprites: SpritesParams;
}

type AbilitiesParams = {
    ability: NameUrlParams;
    is_hidden: boolean;
    slot: number;
}

type NameUrlParams = {
    name: string;
    url: string;
}

type SpritesParams = {
    front_default: string;
}