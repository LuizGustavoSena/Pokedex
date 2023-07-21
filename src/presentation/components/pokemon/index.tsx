import { Pokemons } from "@/domain/usecases";
import { memo } from "react";
import style from './index.module.css';

type Props = {
    item: Pokemons.Model;
}

const Pokemon: React.FC<Props> = ({ item }: Props) => {
    return (
        <div className={style.item}>
            <div className={style.square}>
                <div className={style.circle}>
                    <img data-testid="imagePokemon" className={style.img} src={item.sprites.other.dream_world.front_default} />
                </div>
                <label data-testid="labelNamePokemon" className={style.labelName}>
                    {item.name}
                </label>
            </div>
        </div>
    )
}

export default memo(Pokemon);