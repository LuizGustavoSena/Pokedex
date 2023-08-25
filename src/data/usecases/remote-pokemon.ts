import { UnexpectedError } from '@/domain/error';
import { ResponsePokemonAll } from '@/domain/models';
import { GetPokemons, Pokemons } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '../protocols/http';

export class RemotePokemon implements GetPokemons {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient,
    ) { }

    async getAll(params: Pokemons.ParamsAll): Promise<Pokemons.Model[]> {
        const { limit } = params;

        let graphqlQuery = {
            query: `query pokemons($limit: Int, $offset: Int) {
                pokemons(limit: $limit, offset: $offset) {
                  results {
                    name
                  }
                }
              }`,
            variables: {
                limit: limit,
                offset: 1,
            }
        };

        let response = await this.httpClient.request<RemotePokemon.ModelAll>({
            url: `${this.url}`,
            method: 'post',
            body: graphqlQuery
        });

        if (response.statusCode !== HttpStatusCode.Ok || !response.body?.pokemons.results)
            throw new UnexpectedError();

        let pokemons = await Promise.all(
            response.body.pokemons.results.map(el =>
                this.getOnly({ name: el.name })
            )
        );

        return pokemons;
    }

    async getOnly(params: Pokemons.ParamsOnly): Promise<Pokemons.Model> {
        const { name } = params;

        let graphqlQuery = {
            query: `query pokemon($name: String!) {
                pokemon(name: $name) {
                  id
                  name
                  sprites {
                      front_default
                  }
                }
              }`,
            variables: {
                name,
            }
        };

        let response = await this.httpClient.request<RemotePokemon.ModelOnly>({
            url: `${this.url}`,
            method: 'post',
            body: graphqlQuery
        });

        if (response.statusCode !== HttpStatusCode.Ok)
            throw new UnexpectedError();

        return response?.body?.pokemon as Pokemons.Model;
    }
}

export namespace RemotePokemon {
    export type ModelAll = ResponsePokemonAll;
    export type ModelOnly = {
        pokemon: Pokemons.Model;
    }
}