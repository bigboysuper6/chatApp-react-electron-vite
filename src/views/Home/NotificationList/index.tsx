import Search from "@/components/Search";
import ChatCard from "@/components/ChatCard";
import { useSelector, useDispatch } from "react-redux";
import { getVerify } from "@/api/message";
import { useEffect } from "react";
import { setVerify, resetVerify } from "@/app/Slices/message";

const NotificationList = () => {
    const { verify } = useSelector((state: any) => state.message.value);

    const userId = useSelector((state: any) => {
        return state.user.value.userInfo._id;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) getTheVerify();
        return () => {
            dispatch(resetVerify());
        };
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
                    let result;
                    if (item.userId === userId && item.result) {
                        result = "recevierAgree";
                    } else if (item.userId === userId && item.result !== null) {
                        result = "recevierRefuse";
                    } else if (userId === item.userId) {
                        result = "sender";
                    } else {
                        result = item.result;
                    }
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
                                    result as
                                        | boolean
                                        | "sender"
                                        | "recevierAgree"
                                        | "recevierRefuse"
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
