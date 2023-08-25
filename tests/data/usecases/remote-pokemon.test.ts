import { RemotePokemon } from "@/data/usecases";
import { UnexpectedError } from "@/domain/error";
import faker from "faker";
import { describe, expect, it } from "vitest";
import { RequestPokemons } from "../../domain/mocks";
import { HttpClientSpy, mockResponsePokemonsAll } from "../mocks";

type Props = {
    sut: RemotePokemon;
    httpClientSpy: HttpClientSpy;
}

const makeSut = (url: string = faker.internet.url()): Props => {
    let httpClientSpy = new HttpClientSpy();
    let sut = new RemotePokemon(url, httpClientSpy);

    return {
        sut,
        httpClientSpy
    }
}

const arrayStatusCodeErrors = [400, 401, 403, 404, 409, 500];

describe('data/usecases/remote-pokemon', () => {
    it('Should call httpClient with correct values', async () => {
        let url = faker.internet.url();
        const { sut, httpClientSpy } = makeSut(url);

        let requestObject = RequestPokemons();
        httpClientSpy.response = mockResponsePokemonsAll();
        let index = httpClientSpy.response.body.pokemons.results.length - 1;

        await sut.getAll(requestObject);

        expect(httpClientSpy.url).toBe(`${url}`);
        expect(httpClientSpy.method).toBe('post');
    });

    it('Should throw UnexpectedError in getAll method if httpClient returns differents statusCode 200', async () => {
        const { sut, httpClientSpy } = makeSut();

        let requestObject = RequestPokemons();
        httpClientSpy.response = { statusCode: faker.random.arrayElement(arrayStatusCodeErrors) };

        let promise = sut.getAll(requestObject);

        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    it('Should throw UnexpectedError in getAll method if httpClient returns statusCode 200 and undefined results', async () => {
        const { sut, httpClientSpy } = makeSut();

        let requestObject = RequestPokemons();
        httpClientSpy.response = {
            statusCode: 200,
            body: { pokemons: { results: undefined } }
        };

        let promise = sut.getAll(requestObject);

        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    it('Should throw UnexpectedError in getAll method if httpClient returns statusCode 200 and null results', async () => {
        const { sut, httpClientSpy } = makeSut();

        let requestObject = RequestPokemons();
        httpClientSpy.response = {
            statusCode: 200,
            body: { pokemons: { results: null } }
        };

        let promise = sut.getAll(requestObject);

        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    it('Should throw UnexpectedError in getOnly method if httpClient returns differents statusCode 200', async () => {
        const { sut, httpClientSpy } = makeSut();

        httpClientSpy.response = { statusCode: faker.random.arrayElement(arrayStatusCodeErrors) };

        let promise = sut.getOnly({ name: faker.name.firstName() });

        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    it('Should return an Pokemons.Model[] if httpClient returns statusCode 200', async () => {
        const { sut, httpClientSpy } = makeSut();

        httpClientSpy.response = mockResponsePokemonsAll();

        let response = await sut.getAll(RequestPokemons());

        expect(response).toEqual([httpClientSpy.response.body.pokemon]);
    });
})