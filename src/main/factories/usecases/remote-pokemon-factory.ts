import { RemotePokemon } from "@/data/usecases";
import { GetPokemons } from "@/domain/usecases";
import { makeAxiosHttpClient, makeUrl } from "../http";

export const makeRemotePokemon = (): GetPokemons =>
    new RemotePokemon(
        makeUrl('/pokemon'),
        makeAxiosHttpClient(),
        makeAxiosHttpClient()
    );