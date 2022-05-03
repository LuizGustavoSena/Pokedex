import React from 'react'
import { RemotePokemon } from "../../../../data/useCases/pokemon/remote-pokemon";
import { InfoPokemons, Pokemons } from "../../../../domain/models/pokemon-models";
import { AxiosHttpClient } from "../../../../infra/http/axios-http-client/axios-http-client";
import Index from "../../../../presentation/index";

const HandlerPokemon:React.FC = () =>{
    const url = 'https://pokeapi.co/api/v2/pokemon'
    const axiosHttpClientPokemon = new AxiosHttpClient<Pokemons>()
    const axiosHttpClientInfoPokemon = new AxiosHttpClient<InfoPokemons>()
    const remotePokemon = new RemotePokemon(url, axiosHttpClientPokemon, axiosHttpClientInfoPokemon);

    return(
        <Index
            pokemon={remotePokemon}
        />
    )
}

export default HandlerPokemon;