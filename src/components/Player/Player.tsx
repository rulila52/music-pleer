import { ChangeEvent, MouseEvent, FC, useRef, useState, useEffect } from "react";
import { SongData } from "../../models/SongData";
import clsx from "clsx";
import Logo from "../../../public/logo.svg";
import s from "./Player.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
    setIsPlayingAction,
    toNextSongAction,
    toPrevSongAction,
} from "../../store/songs/songsReducer";
import { RootState } from "../../store/store";
import NextButton from "../../assets/images/controls/forward.svg";
import PrevButton from "../../assets/images/controls/rewind.svg";
import PlayButton from "../../assets/images/controls/play.svg";
import PauseButton from "../../assets/images/controls/pause.svg";
import QuietVolumeButton from "../../assets/images/volume/volume-quiet.svg";
import LoudVolumeButton from "../../assets/images/volume/volume-loud.svg";
import defaultCover from "../../assets/images/covers/no_cover.jpg";

const noTitle = "Без названия";
const noArtist = "Неизвестный";

export const Player: FC = () => {
    const dispatch = useDispatch();
    const currentSongIndex = useSelector<RootState, number>(({ songs }) => songs.currentSongIndex);
    const songs = useSelector<RootState, SongData[]>(({ songs }) => songs.list);
    const isPlaying = useSelector<RootState, boolean>(({ songs }) => songs.isPlaying);

    const [volume, setVolume] = useState(0.5);
    const [progress, setProgress] = useState(0);

    const [withAnimation, setWithAnimation] = useState<boolean>(true);
    const [isRotating, setIsRotating] = useState<boolean>(false);

    const progressBarRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const song = songs[currentSongIndex];

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        const newIsPlaying = !audioRef.current?.paused;
        dispatch(setIsPlayingAction(newIsPlaying));
        setIsRotating(newIsPlaying);
    }, [audioRef.current?.paused]);

    const playSong = () => audioRef.current?.play();
    const pauseSong = () => audioRef.current?.pause();

    const changeSong = (toPrev?: boolean) => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        dispatch(toPrev ? toPrevSongAction() : toNextSongAction());
        setWithAnimation(false);

        setTimeout(() => {
            setWithAnimation(true);
            audioRef.current?.play();
        }, 0);
    };

    const setVolumeLouder = () => {
        if (!audioRef.current) return;
        const newValue = volume + 0.1 > 1 ? 1 : volume + 0.1;
        setVolume(newValue);
    };

    const setVolumeQuiet = () => {
        if (!audioRef.current) return;
        const newValue = volume - 0.1 < 0 ? 0 : volume - 0.1;
        setVolume(newValue);
    };

    const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        setVolume(+event.target.value);
    };

    const handleProgressUpdate = () => {
        if (!audioRef.current) return;
        const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(progress);
    };

    const handleProgressClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (!audioRef.current || !progressBarRef.current) return;
        const progressWidth = progressBarRef.current.clientWidth;
        const clickX = event.nativeEvent.offsetX;
        const duration = audioRef.current.duration;
        audioRef.current.currentTime = (clickX / progressWidth) * duration;
    };

    return (
        <>
            <div className={clsx(s["player"], s["player--relative"], s["player--disk-margin"])}>
                <div className={clsx(s["player__container"])}>
                    <div
                        className={clsx(
                            s["controls"],
                            s["controls--padding"],
                            s["controls--margin"],
                        )}
                    >
                        <button
                            className={clsx(s["controls__button"], s["controls__button--small"])}
                            onClick={() => changeSong(true)}
                        >
                            <PrevButton
                                aria-label="Предыдущий трек"
                                className={s["controls__button-inner"]}
                            />
                        </button>
                        <button
                            className={clsx(s["controls__button"], s["controls__button--big"])}
                            onClick={isPlaying ? pauseSong : playSong}
                        >
                            {isPlaying ? (
                                <PauseButton
                                    aria-label="Пауза"
                                    className={s["controls__button-inner"]}
                                />
                            ) : (
                                <PlayButton
                                    aria-label="Воспроизвести"
                                    className={s["controls__button-inner"]}
                                />
                            )}
                        </button>
                        <button
                            className={clsx(s["controls__button"], s["controls__button--small"])}
                            onClick={() => changeSong()}
                        >
                            <NextButton
                                aria-label="Следующий трек"
                                className={s["controls__button-inner"]}
                            />
                        </button>
                    </div>
                    <div className={clsx(s["middle-block"], s["middle-block--relative"])}>
                        <Logo aria-label="Логотип" className={s["middle-block__logo"]} />
                        <div
                            className={clsx(
                                s["middle-block__content"],
                                s["middle-block__content--padding"],
                                s["middle-block__content--absolute"],
                            )}
                        >
                            <div className={s["volume"]}>
                                <button
                                    className={clsx(
                                        s["volume__button"],
                                        s["volume__button--small"],
                                    )}
                                    onClick={setVolumeQuiet}
                                >
                                    <QuietVolumeButton
                                        aria-label="Понизить громкость"
                                        className={s["volume__button-inner"]}
                                    />
                                </button>
                                <input
                                    className={clsx(
                                        "slider slider--progress-color slider--medium",
                                        s["volume__slider--expanded"],
                                        s["volume__slider--margin"],
                                    )}
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                />
                                <button
                                    className={clsx(
                                        s["volume__button"],
                                        s["volume__button--small"],
                                    )}
                                    onClick={setVolumeLouder}
                                >
                                    <LoudVolumeButton
                                        aria-label="Повысить громкость"
                                        className={s["volume__button-inner"]}
                                    />
                                </button>
                            </div>
                            <div className={clsx(s["song-info"], s["song-info--padding"])}>
                                <div className={s["song-info__title"]}>{song.title || noTitle}</div>
                                <div className={s["song-info__artist"]}>
                                    {song.artist || noArtist}
                                </div>
                            </div>
                            <button
                                onClick={handleProgressClick}
                                className={clsx(s["progress-bar"], !isPlaying && "invisible")}
                            >
                                <div ref={progressBarRef} className={clsx(s["progress-bar__all"])}>
                                    <div
                                        className={s["progress-bar__played"]}
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={clsx(
                        s["disk"],
                        s["disk--position"],
                        withAnimation && s["disk--rotate"],
                        !isRotating && s["disk--rotate-stopped"],
                    )}
                >
                    <img
                        src={song.cover || defaultCover}
                        alt="Крутящаяся обложка в диске"
                        className={clsx(s["disk__inner"])}
                    />
                </div>
            </div>
            <audio
                ref={audioRef}
                src={song.audioFile}
                onTimeUpdate={handleProgressUpdate}
                onEnded={() => changeSong()}
            ></audio>
        </>
    );
};
