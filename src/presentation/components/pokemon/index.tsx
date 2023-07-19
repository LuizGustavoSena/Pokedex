import { memo } from "react";
import style from './index.module.css';

const Pokemon: React.FC = () => {
    return (
        <div className={style.boxPokemon}>
            <div className={style.item}>
                hello Pokemon
            </div>
        </div>
    )
}

export default memo(Pokemon);