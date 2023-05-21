import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setVerify,
    setMessages,
    setNewestMessage,
    setChatRooms,
} from "@/app/Slices/message";
import { setUserInfo } from "@/app/Slices/user";
import { RootState } from "@/app/store";
import { details } from "@/api/user";

const useSocket = (url: string) => {
    const socketRef = useRef<WebSocket | null>(null);
    const currentRoom = useSelector<RootState, string>((state) => {
        return state.message.value.currentRoom;
    });
    const userIndex = useSelector((state: any) => {
        return state.user.value.userInfo;
    });
    const currentRoomRef = useRef<string>(currentRoom);
    const userIndexRef = useRef<string>(userIndex);
    const timeoutRef = useRef<null | NodeJS.Timeout>(null);
    const dispatch = useDispatch();

    const getDetails = async () => {
        const user = await details().then((res) => {
            return res.data.user;
        });
        dispatch(setUserInfo({ userInfo: user }));
        return user;
    };

    useEffect(() => {
        currentRoomRef.current = currentRoom;
        userIndexRef.current = userIndex;
    }, [currentRoom, userIndex]);

    const createSocket = () => {
        socketRef.current = new WebSocket(url);

        socketRef.current.onopen = () => {
            console.log("WebSocket connected open");
            getDetails().then((res) => {
                socketRef.current?.send(
                    JSON.stringify({
                        type: "join",
                        userId: res._id,
                        info: false,
                    })
                );
            });
        };

        socketRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            const {
                type,
                content,
                createAt,
                name,
                roomId,
                source,
                recevierId,
                userId,

                groupName,
                verify,
                rooms,
            } = message;

            if (type === "verify") {
                console.log(message);
                if (recevierId !== userIndexRef.current)
                    if (verify == true) dispatch(setVerify(message));
                    else {
                        dispatch(setVerify(verify));
                    }
                if (verify !== true && verify.result === true)
                    dispatch(setChatRooms({ rooms }));
            } else if (type === "join") {
                if (roomId !== undefined) {
                    if (socketRef.current?.readyState === WebSocket.OPEN) {
                        socketRef.current?.send(
                            JSON.stringify({
                                type: "verify",
                                userId,
                                content,
                                createdAt: Date.now(),
                                roomId,
                                groupName,
                            })
                        );
                    }
                }
            } else {
                if (currentRoomRef.current === roomId)
                    dispatch(setMessages({ messages: [message] }));
                dispatch(
                    setNewestMessage({
                        newestMessage: message,
                        roomId,
                    })
                );
            }
        };

        socketRef.current.onclose = () => {
            reconnect();
        };

        socketRef.current.onerror = (error) => {
            reconnect();
        };
    };
    useEffect(() => {
        createSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current.onopen = null;
                socketRef.current.onmessage = null;
                socketRef.current.onclose = null;
                socketRef.current.onerror = null;
            }
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const reconnect = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            console.log("重连中");
            createSocket();
        }, 3000);
    };

    return [socketRef.current];
};

export default useSocket;
