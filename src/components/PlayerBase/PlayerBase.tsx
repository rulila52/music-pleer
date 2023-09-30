import { FC, useRef, useState } from "react";
import { Background } from "../Background/Background";
import { songs } from "../../storage/songs";
import defaultCover from "../../assets/images/covers/no_cover.jpg";
import { Player } from "../Player/Player";
import clsx from "clsx";

export const PlayerBase: FC = () => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef();

    return (
        <div className="vh-100 vw-100 position-relative">
            <Background cover={songs[currentSongIndex].cover || defaultCover} withBlur />
            <div className="position-absolute top-0 h-100 w-100 d-flex align-items-center justify-content-center">
                <Player song={songs[currentSongIndex]} className={clsx("position-absolute m-3")} />
            </div>
        </div>
    );
};
