import People from "@/components/People";
import { deleteFriend } from "@/api/friend";
import { deleteFriend as deleteFriendLocal } from "@/app/Slices/user";
import { deleteChatRoom } from "@/app/Slices/message";
import { AsideContext } from "@/views/Home";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
type PeopleGroupProps = {
    groupName: string;
    groupArr: object[];
    isSelectInput?: Boolean;
};

const PeopleGroup = ({
    groupName,
    groupArr,
    isSelectInput,
}: PeopleGroupProps) => {
    const { socket } = useContext(AsideContext);
    const dispatch = useDispatch();

    const handleDelete = async (friendId: string) => {
        console.log("删除好友");
        const roomId = await deleteFriend(friendId).then((res) => {
            return res.data.room._id;
        });
        const userId = useSelector((state: any) => {
            return state.user.value.userInfo._id;
        });
        dispatch(deleteChatRoom({ roomId }));
        dispatch(deleteFriendLocal({ friendId }));
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(
                JSON.stringify({ type: "deleteFriend", userId, roomId })
            );
        }
    };
    const menuItems = ["删除好友"];
    const handleEvents = [handleDelete];

    return (
        <>
            <div>
                <div className="text-color my-3">{groupName}</div>
                {groupArr?.map((item: any, index: number) => {
                    return (
                        <People
                            key={index}
                            groupIndex={groupName + index}
                            name={item.name}
                            isPeopleGroup={true}
                            isSelectInput={isSelectInput}
                            avatar={item.avatar}
                            peopleData={item}
                            menuItems={menuItems}
                            handleEvents={handleEvents.map(
                                (cur) => () => cur(item._id)
                            )}
                            direction={"dropend"}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default PeopleGroup;
