import { memo } from "react";
import Pokemon from '../../assets/images/pokemon.svg';
import style from './index.module.css';

const Header: React.FC = () => {

    return (
        <div className={style.boxHeader}>
            <div className={style.box}>
                <div className={style.logo}>
                    <img className={style.image} src={Pokemon} alt="Pokeboll" />
                </div>
                <div className={style.search}>
                    <input className={style.input} type="text" placeholder="Find pokemon" />
                </div>
            </div>
        </div>
    )
};

export default memo(Header);