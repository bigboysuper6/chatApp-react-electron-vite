import { ReactComponent as SendMessageSvg } from "@assets/sendMessage.svg";
import { ReactComponent as SelectFileSvg } from "@assets/selectFile.svg";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Form } from "reactstrap";
import { useCallback, useState } from "react";
import { throttle } from "@/utils/utils";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { ChatFooterContext } from "..";
import { ChatBoxContext } from "../..";
interface IMessageInputsProps {
    message: string;
}

type IMessageInputProps = {};

const MessageInput = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<IMessageInputsProps>({
        defaultValues: {
            message: "",
        },
    });
    const { handleMessages } = useContext(ChatFooterContext);
    const { socket } = useContext(ChatBoxContext);

    const roomId: string = useSelector<RootState, string>((state) => {
        return state.message.value.currentRoom;
    });

    const userId: string = useSelector((state: any) => {
        return state.user.value.userInfo._id;
    });

    const handleSend = (data: string) => {
        console.log(socket.readyState);
        if (socket.readyState === WebSocket.OPEN) {
            console.log("发送message");
            socket.send(
                JSON.stringify({
                    type: "message",
                    source: "client",
                    content: data,
                    userId,
                    roomId,
                    createAt: Date.now(),
                })
            );
        }
    };

    const onSubmit = (data: any) => {
        if (data.message !== "") {
            handleSend(data.message);
            reset({ message: "" });
        }
    };

    return (
        <>
            <Form
                className="input-group rounded-pill p-2 message-input"
                onSubmit={handleSubmit(onSubmit)}
            >
                <span className="btn btn-icon ">
                    <SelectFileSvg />
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
