import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from "@/data/protocols/http";
import { ResponsePokemonAll, ResponsePokemonOnly } from "@/domain/models/pokemon-model";
import faker from "faker";

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
            count: faker.random.number(),
            next: faker.random.words(),
            results: [{
                name: faker.internet.userName(),
                url: faker.internet.url()
            }]
        }
    }
}

export const mockResponsePokemonsOnly = (): HttpResponse<ResponsePokemonOnly> => {
    return {
        statusCode: 200,
        body: {
            abilities: [{
                ability: {
                    name: faker.name.firstName(),
                    url: faker.internet.url()
                },
                is_hidden: faker.random.boolean(),
                slot: faker.random.number()
            }],
            height: faker.random.number(),
            id: faker.random.number(),
            is_default: faker.random.boolean(),
            location_area_encounters: faker.random.words(),
            name: faker.name.firstName(),
            sprites: {
                other: {
                    dream_world: {
                        front_default: faker.internet.url()
                    }
                }
            }
        }
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

