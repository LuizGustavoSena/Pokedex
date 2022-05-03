import React, { useEffect, useState } from 'react';
import { RemotePokemon } from '../../data/useCases/pokemon/remote-pokemon';
import { InfoPokemons, Pokemon } from '../../domain/models';
import Loading from '../components/loading/loading';
import Menu from '../components/menu';
import Pokemons from '../components/pokemons/pokemons';
import './index-style.scss';

type Props = {
  pokemon: RemotePokemon
}

const Index: React.FC<Props> = ({ pokemon }: Props) =>{
  const [ pokemons, setPokemons ] = useState<InfoPokemons[] | null>(null);
  const [ filter, setFilter ] = useState<InfoPokemons[] | null>(null);
  const [ loading, setLoading ] = useState<boolean>(false);

  useEffect(()=>{
     async function searchPokemons(){
      setLoading(true);

      let pokemons = await pokemon.getPokemons(1000);
      let list = [];
      
      const infoPokemons = pokemons.results.map(async(item: Pokemon) => {
          list.push(await pokemon.getInfoPokemon(item.name));
          return item;
      })
        
      await Promise.all(infoPokemons);
        
      setPokemons(list);

      setLoading(false);
    }

    searchPokemons();
  }, []);

  const toggleFilterPokemon = (words: string) =>{
    if(words === ''){
      setFilter(null);
      return;
    }

    let lenghtFilter = words.length;

    setFilter(pokemons.filter((item: InfoPokemons)=> item.name.slice(0, lenghtFilter) === words));
  }

  return(
      <>
          <Menu 
            toggleFilterPokemon={toggleFilterPokemon}
          />
          <Pokemons 
            pokemons={filter || pokemons}
          />
          <Loading 
            loading={loading}
          />
      </>
  )
}

export default Index;