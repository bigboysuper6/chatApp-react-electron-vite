import { ReactComponent as ThreeDots } from "@assets/threeDots.svg";
import AvatarGroup from "./AvatarGroup";
import { ChatBoxContext } from "@/views/Home";
import { Col, Row } from "reactstrap";
import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
type ChatInfoRowProps = {
    isChatHeader?: boolean;
    groupName?: string;
    groupMembersNumber?: string;
    membersAvatars?: string[];
    isGroup?: boolean;
    handleAddMember?: () => void;
};
const ChatInfoRow = ({
    isChatHeader,
    groupName,
    groupMembersNumber,
    membersAvatars,
    isGroup,
    handleAddMember,
}: ChatInfoRowProps) => {
    const { handleSetIsDisplay } = useContext(ChatBoxContext);

    const groupInfo = useSelector((state: any) => {
        return state.message.value.groupInfo;
    });

    const avatars = useMemo(() => {
        const avatars = [];
        avatars.push(groupInfo?.owner?.avatar);
        groupInfo?.members?.slice(0, 2).forEach((item: any) => {
            avatars.push(item?.avatar);
        });
        return avatars;
    }, [groupInfo]);

    return (
        <>
            <Row className="d-flex align-items-center">
                <Col className="group-name ">
                    {isChatHeader === true ? (
                        <>
                            <h5 className="h5">{groupName}</h5>
                            <div className="text-color">
                                {groupMembersNumber} 成员
                            </div>
                        </>
                    ) : (
                        <>{groupName}</>
                    )}
                </Col>
                {isChatHeader && (
                    <Col className="col-auto">
                        <ThreeDots
                            className="text-color"
                            onClick={handleSetIsDisplay}
                        />
                    </Col>
                )}
                <AvatarGroup
                    avatars={membersAvatars ?? avatars}
                    number={groupMembersNumber}
                    isChatHeader={isChatHeader}
                    isGroup={isGroup}
                    onClick={handleAddMember}
                />
            </Row>
        </>
    );
};
export default ChatInfoRow;
