import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import s from "./Background.module.css";

type BackgroundProps = {
    cover: string;
    withBlur?: boolean;
} & PropsWithChildren;

export const Background: FC<BackgroundProps> = ({ cover, withBlur, children }) => {
    const content = (
        <div className={clsx(s["background"], withBlur && s["background--blured"])}>
            <img src={cover} className={clsx(s["background__cover"])} alt="Обложка трека" />
            {children}
        </div>
    );

    if (withBlur)
        return (
            <div className={clsx(s["background__wrapper"], s["background__wrapper--blured"])}>
                {content}
            </div>
        );
    return content;
};
