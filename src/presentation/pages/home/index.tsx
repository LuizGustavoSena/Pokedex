import { RemotePokemon } from "@/data/usecases";
import { Pokemons } from '@/domain/usecases';
import Header from "@/presentation/components/header";
import Pokemon from "@/presentation/components/pokemon";
import React, { memo, useEffect, useState } from "react";
import style from './index.module.css';

type Props = {
    remotePokemon: RemotePokemon
}

const Home: React.FC<Props> = ({ remotePokemon }: Props) => {
    const [pokemons, setPokemons] = useState<Pokemons.Model[]>();
    const [searchPokemons, setSearchPokemons] = useState<Pokemons.Model[]>();

    useEffect(() => {
        async function getPokemons() {
            let response = await remotePokemon.getAll({
                limit: 15
            });

            setPokemons(response);
        };

        getPokemons();
    }, []);

    const onChangesSearchInput = (text: string) => {
        let findPokemon = pokemons?.filter(el => el.name.includes(text));

        setSearchPokemons(findPokemon);
    }

    return (
        <>
            <Header onChange={onChangesSearchInput} />
            <div className={style.boxPokemon}>
                {searchPokemons ? (
                    searchPokemons.map(pokemon => (
                        <Pokemon
                            key={pokemon.id}
                            item={pokemon}
                        />
                    )))
                    : (pokemons?.map(pokemon => (
                        <Pokemon
                            key={pokemon.id}
                            item={pokemon}
                        />
                    )))
                }
            </div>
        </>
    )
};

export default memo(Home);