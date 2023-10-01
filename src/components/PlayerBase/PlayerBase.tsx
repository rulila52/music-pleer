import { FC, useEffect } from "react";
import { Background } from "../Background/Background";
import { songsList } from "../../storage/songsList";
import { Player } from "../Player/Player";
import s from "./PlayerBase.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useInnerHeight } from "../../hooks/useInnerHeight";
import { isMobileDevice } from "../../utils/isMobile";

export const PlayerBase: FC = () => {
    const currentSongIndex = useSelector<RootState, number>(({ songs }) => songs.currentSongIndex);
    const height = useInnerHeight();

    const isMobile = isMobileDevice();

    useEffect(() => {
        console.log(height);
    }, [height]);

    return (
        <div className={s["base"]} style={{ height: isMobile ? `${height}px` : "100vh" }}>
            <Background cover={songsList[currentSongIndex].cover} />
            <div className={s["player-wrapper"]}>
                <Player />
            </div>
        </div>
    );
};
