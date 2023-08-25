import { RemotePokemon } from "@/data/usecases";
import { GetPokemons } from "@/domain/usecases";
import { makeGraphqlClientDecorator } from "../decorators/graphql-client-decorator-factory";
import { makeUrl } from "../http";

export const makeRemotePokemon = (): GetPokemons =>
    new RemotePokemon(
        makeUrl('/'),
        makeGraphqlClientDecorator()
    );