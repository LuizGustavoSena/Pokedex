import Home from "@/presentation/pages/home";
import { memo } from "react";
import { makeRemotePokemon } from "../usecases/";

const MakeHome: React.FC = () => {
    return (
        <Home
            remotePokemon={makeRemotePokemon()}
        />
    )
}

export default memo(MakeHome);
