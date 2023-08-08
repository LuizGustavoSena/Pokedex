import { memo } from "react";
import Pokemon from '../../assets/images/pokemon.svg';
import style from './index.module.css';

type Props = {
    onChange(text: string): void;
}

const Header: React.FC<Props> = ({ onChange }: Props) => {
    return (
        <div className={style.boxHeader} data-testid="headerComponent">
            <div className={style.box}>
                <div className={style.logo}>
                    <img className={style.image} src={Pokemon} alt="Pokeboll" />
                </div>
                <div className={style.search}>
                    <input
                        className={style.input}
                        data-testid="searchInput"
                        type="text"
                        onChange={e => onChange(e.target.value)}
                        placeholder="Find pokemon"
                    />
                </div>
            </div>
        </div>
    )
};

export default memo(Header);