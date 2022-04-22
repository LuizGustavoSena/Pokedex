import { HttpStatusCode } from "../../data/protocols/http";
import { mockPokemons } from "../../domain/test";
import axios from 'axios';

export const mockAxios = (): jest.Mocked<typeof axios> =>{
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue({
        status: HttpStatusCode.ok,
        data: mockPokemons
    })

    return mockedAxios;
}