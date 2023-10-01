import { useEffect, useState } from "react";

const getNewValue = (): number => window.innerHeight;

export const useInnerHeight = (): number => {
    const [value, setValue] = useState<number>(getNewValue());

    useEffect(() => {
        window.addEventListener("resize", () => setValue(getNewValue()));
        window.addEventListener("orientationchange", () => setValue(getNewValue()));

        return () => {
            window.removeEventListener("resize", () => setValue(getNewValue()));
            window.removeEventListener("orientationchange", () => setValue(getNewValue()));
        };
    }, []);
    return value;
};
