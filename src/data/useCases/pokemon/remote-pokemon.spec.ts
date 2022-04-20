import { HttpGetClientSpy } from "../../test/mock-http-client";
import { RemotePokemon } from "./remote-pokemon";

type SutTypes ={
    sut: RemotePokemon,
    httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (url: string = 'any_url'): SutTypes =>{
    const httpGetClientSpy = new HttpGetClientSpy();
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
})