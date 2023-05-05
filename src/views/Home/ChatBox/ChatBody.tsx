import Message from "./components/Message";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";

type ChatBodyProps = {
    userId: string;
};

const ChatBody = ({ userId }: ChatBodyProps) => {
    const messages = useSelector<RootState, any[]>((state) => {
        return state.message.value.messages;
    });
    console.log(messages);
    return (
        <>
            <div className="chat-body hidden-overflow">
                {messages.map((item: any) => {
                    return (
                        <Message
                            isUser={userId === item.userId}
                            message={item.content}
                        />
                    );
                })}
            </div>
        </>
    );
};
export default ChatBody;
