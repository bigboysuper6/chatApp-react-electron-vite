import ChatInfoRow from "@/components/ChatInfoRow";
const ChatHeader = () => {
    return (
        <>
            <div className="chat-header pb-4 border-bottom">
                <ChatInfoRow isChatHeader={true} />
            </div>
        </>
    );
};
export default ChatHeader;
