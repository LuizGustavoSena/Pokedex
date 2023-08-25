import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from "@/data/protocols/http";
import faker from "faker";
import { itemPokemon } from "../../domain/mocks";
import { RemotePokemon } from "../usecases";

export const mockRequest = (): HttpRequest => {
    return {
        method: faker.random.arrayElement(['get', 'post', 'put', 'delete', 'patch']),
        url: faker.internet.url(),
        body: faker.random.objectElement(),
        headers: faker.random.objectElement(),
    }
}

export const mockResponsePokemonsAll = (): HttpResponse<RemotePokemon.ModelAll & RemotePokemon.ModelOnly> => {
    return {
        statusCode: HttpStatusCode.Ok,
        body: {
            pokemons: {
                results: [{
                    name: faker.internet.userName(),
                }]
            },
            pokemon: itemPokemon()
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

