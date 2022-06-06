import { InfoPokemons } from "../../../domain/models"
import './pokemons-style.scss';

type Props = {
    pokemons: InfoPokemons[]
}

const Pokemons: React.FC<Props> = ({ pokemons }: Props) => {
    return (
        <div className='PokemonContainer'>
            {pokemons && pokemons.map((item: InfoPokemons, index: number) => {
                return (
                    <div className='PokemonItem' key={index}>
                        <img src={item.sprites.front_default} />
                        <h3>{item.name}</h3>
                    </div>
                )
            })}

            {!pokemons && (
                <>
                    <div className='PokemonItem' />
                    <div className='PokemonItem' />
                    <div className='PokemonItem' />
                    <div className='PokemonItem' />
                    <div className='PokemonItem' />
                    <div className='PokemonItem' />
                    <div className='PokemonItem' />
                    <div className='PokemonItem' />
                    <div className='PokemonItem' />
                    <div className='PokemonItem' />
                    <div className='PokemonItem' />
                    <div className='PokemonItem' />
                </>
            )}
        </div>
    )
}

export default Pokemons;