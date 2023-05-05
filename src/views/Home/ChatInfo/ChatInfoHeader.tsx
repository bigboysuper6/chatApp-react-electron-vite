import { ReactComponent as ArrowLeftSvg } from "@assets/arrowLeft.svg";
import { ReactComponent as ThreeDotsVerticalSvg } from "@assets/threeDotsVertical.svg";
import { ChatInfoContext } from "..";
import { useContext } from "react";
import ToolTip from "../../../components/ToolTip";

const ChatInfoHeader = () => {
    const { setIsDisplay } = useContext(ChatInfoContext);
    return (
        <>
            <div className="chat-info-header pb-4 border-bottom">
                <div className="d-flex justify-content-between svg-content align-items-center">
                    <div>
                        <ArrowLeftSvg onClick={() => setIsDisplay(false)} />
                    </div>
                    <div>
                        <ToolTip />
                    </div>
                </div>
            </div>
        </>
    );
};
export default ChatInfoHeader;
