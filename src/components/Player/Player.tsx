import { FC, HTMLAttributes } from "react";
import { SongData } from "../../models/SongData";
import clsx from "clsx";
import s from "./Player.module.css";

type PlayerProps = {
    song: SongData;
} & HTMLAttributes<HTMLDivElement>;

const noTitle = "Без названия";

export const Player: FC<PlayerProps> = ({ song, className, ...props }) => {
    return (
        <div {...props} className={clsx(className, s["player"])}>
            <div>{song.title || noTitle}</div>
        </div>
    );
};
