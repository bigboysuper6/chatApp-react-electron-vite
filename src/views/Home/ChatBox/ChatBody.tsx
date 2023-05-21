import Message from "./components/Message";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import moment from "moment";

const ChatBody = () => {
    const messages = useSelector<RootState, any[]>((state) => {
        return state.message.value.messages;
    });
    return (
        <>
            <div className="chat-body hidden-overflow">
                {messages.map((item: any) => {
                    let type: "img" | "file" | "message";
                    const content = item.content;
                    if (/\.(jpg|png)$/.test(content) && item.file) {
                        type = "img";
                    } else if (item.file) {
                        type = "file";
                    } else {
                        type = "message";
                    }
                    const createdAt = moment(item.createdAt).format(
                        "YYYY-MM-DD hh:mm A"
                    );
                    console.log(item.createAt);
                    return (
                        <Message
                            message={item.content}
                            type={type}
                            fileSize={item.fileSize}
                            createdAt={createdAt}
                            senderId={item.userId}
                        />
                    );
                })}
            </div>
        </>
    );
};
export default ChatBody;
