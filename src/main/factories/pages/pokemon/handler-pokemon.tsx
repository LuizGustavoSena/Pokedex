import React from 'react'
import Index from "../../../../presentation/index";
import { makeRemotePokemon } from '../../useCases/pokemon/remote-pokemon-factory';

const HandlerPokemon:React.FC = () =>{
    return(
        <Index
            pokemon={makeRemotePokemon()}
        />
    )
}

export default HandlerPokemon;