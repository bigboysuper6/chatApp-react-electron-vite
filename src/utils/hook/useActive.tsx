import { useState } from "react";

const useActive = (
    defaultActiveIndex: number
): [number, (activeIndex: number) => void] => {
    const [active, setActive] = useState<number>(defaultActiveIndex);
    const handleActive = (activeIndex: number): void => {
        setActive(activeIndex);
    };
    return [active, handleActive];
};

export default useActive;
