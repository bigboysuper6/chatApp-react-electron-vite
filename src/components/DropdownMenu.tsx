import { ReactComponent as ThreeDotsVerticalSvg } from "@assets/threeDotsVertical.svg";
import { ReactComponent as DownloadSvg } from "@assets/download.svg";
import { useState } from "react";

type IDropdownMenu = {
    direction: "dropup" | "dropdown" | "dropstart" | "dropend";
    menuItems: any[];
    handleEvents: any[];
};

const DropdownMenu = ({
    direction,
    menuItems,
    handleEvents,
}: IDropdownMenu) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <span className="position-relative">
                <div className={`btn-group ${direction}`}>
                    <div
                        className="dropdown-toggle after-none before-none"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <ThreeDotsVerticalSvg
                            id="three-dots-vertical"
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    </div>
                    <ul className="dropdown-menu">
                        {menuItems.map((item, index) => {
                            return (
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={handleEvents[index]}
                                    >
                                        {item}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </span>
        </>
    );
};

export default DropdownMenu;
