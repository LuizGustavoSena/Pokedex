import Pokebol from '@/presentation/assets/images/pokeball.svg';
import { memo } from "react";
import style from './index.module.css';
type Props = {
    show: boolean;
}

const Loading: React.FC<Props> = ({ show }: Props) => {
    return (
        show && (
            <div className={style.boxLoading}>
                <div>
                    <img data-testid="image" className={style.img} src={Pokebol} />
                </div>
                <label data-testid="message" className={style.label}>
                    Carregando...
                </label>
            </div>
        )
    )
}

export default memo(Loading);