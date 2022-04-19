type Pokemon= {
    name: string,
    url: string
}

export type PokemonResponse = {
    count: number,
    next: string,
    previous: null,
    results: Pokemon[],
}