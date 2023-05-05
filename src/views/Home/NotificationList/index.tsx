import Search from "@/components/Search";
import ChatCard from "@/components/ChatCard";
import { useSelector, useDispatch } from "react-redux";
import { getVerify } from "@/api/message";
import { useEffect } from "react";
import { setVerify } from "@/app/Slices/message";

const NotificationList = () => {
    const { verify } = useSelector((state: any) => state.message.value);

    const userId = useSelector((state: any) => {
        return state.user.value.userInfo._id;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) getTheVerify();
    }, [userId]);

    const getTheVerify = async () => {
        const verify = await getVerify({ userId }).then(
            (res) => res.data.verify
        );
        verify.forEach((item: any) => {
            dispatch(setVerify(item));
        });
    };

    return (
        <>
            <div className="chat-list hidden-overflow px-4 bg-light">
                <h2 className="fw-bold">通知</h2>
                <Search />
                {verify.map((item: verifyInterface, index: number) => {
                    return (
                        <>
                            <ChatCard
                                key={index}
                                isNotification={true}
                                text={
                                    item.userId === userId
                                        ? "已发送邀请"
                                        : item.content
                                }
                                name={item.name}
                                time={item.time}
                                theResult={
                                    item.userId === userId
                                        ? "sender"
                                        : item.result
                                }
                                roomId={item.roomId}
                                recevierId={item.recevierId}
                                friendId={
                                    item.userId === userId
                                        ? item.recevierId
                                        : item.userId
                                }
                            />
                        </>
                    );
                })}
            </div>
        </>
    );
};
export default NotificationList;
