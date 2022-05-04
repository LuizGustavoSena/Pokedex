import { RemotePokemon } from "../../../../data/useCases/pokemon/remote-pokemon";
import { Pokemon } from '../../../../domain/useCases/pokemon';
import { makeApiUrl } from "../../http/api-url-factory";
import { makeAxiosHttpClient } from '../../http/axios-http-client-factory';

export const makeRemotePokemon = (): Pokemon =>{
    return new RemotePokemon(makeApiUrl(), makeAxiosHttpClient(), makeAxiosHttpClient());
}