import { RequestError } from "../../../domain/error/requestError";
import { PokemonResponse } from "../../../domain/models/pokemon-models";
import { mockPokemons } from "../../../domain/test";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { HttpGetClientSpy } from "../../test";
import { RemotePokemon } from "./remote-pokemon";

type SutTypes ={
    sut: RemotePokemon,
    httpGetClientSpy: HttpGetClientSpy<PokemonResponse>
}

const makeSut = (url: string = 'any_url'): SutTypes =>{
    const httpGetClientSpy = new HttpGetClientSpy<PokemonResponse>();
    const sut = new RemotePokemon(url, httpGetClientSpy);

    return {
        sut,
        httpGetClientSpy
    }
}

describe('RemotePokemon', () =>{
    test('Should call HttpClient with correct URL', async() => {
        const url = 'any_url';
        const { sut, httpGetClientSpy } = makeSut(url);
        
        await sut.get();

        expect(httpGetClientSpy.url).toBe(url)
    })

    test('Should throw requestError with statusCode response that different 200', async() => {
        const { sut, httpGetClientSpy } = makeSut();
        httpGetClientSpy.response.statusCode = HttpStatusCode.serverError;
        
        const promise = sut.get();

        await expect(promise).rejects.toThrow(new RequestError());
    })

    test('Should currect result with statusCode response 200', async() => {
        const { sut, httpGetClientSpy } = makeSut();
        httpGetClientSpy.response.body = mockPokemons;
        
        const responte = await sut.get();

        expect(responte).toEqual(mockPokemons);
    })
})