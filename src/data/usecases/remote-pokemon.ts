import { UnexpectedError } from '@/domain/error/unexpected-error';
import { GetPokemons, Pokemons } from '../../domain/usecases';
import { HttpClient, HttpStatusCode } from '../protocols/http';

export class RemotePokemon implements GetPokemons {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<RemotePokemon.Model>
    ) { }
    getOnly(params: Pokemons.ParamsOnly): Promise<Pokemons.ModelOnly> {
        throw new Error('Method not implemented.');
    }

    async getAll(params: Pokemons.ParamsAll): Promise<Pokemons.ModelAll> {
        const { limit } = params;

        let response = await this.httpClient.request({
            url: `${this.url}?limit=${limit}`,
            method: 'get'
        });

        if (response.statusCode !== HttpStatusCode.Ok)
            throw new UnexpectedError();

        let pokemons: Pokemons.ModelOnly[] = [];

        response.body?.results.forEach(el => {
            let responsePokemon = this.httpClient.request({
                url: el.url,
                method: 'get'
            })
        })

    }

}

export namespace RemotePokemon {
    export type Model = Pokemons.ModelAll;
}