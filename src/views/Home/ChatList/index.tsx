import Search from "../../../components/Search";
import ChatCard from "../../../components/ChatCard";
import { useSelector, useDispatch } from "react-redux";
import {
    setChatRooms,
    setCurrentRoom,
    resetChatRooms,
    setGroupInfo,
} from "@/app/Slices/message";
import { getRooms } from "@/api/message";
import { useEffect, useContext } from "react";
import { AsideContext } from "..";
import { groupMembers } from "@/api/group";
import moment from "moment";

const ChatList = () => {
    const dispatch = useDispatch();
    const rooms = useSelector((state: any) => state.message.value.chatRooms);
    const { setVisible } = useContext(AsideContext);
    const userId = useSelector((state: any) => {
        return state.user.value.userInfo._id;
    });
    const currentRoom = useSelector(
        (state: any) => state.message.value.currentRoom
    );
    useEffect(() => {
        if (userId) getTheRooms();
        return () => {
            dispatch(resetChatRooms());
        };
    }, [userId]);
    const room = rooms.find((item: any) => item._id == currentRoom);
    useEffect(() => {
        if (currentRoom !== "") handleClick(currentRoom);
    }, [room]);

    const getTheRooms = async () => {
        const rooms = await getRooms({ userId }).then((res) => {
            const verify = res.data.roomsAgree;
            return verify;
        });
        dispatch(setChatRooms({ rooms }));
    };

    const handleClick = async (roomId: string) => {
        console.log("执行一次handleClick");
        setVisible(true);
        dispatch(setCurrentRoom({ roomId }));
        const groupInfo = await groupMembers({ roomId }).then((res) => {
            return res.data;
        });
        dispatch(setGroupInfo({ groupInfo }));
    };

    console.log(rooms, "rooms");

    return (
        <>
            <div className="chat-list hidden-overflow px-4 bg-light ">
                <h2 className="fw-bold">对话</h2>
                <Search />
                {rooms.map((item: any) => {
                    console.log(userId, item.owner?._id);
                    return (
                        <>
                            <ChatCard
                                onClick={() => handleClick(item._id)}
                                text={item.newestMessage}
                                name={
                                    item.members?.length > 1
                                        ? item.owner?.name
                                        : userId === item.owner?._id
                                        ? item.memberDetails?.name
                                        : item.owner?.name
                                }
                                roomId={item.roomId}
                                time={moment(item.createdAt).format(
                                    "YYYY-MM-DD hh:mm A"
                                )}
                                avatar={
                                    item.members?.length > 1
                                        ? item.owner?.avatar
                                        : userId === item.owner?._id
                                        ? item.memberDetails?.avatar
                                        : item.owner?.avatar
                                }
                                isGroup={item.members?.length > 1}
                                groupName={item.groupDetails?.name}
                                membersAvatars={item.allowMembersAvatars?.slice(
                                    0,
                                    3
                                )}
                                membersNumber={item.allowMembers?.length + 1}
                            />
                        </>
                    );
                })}
            </div>
        </>
    );
};
export default ChatList;
