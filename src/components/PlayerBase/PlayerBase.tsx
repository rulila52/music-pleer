import { FC, useEffect } from "react";
import { Background } from "../Background/Background";
import { songsList } from "../../storage/songsList";
import { Player } from "../Player/Player";
import s from "./PlayerBase.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useVisualViewportHeight } from "../../hooks/useVisualViewportHeight";
import { useVisualViewportWidth } from "../../hooks/useVisualViewportWidth";

export const PlayerBase: FC = () => {
    const currentSongIndex = useSelector<RootState, number>(({ songs }) => songs.currentSongIndex);
    const height = useVisualViewportHeight();
    const width = useVisualViewportWidth();

    return (
        <div className={s["base"]} style={{ height: `${height}px` }}>
            <Background cover={songsList[currentSongIndex].cover} />
            <div className={s["player-wrapper"]}>
                <Player />
            </div>
        </div>
    );
};
