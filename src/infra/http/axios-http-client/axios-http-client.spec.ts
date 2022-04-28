import { AxiosHttpClient } from "./axios-http-client";
import { mockAxios } from '../../test';
import axios from "axios";

jest.mock(`axios`);

type SutTypes ={
    sut: AxiosHttpClient;
    mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes =>{
    const sut = new AxiosHttpClient();
    const mockedAxios = mockAxios();
    return {
        sut,
        mockedAxios
    }
}

describe('AxiosHttpClient', () =>{
    test('Should call axios with correct URL and verb', async() =>{
        const { sut, mockedAxios } = makeSut();
        const url = 'any_url';

        await sut.get({ url })

        expect(mockedAxios.get).toHaveBeenCalledWith(url);
    })

    test('Should correct response', () =>{
        const { sut, mockedAxios } = makeSut();
        const url = 'any_url';

        const promise = sut.get({ url })

        expect(promise).toEqual(mockedAxios.get.mock.results[0].value);
    })
})