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

    useEffect(() => {
        async function getPokemons() {
            let response = await remotePokemon.getAll({
                limit: 15
            });

            setPokemons(response);
        };

        getPokemons();
    }, []);

    return (
        <>
            <Header />
            <div className={style.boxPokemon}>
                {pokemons?.map(pokemon => (
                    <Pokemon item={pokemon} />

                ))}
            </div>
        </>
    )
};

export default memo(Home);