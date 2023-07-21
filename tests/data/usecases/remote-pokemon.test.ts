import { RemotePokemon } from "@/data/usecases/remote-pokemon";
import { UnexpectedError } from "@/domain/error/unexpected-error";
import faker from "faker";
import { describe, expect, it } from "vitest";
import { RequestPokemons } from "../../domain/mocks";
import { HttpClientSpy, mockResponsePokemonsAll, mockResponsePokemonsOnly } from "../mocks/mock-http";

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

    it('Should throw UnexpectedError in getAll method if httpClient returns differents statusCode 200', async () => {
        const { sut, httpClientSpyAll } = makeSut();

        let requestObject = RequestPokemons();
        httpClientSpyAll.response = { statusCode: faker.random.arrayElement(arrayStatusCodeErrors) };

        let promise = sut.getAll(requestObject);

        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    it('Should throw UnexpectedError in getAll method if httpClient returns statusCode 200 and undefined results', async () => {
        const { sut, httpClientSpyAll } = makeSut();

        let requestObject = RequestPokemons();
        httpClientSpyAll.response = {
            statusCode: 200,
            body: { results: undefined }
        };

        let promise = sut.getAll(requestObject);

        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    it('Should throw UnexpectedError in getAll method if httpClient returns statusCode 200 and null results', async () => {
        const { sut, httpClientSpyAll } = makeSut();

        let requestObject = RequestPokemons();
        httpClientSpyAll.response = {
            statusCode: 200,
            body: { results: null }
        };

        let promise = sut.getAll(requestObject);

        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    it('Should throw UnexpectedError in getOnly method if httpClient returns differents statusCode 200', async () => {
        const { sut, httpClientSpyOnly } = makeSut();

        httpClientSpyOnly.response = { statusCode: faker.random.arrayElement(arrayStatusCodeErrors) };

        let promiseTwo = sut.getOnly({ url: faker.internet.url() });

        await expect(promiseTwo).rejects.toThrow(new UnexpectedError());
    });

    it('Should return an Pokemons.Model[] if httpClient returns statusCode 200', async () => {
        const { sut, httpClientSpyOnly, httpClientSpyAll } = makeSut();

        httpClientSpyAll.response = mockResponsePokemonsAll();
        httpClientSpyOnly.response = mockResponsePokemonsOnly();

        let response = await sut.getAll(RequestPokemons());

        expect(response).toEqual([httpClientSpyOnly.response.body]);
    });
})