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

export type InfoPokemons = {
    abilities: abilities [],
    name: string,
    sprites: { 
        other: { 
            official_artwork: { 
                front_default: string 
            } 
        },
        front_default: string
    },
}

export type Result = {
    name: string,
    url: string
}

export type Pokemons = {
    count: number,
    results: Result[]
}