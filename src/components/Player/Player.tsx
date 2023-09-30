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

    const [isRotating, setIsRotating] = useState<boolean>(false);
    const [rotationAngle, setRotationAngle] = useState(0);
    const animationFrameRef = useRef<number | null>(null);

    const progressBarRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const song = songs[currentSongIndex];

    const rotatingDisk = () => {
        animationFrameRef.current = requestAnimationFrame(() => {
            setRotationAngle((prevAngle) => prevAngle + 0.2);
            rotatingDisk();
        });
    };

    const stopRotatingDisk = () => {
        if (!animationFrameRef.current) return;
        cancelAnimationFrame(animationFrameRef.current);
    };

    useEffect(() => {
        setIsRotating(isPlaying);
        if (isPlaying) {
            rotatingDisk();
        } else {
            stopRotatingDisk();
        }
    }, [isPlaying]);

    const playSong = () => {
        if (!audioRef.current) return;
        audioRef.current.play();
        dispatch(setIsPlayingAction(true));
    };

    const pauseSong = () => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        dispatch(setIsPlayingAction(false));
    };

    const changeSong = (toPrev?: boolean) => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        dispatch(toPrev ? toPrevSongAction() : toNextSongAction());

        setTimeout(() => {
            dispatch(setIsPlayingAction(!!audioRef.current && !!animationFrameRef.current));
            if (!audioRef.current || !animationFrameRef.current) return;
            audioRef.current.play();
            stopRotatingDisk();
            setRotationAngle(0);
            rotatingDisk();
        }, 0);
    };

    const setVolumeLouder = () => {
        if (!audioRef.current) return;
        const newValue = volume + 0.1 > 1 ? 1 : volume + 0.1;
        setVolume(newValue);
        audioRef.current.volume = newValue;
    };

    const setVolumeQuiet = () => {
        if (!audioRef.current) return;
        const newValue = volume - 0.1 < 0 ? 1 : volume - 0.1;
        setVolume(newValue);
        audioRef.current.volume = newValue;
    };

    const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        setVolume(+event.target.value);
        audioRef.current.volume = +event.target.value;
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
                            onClick={() => changeSong()}
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
                            onClick={() => changeSong(true)}
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
                        isRotating && s["disk--transition"],
                    )}
                    style={{
                        transform: `rotate(${rotationAngle}deg)`,
                    }}
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
