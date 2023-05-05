import ChatInfoHeader from "./ChatInfoHeader";
import ChatInfoBody from "./ChatInfoBody";
type ChatInfoProps = {
    isDisplay?: Boolean;
};
const ChatInfo = ({ isDisplay }: ChatInfoProps) => {
    return (
        <>
            <div
                className={`chat-info d-flex flex-column position-relative pt-4 border-left ${
                    isDisplay === true ? "" : "d-none"
                }`}
            >
                <ChatInfoHeader />
                <ChatInfoBody />
            </div>
        </>
    );
};

export default ChatInfo;
