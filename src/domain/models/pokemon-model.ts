export type ResponsePokemonAll = {
    count: number;
    next: string;
    results: Results[];
}

type Results = {
    name: string;
    url: string;
}

export type ResponsePokemonOnly = {
    abilities: AbilitiesParams[];
    height: number;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
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
    other: {
        front_default: string;
    };
}