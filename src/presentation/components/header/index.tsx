import { memo } from "react";
import PokebolSvg from '../../assets/images/pokeball.svg';
import style from './index.module.css';

const Header: React.FC = () => {

    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.logo}>
                    <img className={style.image} src={PokebolSvg} alt="Pokeboll" />
                    <p>Pokedex</p>
                </div>
                <div className={style.search}>
                    <input className={style.input} type="text" placeholder="Find pokemon" />
                </div>
            </div>
        </div>
    )
};

export default memo(Header);