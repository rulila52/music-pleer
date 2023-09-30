import clsx from "clsx";
import { FC } from "react";
import s from "./Background.module.css";
import defaultCover from "../../assets/images/covers/no_cover.jpg";

type BackgroundProps = {
    cover?: string;
};

export const Background: FC<BackgroundProps> = ({ cover }) => (
    <div className={clsx(s["background__wrapper"], s["background__wrapper--blured"])}>
        <div className={clsx(s["background"], s["background--blured"])}>
            <img
                src={cover || defaultCover}
                className={clsx(s["background__cover"])}
                alt="Обложка трека"
            />
        </div>
    </div>
);
