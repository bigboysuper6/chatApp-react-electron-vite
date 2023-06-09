import Search from "@/components/Search";
import ChatCard from "@/components/ChatCard";
import { useSelector, useDispatch } from "react-redux";
import { getVerify } from "@/api/message";
import { useEffect, useState } from "react";
import { setVerify, resetVerify } from "@/app/Slices/message";

const NotificationList = () => {
    const { verify } = useSelector((state: any) => state.message.value);

    const [allVerfiy, setAllVerfiy] = useState<any>([]);
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

    useEffect(() => {
        const senderVerify = verify.map((item: any) => {
            if (item.userId === userId && typeof item.result == "boolean") {
                const copyItem = { ...item };
                copyItem.result = null;
                return copyItem;
            }
        });
        const newVerify = [...senderVerify, ...verify]
            .filter((item: any) => item !== undefined)
            .filter((item, index, self) => {
                // 查找当前元素之后是否存在与当前元素roomId和createAt相同的元素
                const duplicateIndex = self.findIndex(
                    (other, otherIndex) =>
                        other.roomId === item.roomId &&
                        other.createAt === item.createAt &&
                        other.result === item.result &&
                        otherIndex > index
                );
                // 如果找到重复元素，则返回false，表示当前元素不会被保留
                return duplicateIndex === -1;
            })
            .sort((a, b) => {
                let compareA, compareB;
                if (typeof a.result == "boolean") {
                    compareA = a.updatedAt;
                } else {
                    compareA = a.createdAt;
                }
                if (typeof b.result == "boolean") {
                    compareB = b.updatedAt;
                } else {
                    compareB = b.createdAt;
                }
                return Date.parse(compareB) - Date.parse(compareA);
            });
        setAllVerfiy(newVerify);
    }, [verify]);

    console.log(allVerfiy, "allVerfiy");
    return (
        <>
            <div className="chat-list hidden-overflow px-4 bg-light">
                <h2 className="fw-bold">通知</h2>
                {/* <Search /> */}
                {allVerfiy.map((item: verifyInterface, index: number) => {
                    console.log(item, index, "item");
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
                                    item.userId === userId && !item.result
                                        ? "已发送邀请"
                                        : item.userId === userId && item.result
                                        ? "已接收邀请"
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
                                isGroup={item.group}
                                groupName={item.groupName}
                                avatar={
                                    item.userId === userId && item.result
                                        ? item.recevierAvatar
                                        : item.senderAvatar
                                }
                                item={item}
                                index={index}
                            />
                        </>
                    );
                })}
            </div>
        </>
    );
};
export default NotificationList;
