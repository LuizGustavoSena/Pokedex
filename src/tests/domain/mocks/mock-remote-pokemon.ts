import { Pokemons } from "@/domain/usecases"
import faker from "faker"

export const RequestPokemons = (): Pokemons.ParamsAll => {
    return {
        limit: faker.random.number()
    }
}