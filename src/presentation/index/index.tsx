import React, { useEffect, useState } from 'react';
import { InfoPokemons, PokemonItem, } from '../../domain/models';
import { Pokemon } from '../../domain/useCases/pokemon';
import Loading from '../components/loading/loading';
import Menu from '../components/menu';
import Pokemons from '../components/pokemons/pokemons';
import './index-style.scss';

type Props = {
  pokemon: Pokemon
}

const Index: React.FC<Props> = ({ pokemon }: Props) => {
  const [pokemons, setPokemons] = useState<InfoPokemons[] | null>(null);
  const [filter, setFilter] = useState<InfoPokemons[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function searchPokemons() {
      setLoading(true);

      let pokemons = await pokemon.getPokemons(1000);
      let list = [];

      const infoPokemons = pokemons.results.map(async (item: PokemonItem) => {
        list.push(await pokemon.getInfoPokemon(item.name));
        return item;
      })

      await Promise.all(infoPokemons);

      setPokemons(list);

      setLoading(false);
    }

    searchPokemons();
    // eslint-disable-next-line
  }, []);

  const toggleFilterPokemon = (words: string) =>
    setFilter(pokemon.filter(words, pokemons));

  return (
    <>
      <Menu
        toggleFilterPokemon={toggleFilterPokemon}
      />
      <Pokemons
        pokemons={filter || pokemons}
      />
      {/* <Loading
        loading={loading}
      /> */}
    </>
  )
}

export default Index;