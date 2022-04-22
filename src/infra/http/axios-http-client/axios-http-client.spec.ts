import { AxiosHttpClient } from "./axios-http-client"
import axios from "axios";
import { HttpStatusCode } from "../../../data/protocols/http";
import { mockPokemons } from "../../../domain/test";

jest.mock(`axios`);
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({
    status: HttpStatusCode.ok,
    data: mockPokemons
})

const makeSut = (): AxiosHttpClient =>{
    return new AxiosHttpClient();
}

describe('AxiosHttpClient', () =>{
    test('Should call axios with correct URL and verb', async() =>{
        const sut = makeSut();
        const url = 'any_url';

        await sut.get({ url })

        expect(mockedAxios.get).toHaveBeenCalledWith(url);
    })

    test('Should correct response', async() =>{
        const sut = makeSut();
        const url = 'any_url';

        const response = await sut.get({ url })

        expect(response).toEqual({
            statusCode: HttpStatusCode.ok,
            body: mockPokemons
        });
    })
})