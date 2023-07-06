import { memo } from "react";
import style from './index.module.css';

const Header: React.FC = () => {

    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.logo}>
                    <p>Pokedex</p>
                </div>
                <div className={style.search}>
                    Barra pesquisa
                </div>
            </div>
        </div>
    )
};

export default memo(Header);