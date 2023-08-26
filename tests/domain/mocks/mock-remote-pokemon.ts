import { GetPokemons, Pokemons } from "@/domain/usecases"
import faker from "faker"
import { ResponsePokemonOnly } from "../models"

export const RequestPokemons = (): Pokemons.ParamsAll => {
    return {
        limit: faker.datatype.number()
    }
}

export const itemPokemon = (): Pokemons.Model => {
    return {
        id: faker.datatype.number(),
        name: faker.name.firstName(),
        sprites: {
            front_default: faker.internet.url()
        }
    }
}

export class RemotePokemonSpy implements GetPokemons {
    pokemons = [itemPokemon(), itemPokemon()];
    paramsGetAll?: Pokemons.ParamsAll;
    paramsGetOnly?: Pokemons.ParamsOnly;

    async getAll(params: Pokemons.ParamsAll): Promise<ResponsePokemonOnly[]> {
        this.paramsGetAll = params;

        return this.pokemons;
    }

    async getOnly(params: Pokemons.ParamsOnly): Promise<ResponsePokemonOnly> {
        this.paramsGetOnly = params;

        return this.pokemons[0];
    }

}