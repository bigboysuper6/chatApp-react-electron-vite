import { ReactComponent as ArrowLeftSvg } from "@assets/arrowLeft.svg";
import { ReactComponent as ThreeDotsVerticalSvg } from "@assets/threeDotsVertical.svg";
import { ChatInfoContext } from "..";
import { useContext } from "react";
import DropdownMenu from "@/components/DropdownMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { deleteRoom } from "@/api/group";
import { deleteChatRoom } from "@/app/Slices/message";
const ChatInfoHeader = () => {
    const { setIsDisplay, socket, setVisible } = useContext(ChatInfoContext);
    const dispatch = useDispatch();
    const currentRoom = useSelector<RootState, string>((state) => {
        return state.message.value.currentRoom;
    });
    const groupInfo = useSelector<RootState, any>((state) => {
        return state.message.value.groupInfo;
    });
    const userId = useSelector((state: any) => state.user.value.userInfo._id);
    const handleDelete = async () => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(
                JSON.stringify({
                    type: "deleteRoom",
                    roomId: currentRoom,
                })
            );
        }
        await deleteRoom(currentRoom).then((res) => {
            return res.data.roomId;
        });
        alert("成功解散群组");
    };
    const menuItems = ["解散群组"];
    const handleEvents = [handleDelete];

    return (
        <>
            <div className="chat-info-header pb-4 border-bottom">
                <div className="d-flex justify-content-between svg-content align-items-center">
                    <div>
                        <ArrowLeftSvg onClick={() => setIsDisplay(false)} />
                    </div>
                    <div>
                        {groupInfo?.isGroup &&
                            groupInfo.owner._id == userId && (
                                <DropdownMenu
                                    menuItems={menuItems}
                                    handleEvents={handleEvents}
                                    direction={"dropstart"}
                                />
                            )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default ChatInfoHeader;
