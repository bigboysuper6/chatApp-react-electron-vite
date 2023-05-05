import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVerify, setMessages, setNewestMessage } from "@/app/Slices/message";
import { RootState } from "@/app/store";

const useSocket = (url: string) => {
    const [socket, setSocket] = useState(new WebSocket(url));
    const currentRoom = useSelector<RootState, string>((state) => {
        return state.message.value.currentRoom;
    });
    const currentRoomRef = useRef<string>(currentRoom);
    const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        currentRoomRef.current = currentRoom;
    }, [currentRoom]);

    useEffect(() => {
        const handleOpen = (event: any) => {
            console.log("WebSocket connected open");
            socket.send(
                JSON.stringify({
                    type: "join",
                    userId: "644a26c2650053651d9fdcf4",
                    info: false,
                })
            );
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
            } = message;

            if (type === "verify") {
                dispatch(setVerify(message));
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
                    dispatch(setMessages({ messages: message }));
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
            reconnect();
        };

        const handleError = (event: any) => {
            console.error("WebSocket error:", event.error);
            reconnect();
        };
        socket.addEventListener("open", handleOpen);
        socket.addEventListener("message", handleMessage);
        socket.addEventListener("close", handleClose);
        socket.addEventListener("error", handleError);
        console.log(socket.readyState);

        return () => {
            if (retryTimeoutRef.current) {
                clearTimeout(retryTimeoutRef.current);
            }
        };
    }, [socket]);

    const reconnect = () => {
        if (retryTimeoutRef.current) {
            clearTimeout(retryTimeoutRef.current);
        }
        retryTimeoutRef.current = setTimeout(() => {
            console.error("重新连接中");
            const ws = new WebSocket(url);
            setSocket(ws);
        }, 1000);
    };

    return [socket];
};

export default useSocket;
