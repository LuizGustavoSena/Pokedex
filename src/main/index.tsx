import { ResponsePokemonOnly } from '@/domain/models/pokemon-model'
import Header from '@/presentation/components/header'
import Pokemon from '@/presentation/components/pokemon'
import faker from 'faker'
import React from 'react'
import ReactDOM from 'react-dom/client'

const pokemon: ResponsePokemonOnly = {
  abilities: [{
    ability: {
      name: faker.name.firstName(),
      url: faker.internet.url()
    },
    is_hidden: faker.random.boolean(),
    slot: faker.random.number()
  }],
  height: faker.random.number(),
  id: faker.random.number(),
  is_default: faker.random.boolean(),
  location_area_encounters: faker.random.words(),
  name: faker.name.firstName(),
  sprites: {
    other: {
      dream_world: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
      }
    }
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header />
    <Pokemon item={pokemon} />
  </React.StrictMode>,
)
