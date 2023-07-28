import { GetPokemons, Pokemons } from '@/domain/usecases';
import Header from "@/presentation/components/header";
import Loading from "@/presentation/components/loading";
import Pokemon from "@/presentation/components/pokemon";
import React, { memo, useEffect, useState } from "react";
import style from './index.module.css';

type Props = {
    remotePokemon: GetPokemons
}

const Home: React.FC<Props> = ({ remotePokemon }: Props) => {
    const [pokemons, setPokemons] = useState<Pokemons.Model[]>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getPokemons() {
            setLoading(true);

            let response = await remotePokemon.getAll({
                limit: 15
            });

            setPokemons(response);

            setLoading(false);
        };

        getPokemons();
    }, []);

    return (
        <>
            <Loading show={loading} />
            <Header />
            <div className={style.boxPokemon}>
                {pokemons?.map(pokemon => (
                    <Pokemon
                        key={pokemon.id}
                        item={pokemon}
                    />
                ))}
            </div>
        </>
    )
};

export default memo(Home);