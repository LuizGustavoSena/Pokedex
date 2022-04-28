export type Pokemon= {
    name: string,
    url: string
}

export type abilities= {
    ability:{
        name: string,
        url: string
    }
}

export type PokemonResponse = {
    abilities: abilities [],
    name: string,
    sprites: { other: { official_artwork: { front_default: string } }}
}