import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from "@/data/protocols/http";
import { ResponsePokemonAll } from "@/domain/models";
import { Pokemons } from "@/domain/usecases";
import faker from "faker";
import { itemPokemon } from "../../domain/mocks";

export const mockRequest = (): HttpRequest => {
    return {
        method: faker.random.arrayElement(['get', 'post', 'put', 'delete', 'patch']),
        url: faker.internet.url(),
        body: faker.random.objectElement(),
        headers: faker.random.objectElement(),
    }
}

export const mockResponsePokemonsAll = (): HttpResponse<ResponsePokemonAll> => {
    return {
        statusCode: HttpStatusCode.Ok,
        body: {
            count: faker.datatype.number(),
            next: faker.random.words(),
            results: [{
                name: faker.internet.userName(),
                url: faker.internet.url()
            }]
        }
    }
}

export const mockResponsePokemonsOnly = (): HttpResponse<Pokemons.Model> => {
    return {
        statusCode: 200,
        body: itemPokemon()
    }
}

export class HttpClientSpy<T = any> implements HttpClient {
    url?: string;
    method?: string;
    body?: any;
    headers?: any;
    response: HttpResponse<T> = {
        statusCode: HttpStatusCode.Ok
    }

    async request(params: HttpRequest): Promise<{ statusCode: HttpStatusCode; body?: any; }> {
        const { method, url, body, headers } = params;

        this.url = url;
        this.method = method;
        this.body = body;
        this.headers = headers;

        return this.response;
    }
}

