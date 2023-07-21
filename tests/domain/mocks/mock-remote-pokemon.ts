import { Pokemons } from "@/domain/usecases"
import faker from "faker"

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