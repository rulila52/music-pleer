import { FC } from "react";
import { Background } from "../Background/Background";
import { songsList } from "../../storage/songsList";
import { Player } from "../Player/Player";
import s from "./PlayerBase.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const PlayerBase: FC = () => {
    const currentSongIndex = useSelector<RootState, number>(({ songs }) => songs.currentSongIndex);

    return (
        <div className={s["base"]}>
            <Background cover={songsList[currentSongIndex].cover} />
            <div className={s["player-wrapper"]}>
                <Player />
            </div>
        </div>
    );
};
