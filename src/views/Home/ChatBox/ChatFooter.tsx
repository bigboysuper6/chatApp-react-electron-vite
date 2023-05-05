import MessageInput from "./components/MessageInput";
const ChatFooter = () => {
    return (
        <>
            <div className="chat-footer position-absolute start-0 bottom-0 pb-4">
                <MessageInput />
            </div>
        </>
    );
};
export default ChatFooter;
