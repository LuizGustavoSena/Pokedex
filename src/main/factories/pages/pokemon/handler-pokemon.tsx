import React from 'react'
import Index from "../../../../presentation/index";
import { makeRemotePokemon } from '../../useCases/pokemon/remote-pokemon-factory';

const HandlerPokemon:React.FC = () =>{
    const remotePokemon = makeRemotePokemon();

    return(
        <Index
            pokemon={remotePokemon}
        />
    )
}

export default HandlerPokemon;