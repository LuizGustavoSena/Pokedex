import { UnexpectedError } from '@/domain/error/unexpected-error';
import { GetPokemons, Pokemons } from '../../domain/usecases';
import { HttpClient, HttpStatusCode } from '../protocols/http';

export class RemotePokemon implements GetPokemons {

    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<RemotePokemon.Model>
    ) { }

    async get(): Promise<Pokemons.Model> {
        let response = await this.httpClient.request({
            url: this.url,
            method: 'get'
        });

        if (response.statusCode === HttpStatusCode.Ok)
            return response.body as Pokemons.Model;

        throw new UnexpectedError();
    }

}

export namespace RemotePokemon {
    export type Model = Pokemons.Model;
}