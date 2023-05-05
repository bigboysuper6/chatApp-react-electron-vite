import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { getMessage } from "@/api/message";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { extractAttributes } from "@/utils/utils";
import { createContext, useEffect, useState } from "react";
import {
    setNewestMessage,
    setMessages,
    resetMessages,
} from "@/app/Slices/message";
export const ChatFooterContext = createContext<any>({});

const ChatBox = () => {
    const dispatch = useDispatch();
    const roomId: string = useSelector<RootState, string>((state) => {
        return state.message.value.currentRoom;
    });
    const userId = useSelector((state: any) => {
        return state.user.value.userInfo._id;
    });
    const messages = useSelector<RootState, any[]>((state) => {
        return state.message.value.messages;
    });

    useEffect(() => {
        if (roomId) getTheMessage();
        return () => {
            dispatch(resetMessages());
        };
    }, [roomId]);

    useEffect(() => {
        dispatch(
            setNewestMessage({
                newestMessage: messages[messages.length - 1],
                roomId,
            })
        );
    }, [messages]);

    const getTheMessage = async () => {
        const messages = await getMessage({ roomId, userId }).then((res) => {
            return res.data.messages;
        });
        console.log(messages);
        dispatch(setMessages({ messages }));
    };

    const handleMessages = (data: any) => {
        dispatch(setMessages({ messages }));
    };

    return (
        <>
            <div
                className={
                    "chat-box d-flex flex-column position-relative pt-4 "
                }
            >
                <ChatHeader />
                <ChatBody userId={userId} />
                <ChatFooterContext.Provider value={{ handleMessages }}>
                    <ChatFooter />
                </ChatFooterContext.Provider>
            </div>
        </>
    );
};

export default ChatBox;
