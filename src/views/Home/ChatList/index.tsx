import Search from "../../../components/Search";
import ChatCard from "../../../components/ChatCard";
import { useSelector, useDispatch } from "react-redux";
import { setChatRooms, setCurrentRoom } from "@/app/Slices/message";
import { getRooms } from "@/api/message";
import { useEffect, useContext } from "react";
import { AsideContext } from "..";

const ChatList = () => {
    const dispatch = useDispatch();
    const rooms = useSelector((state: any) => state.message.value.chatRooms);
    const { setVisible } = useContext(AsideContext);
    const userId = useSelector((state: any) => {
        return state.user.value.userInfo._id;
    });

    useEffect(() => {
        if (userId) getTheRooms();
    }, [userId]);

    const getTheRooms = async () => {
        const rooms = await getRooms({ userId }).then((res) => {
            const verify = res.data.roomsAgree;
            return verify;
        });
        dispatch(setChatRooms({ rooms, reset: true }));
    };

    const handleClick = (roomId: string) => {
        setVisible(true);
        dispatch(setCurrentRoom({ roomId }));
    };

    return (
        <>
            <div className="chat-list hidden-overflow px-4 bg-light ">
                <h2 className="fw-bold">对话</h2>
                <Search />
                {rooms.map((item: any) => {
                    return (
                        <>
                            <ChatCard
                                onClick={() => handleClick(item.roomId)}
                                text={item.newestMessage}
                                name={"Jaron"}
                                roomId={item.roomId}
                                time={"12.00pm"}
                            />
                        </>
                    );
                })}
                {/* <ChatCard />
                <ChatCard />
                <ChatCard isGroup={true} />
                <ChatCard isGroup={true} />
                <ChatCard isGroup={true} />
                <ChatCard isGroup={true} />
                <ChatCard isGroup={true} />
                <ChatCard isGroup={true} /> */}
            </div>
        </>
    );
};
export default ChatList;
