import './loading-styles.scss';

type Props = {
    loading: boolean;
}

const Loading: React.FC<Props> = ({ loading }: Props) =>{
    return(
        loading && (
            <div className="lds-ring">
                <div/><div/><div/><div/>
            </div>
        )
    )
}

export default Loading;