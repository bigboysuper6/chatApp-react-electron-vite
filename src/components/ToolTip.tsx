import { ReactComponent as ThreeDotsVerticalSvg } from "@assets/threeDotsVertical.svg";
import { ReactComponent as DownloadSvg } from "@assets/download.svg";
import { useState } from "react";

const ToolTip = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <span className="position-relative">
                <ThreeDotsVerticalSvg
                    id="three-dots-vertical"
                    onClick={() => setIsOpen(!isOpen)}
                />
                <div
                    className={`${
                        isOpen ? "" : "d-none"
                    } position-absolute tool-tip-content `}
                >
                    <ul className="py-2 px-4 tool-tip-ul my-0 border-radius">
                        <li>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>Edit</div>
                                <div>
                                    <DownloadSvg />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>Edit</div>
                                <div>
                                    <DownloadSvg />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between align-items-center text-danger">
                                <div>Edit</div>
                                <div>
                                    <DownloadSvg />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </span>
        </>
    );
};

export default ToolTip;
