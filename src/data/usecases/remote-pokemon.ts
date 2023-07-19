import { UnexpectedError } from '@/domain/error/unexpected-error';
import { ResponsePokemonAll } from '@/domain/models/pokemon-model';
import { GetPokemons, Pokemons } from '../../domain/usecases';
import { HttpClient, HttpStatusCode } from '../protocols/http';

export class RemotePokemon implements GetPokemons {
    constructor(
        private readonly url: string,
        private readonly httpClientAll: HttpClient<RemotePokemon.ModelAll>,
        private readonly httpClientOnly: HttpClient<RemotePokemon.ModelOnly>
    ) { }

    async getAll(params: Pokemons.ParamsAll): Promise<Pokemons.Model[]> {
        const { limit } = params;

        let response = await this.httpClientAll.request({
            url: `${this.url}?limit=${limit}`,
            method: 'get'
        });

        if (response.statusCode !== HttpStatusCode.Ok || !response.body?.results)
            throw new UnexpectedError();

        let pokemons: Pokemons.Model[] = [];

        for (let i = 0; i < response.body.results.length; i++) {
            const { url } = response.body.results[i];

            let pokemon = await this.getOnly({ url });

            pokemons.push(pokemon);
        }

        return pokemons;
    }

    async getOnly(params: Pokemons.ParamsOnly): Promise<Pokemons.Model> {
        const { url } = params;

        let response = await this.httpClientOnly.request({
            url,
            method: 'get'
        });

        if (response.statusCode !== HttpStatusCode.Ok)
            throw new UnexpectedError();

        return response?.body as Pokemons.Model;
    }
}

export namespace RemotePokemon {
    export type ModelAll = ResponsePokemonAll;
    export type ModelOnly = Pokemons.Model;
}