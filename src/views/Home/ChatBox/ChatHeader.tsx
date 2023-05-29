import ChatInfoRow from "@/components/ChatInfoRow";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import Modal from "@/components/Modal";
import { EnvelopeBody, EnvelopeTitle } from "@/components/Envelope";
import useOpen from "@/utils/hook/useOpen";
import { useForm, Controller, Control } from "react-hook-form";
import { Footer } from "@/components/AddPeople";
import { getUser } from "@/api/user";
import { ChatBoxContext } from "..";
import { useContext } from "react";
const ChatHeader = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: { phoneNumber: "" },
    });
    const groupInfo = useSelector<RootState, any>((state) => {
        return state.message.value.groupInfo;
    });
    const userId = useSelector((state: any) => state.user.value.userInfo._id);

    const { socket } = useContext(ChatBoxContext);
    const [modal, toggle] = useOpen(false);
    const onSubmit = async (data: any) => {
        console.log(data);
        const { phoneNumber } = data;
        if (phoneNumber !== "") {
            let { user, exist } = await getUser({ phoneNumber }).then((res) => {
                return res.data;
            });
            if (exist) {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(
                        JSON.stringify({
                            type: "join_room",
                            roomId: groupInfo.details.roomId,
                            recevierId: user._id,
                            content: groupInfo.details.purpose,
                            groupName: groupInfo.details.name,
                            userId,
                        })
                    );
                }
            } else {
                alert("用户不存在 ");
            }
        }
    };
    return (
        <>
            <div className="chat-header pb-4 border-bottom">
                <ChatInfoRow
                    isChatHeader={true}
                    groupName={
                        groupInfo.details?.name ?? groupInfo.members?.[0].name
                    }
                    groupMembersNumber={groupInfo?.number}
                    isGroup={groupInfo?.isGroup}
                    handleAddMember={toggle}
                />
                <Modal
                    Title={<EnvelopeTitle isAddFirend={true} />}
                    Body={
                        <EnvelopeBody
                            control={control}
                            isAddFirend={true}
                            isAddMembers={true}
                        />
                    }
                    toggle={toggle}
                    modal={modal}
                    Footer={
                        <Footer
                            onClick={handleSubmit(onSubmit)}
                            text="邀请成员"
                        />
                    }
                />
            </div>
        </>
    );
};
export default ChatHeader;
