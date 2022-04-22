import React from 'react';
import Styles from './pokemon-style.scss';

const Pokemon: React.FC = () =>{
    return(
        <div className={Styles.navBar}>
            <text>Pokemons</text>
        </div>
    )
}

export default Pokemon;