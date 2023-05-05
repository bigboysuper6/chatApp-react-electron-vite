import { useState } from "react";

const useOpen = (init: boolean): [boolean, () => void] => {
    const [modal, setModal] = useState<boolean>(init);

    const toggle = () => setModal(!modal);

    return [modal, toggle];
};

export default useOpen;
