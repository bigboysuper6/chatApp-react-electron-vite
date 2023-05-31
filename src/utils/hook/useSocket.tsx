import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setVerify,
    setMessages,
    setNewestMessage,
    addChatRooms,
} from "@/app/Slices/message";
import { setUserInfo } from "@/app/Slices/user";
import { RootState } from "@/app/store";
import { details } from "@/api/user";
import { deleteChatRoom } from "@/app/Slices/message";
import { deleteFriend as deleteFriendLocal } from "@/app/Slices/user";
const useSocket = (url: string) => {
    const socketRef = useRef<WebSocket | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const currentRoom = useSelector<RootState, string>((state) => {
        return state.message.value.currentRoom;
    });
    const userIndex = useSelector((state: any) => {
        return state.user.value.userInfo;
    });

    const [visibleBox, setVisibleBox] = useState<false | null>(null);

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
        userIndexRef.current = userIndex._id;
    }, [currentRoom, userIndex]);

    const createSocket = () => {
        socketRef.current = new WebSocket(url);
        setSocket(socketRef.current);
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
                friendId,
            } = message;

            if (type === "verify") {
                console.log(message);
                if (recevierId !== userIndexRef.current)
                    if (verify == true) dispatch(setVerify(message));
                    else {
                        dispatch(setVerify(verify));
                    }
                if (verify !== true && verify.result === true)
                    dispatch(addChatRooms({ room: rooms }));
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
            } else if (type === "join_room") {
                if (roomId !== undefined) {
                    if (socketRef.current?.readyState === WebSocket.OPEN) {
                        socketRef.current?.send(
                            JSON.stringify({
                                type: "join_verify",
                                userId,
                                content,
                                createdAt: Date.now(),
                                roomId,
                                recevierId,
                                groupName,
                            })
                        );
                    }
                }
            } else if (type == "deleteFriend") {
                dispatch(deleteChatRoom({ roomId }));
                if (userIndexRef.current == userId)
                    dispatch(deleteFriendLocal({ friendId }));
                else {
                    dispatch(deleteFriendLocal({ friendId: userId }));
                }
                if (currentRoomRef.current == roomId) setVisibleBox(false);
            } else if (type == "deleteRoom") {
                dispatch(deleteChatRoom({ roomId }));
                console.log(
                    currentRoomRef.current,
                    "deleteRoom",
                    roomId,
                    "deleteRoom"
                );
                if (currentRoomRef.current == roomId) {
                    setVisibleBox(false);
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

    return [socket, visibleBox];
};

export default useSocket;
