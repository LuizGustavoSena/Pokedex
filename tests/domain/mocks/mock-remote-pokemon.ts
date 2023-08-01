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
        abilities: [{
            ability: {
                name: faker.name.firstName(),
                url: faker.internet.url()
            },
            is_hidden: faker.datatype.boolean(),
            slot: faker.datatype.number()
        }],
        height: faker.datatype.number(),
        id: faker.datatype.number(),
        is_default: faker.datatype.boolean(),
        location_area_encounters: faker.random.words(),
        name: faker.name.firstName(),
        sprites: {
            other: {
                dream_world: {
                    front_default: faker.internet.url()
                }
            }
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