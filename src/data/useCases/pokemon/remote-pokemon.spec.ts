import { RequestError } from "../../../domain/error/requestError";
import { InfoPokemons, Pokemons } from "../../../domain/models/pokemon-models";
import { mockInfoPokemons, mockPokemons } from "../../../domain/test";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { HttpGetClientSpy } from "../../test";
import { RemotePokemon } from "./remote-pokemon";

type SutTypes ={
    sut: RemotePokemon,
    httpGetClientPokemonsSpy: HttpGetClientSpy<Pokemons>
    httpGetClientInfoPokemonSpy: HttpGetClientSpy<InfoPokemons>
}

const makeSut = (url: string = 'any_url'): SutTypes =>{
    const httpGetClientPokemonsSpy = new HttpGetClientSpy<Pokemons>();
    const httpGetClientInfoPokemonSpy = new HttpGetClientSpy<InfoPokemons>();
    const sut = new RemotePokemon(url, httpGetClientPokemonsSpy, httpGetClientInfoPokemonSpy);

    return {
        sut,
        httpGetClientPokemonsSpy,
        httpGetClientInfoPokemonSpy
    }
}

describe('RemotePokemon', () =>{
    test('Should call httpGetClientPokemonsSpy with correct URL', async() => {
        const url = 'any_url';
        const countPokemons = 1;
        const { sut, httpGetClientPokemonsSpy, httpGetClientInfoPokemonSpy } = makeSut(url);
        
        await sut.getPokemons(countPokemons);
        await sut.getInfoPokemon('any_pokemon');

        expect(httpGetClientPokemonsSpy.url).toBe(`${url}?limit=${countPokemons}`);
    })

    test('Should call httpGetClientInfoPokemonSpy with correct URL', async() => {
        const url = 'any_url';
        const namePokemon = 'any_pokemon'
        const { sut, httpGetClientInfoPokemonSpy } = makeSut(url);
        
        await sut.getInfoPokemon(namePokemon);

        expect(httpGetClientInfoPokemonSpy.url).toBe(`${url}/${namePokemon}`);
    })

    test('Should throw requestError get Pokemons with statusCode response that different 200', async() => {
        const { sut, httpGetClientPokemonsSpy } = makeSut();

        httpGetClientPokemonsSpy.response.statusCode = HttpStatusCode.serverError;
        
        const promisePokemons = sut.getPokemons(1);

        await expect(promisePokemons).rejects.toThrow(new RequestError());
    })

    test('Should throw requestError get InfoPokemons with statusCode response that different 200', async() => {
        const { sut, httpGetClientInfoPokemonSpy } = makeSut();

        httpGetClientInfoPokemonSpy.response.statusCode = HttpStatusCode.serverError;
        
        const promisePokemons = sut.getInfoPokemon('any_pokemon');

        await expect(promisePokemons).rejects.toThrow(new RequestError());
    })

    test('Should currect result with statusCode response 200 in Pokemons request', async() => {
        const { sut, httpGetClientPokemonsSpy } = makeSut();

        httpGetClientPokemonsSpy.response.body = mockPokemons;
        
        const responte = await sut.getPokemons(1);

        expect(responte).toEqual(mockPokemons);
    })

    test('Should currect result with statusCode response 200 in InfoPokemons request', async() => {
        const { sut, httpGetClientInfoPokemonSpy } = makeSut();

        httpGetClientInfoPokemonSpy.response.body = mockInfoPokemons;
        
        const responte = await sut.getInfoPokemon('any_pokemon');

        expect(responte).toEqual(mockInfoPokemons);
    })

    test('Should method filter returns itens with name pokemon exist', async() => {
        const { sut } = makeSut();
        
        const filterResponse = sut.filter(mockInfoPokemons.name, [mockInfoPokemons]);

        expect(filterResponse).toEqual([mockInfoPokemons]);
    })

    test('Should method filter returns empty array with name pokemon don`t exist', async() => {
        const { sut } = makeSut();
        
        const filterResponse = sut.filter('other_name', [mockInfoPokemons]);

        expect(filterResponse).toEqual([]);
    })

    test('Should method filter returns null with don`t have word', async() => {
        const { sut } = makeSut();
        
        const filterResponse = sut.filter('', [mockInfoPokemons]);

        expect(filterResponse).toBeNull();
    })
})