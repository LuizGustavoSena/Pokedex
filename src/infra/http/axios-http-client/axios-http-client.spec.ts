import { AxiosHttpClient } from "./axios-http-client"
import axios from "axios";

jest.mock(`axios`);
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient =>{
    return new AxiosHttpClient();
}

describe('AxiosHttpClient', () =>{
    test('Should call axios with correct URL', async() =>{
        const sut = makeSut();
        const url = 'any_url';

        await sut.get({ url })

        expect(mockedAxios).toHaveBeenCalledWith(url);
    })
})