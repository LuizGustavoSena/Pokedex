import React, { useEffect, useState } from 'react';
import { RemotePokemon } from '../../data/useCases/pokemon/remote-pokemon';
import { InfoPokemons, Pokemon } from '../../domain/models';
import Menu from '../components/menu';
import Pokemons from '../components/pokemons/pokemons';
import './index-style.scss';

type Props = {
  pokemon: RemotePokemon
}

const Index: React.FC<Props> = ({ pokemon }: Props) =>{
  const [ pokemons, setPokemons ] = useState<InfoPokemons[] | null>(null);
  const [ filter, setFilter ] = useState<string>('');

  useEffect(()=>{
     async function searchPokemons(){
      let pokemons = await pokemon.getPokemons(100);
      let list = [];
      
      const infoPokemons = pokemons.results.map(async(item: Pokemon) => {
          list.push(await pokemon.getInfoPokemon(item.name));
          return item;
      })
        
      await Promise.all(infoPokemons);
        
      setPokemons(list);
    }

    searchPokemons();
  }, []);

  const toggleFilterPokemon = (words: string) =>{
    setFilter(words);
  }

  return(
      <>
          <Menu 
            toggleFilterPokemon={toggleFilterPokemon}
          />
          <Pokemons 
            pokemons={pokemons}
          />
      </>
  )
}

export default Index;