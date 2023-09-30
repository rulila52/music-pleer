import { useEffect, useState } from "react";

export const useVisualViewportWidth = (): number | undefined => {
    const getNewValue = (): number | undefined => window.visualViewport?.width;

    const [value, setValue] = useState<number | undefined>(getNewValue());

    useEffect(() => {
        window.visualViewport?.addEventListener("resize", () => setValue(getNewValue()));
        window.visualViewport?.addEventListener("orientationchange", () => setValue(getNewValue()));

        return () => {
            window.visualViewport?.removeEventListener("resize", () => setValue(getNewValue()));
            window.visualViewport?.removeEventListener("orientationchange", () =>
                setValue(getNewValue()),
            );
        };
    }, []);
    return value;
};
