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
    let httpClientSpyOnly = new HttpClientSpy();
    let httpClientSpyAll = new HttpClientSpy();
    let sut = new RemotePokemon(url, httpClientSpyOnly, httpClientSpyAll);

    return {
        sut,
        httpClientSpyOnly,
        httpClientSpyAll
    }
}

describe('data/usecases/remote-pokemon', () => {
    it('Should correct urls', async () => {
        let url = faker.internet.url();
        const { sut, httpClientSpyOnly, httpClientSpyAll } = makeSut(url);

        let requestObject = RequestPokemons();
        httpClientSpyAll.response = mockResponsePokemonsAll();

        await sut.getAll(requestObject);

        expect(httpClientSpyAll.url).toBe(`${url}?limit=${requestObject.limit}`);
        expect(httpClientSpyOnly.url).toBe(httpClientSpyAll.response.body.results[0].url);
    })
})