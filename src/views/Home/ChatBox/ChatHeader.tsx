import ChatInfoRow from "@/components/ChatInfoRow";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
const ChatHeader = () => {
    const groupInfo = useSelector<RootState, any>((state) => {
        return state.message.value.groupInfo;
    });

    return (
        <>
            <div className="chat-header pb-4 border-bottom">
                <ChatInfoRow
                    isChatHeader={true}
                    groupName={
                        groupInfo.details?.name ?? groupInfo.members?.[0].name
                    }
                    groupMembersNumber={groupInfo?.number}
                    isGroup={groupInfo?.number > 2}
                />
            </div>
        </>
    );
};
export default ChatHeader;
