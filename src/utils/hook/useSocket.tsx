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
    const [socket, setSocket] = useState(new WebSocket(url));
    const currentRoom = useSelector<RootState, string>((state) => {
        return state.message.value.currentRoom;
    });
    const userIndex = useSelector((state: any) => {
        return state.user.value.userInfo;
    });
    const currentRoomRef = useRef<string>(currentRoom);
    const userIndexRef = useRef<string>(userIndex);
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

    useEffect(() => {
        const handleOpen = (event: any) => {
            console.log("WebSocket connected open");
            getDetails().then((res) => {
                socket.send(
                    JSON.stringify({
                        type: "join",
                        userId: res._id,
                        info: false,
                    })
                );
            });
        };

        const handleMessage = (event: any) => {
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
                result,
            } = message;

            if (type === "verify") {
                console.log(message);
                if (recevierId !== userIndexRef.current)
                    dispatch(setVerify(message));
                if (result === true)
                    dispatch(setChatRooms({ rooms: [message] }));
            } else if (type === "join") {
                if (roomId !== undefined) {
                    if (socket.readyState === WebSocket.OPEN) {
                        socket.send(
                            JSON.stringify({
                                type: "verify",
                                userId,
                                content,
                                createdAt: Date.now(),
                                roomId,
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

        const handleClose = (event: any) => {
            console.log("WebSocket disconnected");
        };

        const handleError = (event: any) => {
            console.error("WebSocket error:", event.error);
        };
        socket.addEventListener("open", handleOpen);
        socket.addEventListener("message", handleMessage);
        socket.addEventListener("close", handleClose);
        socket.addEventListener("error", handleError);

        return () => {
            socket.close();
        };
    }, []);

    return [socket];
};

export default useSocket;
