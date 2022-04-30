import React, { useEffect, useState } from 'react';
import { RemotePokemon } from '../../data/useCases/pokemon/remote-pokemon';
import { InfoPokemons, Pokemon } from '../../domain/models';
import Menu from '../menu';
import './pokemon-style.scss';

type Props = {
  pokemon: RemotePokemon
}

const Index: React.FC<Props> = ({ pokemon }: Props) =>{
  const [ pokemons, setPokemons ] = useState<InfoPokemons[] | null>(null);

  useEffect(()=>{
     async function searchPokemons(){
      let pokemons = await pokemon.getPokemons();
      let list = [];
      
      const infoPokemons = pokemons.results.map(async(item: Pokemon) => {
          list.push(await pokemon.getInfoPokemon(item.name));
          return item;
      })
        
      await Promise.all(infoPokemons);
        
      console.log({list});
      setPokemons(list);
    }

    searchPokemons();
  }, []);

  return(
      <>
          <Menu />
          <div className='PokemonContainer'>
            { pokemons && pokemons.map((item: InfoPokemons, index: number) => {
                return(
                    <div className='PokemonItem' key={index}>
                      <img src={item.sprites.front_default} />
                      <h3>Nome: {item.name}</h3>
                    </div>
                )
            })}
          </div>
      </>
  )
}

export default Index;