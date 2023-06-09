import { ReactComponent as SendMessageSvg } from "@assets/sendMessage.svg";
import { ReactComponent as SelectFileSvg } from "@assets/selectFile.svg";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Form } from "reactstrap";
import { useCallback, useState } from "react";
import { throttle } from "@/utils/utils";
import { useContext, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { ChatFooterContext } from "..";
import { ChatBoxContext } from "../..";
import { sendFile } from "@/api/message";
interface IMessageInputsProps {
    message: string;
    file: File | null;
}

type IMessageInputProps = {};

const MessageInput = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<IMessageInputsProps>({
        defaultValues: {
            message: "",
        },
    });
    const { ref, ...rest } = register("file");
    const { socket } = useContext(ChatBoxContext);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const roomId: string = useSelector<RootState, string>((state) => {
        return state.message.value.currentRoom;
    });

    const userId: string = useSelector((state: any) => {
        return state.user.value.userInfo._id;
    });

    const handleSend = (data: string) => {
        if (socket.readyState === WebSocket.OPEN) {
            console.log("发送message");
            socket.send(
                JSON.stringify({
                    type: "message",
                    content: data,
                    userId,
                    roomId,
                    createAt: Date.now(),
                })
            );
        }
    };

    const handleSendFile = (data: string, fileSize: string) => {
        if (socket.readyState === WebSocket.OPEN) {
            console.log("发送message");
            socket.send(
                JSON.stringify({
                    type: "message",
                    content: data,
                    userId,
                    roomId,
                    createAt: Date.now(),
                    file: true,
                    fileSize,
                })
            );
        }
    };

    const onSubmit = async (data: any) => {
        const { message, file } = data;
        console.log(file);
        if (message !== "") {
            handleSend(message);
            reset({ message: "" });
        }
        if (file && file.length > 0) {
            await sendFile({ file: file[0] }).then((res) => {
                const path = res.data.file;
                const fileSize = res.data.fileSize;
                handleSendFile(path, fileSize);
            });

            reset({ file: null });
        }
    };

    const handleInputClick = () => {
        if (inputRef.current) {
            inputRef.current?.click();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault(); // 阻止默认行为
        }
    };
    return (
        <>
            <Form
                className="input-group rounded-pill p-2 message-input"
                onSubmit={handleSubmit(onSubmit)}
            >
                <span className="btn btn-icon ">
                    <input
                        type="file"
                        className="d-none"
                        {...rest}
                        id="file"
                        ref={(e) => {
                            ref(e);
                            inputRef.current = e; // you can still assign to ref
                        }}
                    />
                    <button
                        className="btn btn-icon"
                        type="button"
                        onClick={handleInputClick}
                    >
                        <SelectFileSvg />
                    </button>
                </span>
                <Controller
                    render={({ field }) => (
                        <input
                            type="text"
                            className="form-control"
                            id="message"
                            {...field}
                        />
                    )}
                    control={control}
                    name="message"
                />
                <button
                    className="btn btn-icon send-message rounded-circle ms-5"
                    type="submit"
                >
                    <SendMessageSvg />
                </button>
            </Form>
        </>
    );
};
export default MessageInput;
