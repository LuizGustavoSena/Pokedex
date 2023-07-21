import { RemotePokemon } from "@/data/usecases";
import { makeAxiosHttpClient, makeUrl } from "../http";

export const makeRemotePokemon = (): RemotePokemon =>
    new RemotePokemon(
        makeUrl('/pokemon'),
        makeAxiosHttpClient(),
        makeAxiosHttpClient()
    );