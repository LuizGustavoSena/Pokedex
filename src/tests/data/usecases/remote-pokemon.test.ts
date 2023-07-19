import { RemotePokemon } from "@/data/usecases/remote-pokemon";
import faker from "faker";
import { describe, expect, it } from "vitest";
import { RequestPokemons } from "../../domain/mocks";
import { HttpClientSpy, mockResponsePokemonsAll } from "../mocks/mock-hhtp";

type Props = {
    sut: RemotePokemon;
    httpClientSpyOnly: HttpClientSpy;
    httpClientSpyAll: HttpClientSpy;
}

const makeSut = (url: string = faker.internet.url()): Props => {
    let httpClientSpyAll = new HttpClientSpy();
    let httpClientSpyOnly = new HttpClientSpy();
    let sut = new RemotePokemon(url, httpClientSpyAll, httpClientSpyOnly);

    return {
        sut,
        httpClientSpyOnly,
        httpClientSpyAll
    }
}

const arrayStatusCodeErrors = [400, 401, 403, 404, 409, 500];

describe('data/usecases/remote-pokemon', () => {
    it('Should call httpClient with correct values', async () => {
        let url = faker.internet.url();
        const { sut, httpClientSpyOnly, httpClientSpyAll } = makeSut(url);

        let requestObject = RequestPokemons();
        httpClientSpyAll.response = mockResponsePokemonsAll();
        let index = httpClientSpyAll.response.body.results.length - 1;

        await sut.getAll(requestObject);

        expect(httpClientSpyAll.url).toBe(`${url}?limit=${requestObject.limit}`);
        expect(httpClientSpyAll.method).toBe('get');
        expect(httpClientSpyOnly.url).toBe(httpClientSpyAll.response.body.results[index].url);
        expect(httpClientSpyOnly.method).toBe('get');
    });
})