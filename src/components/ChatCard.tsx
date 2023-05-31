import { Card, CardBody, Row, Col, CardFooter } from "reactstrap";
import ChatInfoRow from "@/components/ChatInfoRow";
import { ReactComponent as ThreeDots } from "@assets/threeDots.svg";
import Avatar from "@/components/Avatar";
import { useCallback, useState, useContext, useEffect } from "react";
import { sendVerifyResult } from "@/api/message";
import { addChatRooms } from "@/app/Slices/message";
import { addFriend } from "@/api/friend";
import { useSelector, useDispatch } from "react-redux";
import { AsideContext } from "@/views/Home";
import { addGroup } from "@/api/group";
import { getRoom } from "@/api/message";
import { setVerifyResult } from "@/app/Slices/message";
type ChatCardProps = {
    isGroup?: boolean;
    isNotification?: Boolean;
    text: string;
    name: string;
    time: string;
    theResult?: boolean | "sender" | "recevierAgree" | "recevierRefuse";
    roomId: string;
    onClick?: () => void;
    recevierId?: string;
    friendId?: string;
    groupName?: string;
    avatar?: string;
    membersAvatars?: string[];
    membersNumber?: string;
    item?: any;
    index?: number;
};

const ChatCard = ({
    isGroup,
    isNotification,
    text,
    name,
    time,
    theResult,
    roomId,
    recevierId,
    onClick,
    friendId,
    groupName,
    avatar,
    membersAvatars,
    membersNumber,
    item,
    index,
}: ChatCardProps) => {
    const [result, setResult] = useState<any>(null);
    useEffect(() => {
        setResult(theResult);
    }, [theResult]);
    const dispatch = useDispatch();
    const userId = useSelector((state: any) => {
        return state.user.value.userInfo._id;
    });
    const { socket } = useContext(AsideContext);

    //need check
    const onClickAgree = async () => {
        setResult(true);
        dispatch(setVerifyResult({ roomId }));
        console.log(item, "item", index);
        const verify = await sendVerifyResult({
            result: true,
            roomId,
            recevierId,
            group: isGroup ?? false,
            updatedAt: Date.now(),
        }).then((res) => res.data.verify);
        if (!verify.group) {
            await addFriend({ friendId, roomId });
        } else {
            await addGroup({
                roomId,
                createAt: Date.now(),
                name: groupName,
                purpose: verify.content,
            });
        }
        const rooms = await getRoom({ roomId: verify.roomId }).then((res) => {
            const verify = res.data.roomsAgree;
            console.log(verify, userId, "verify");
            return verify;
        });
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ verify, type: "verify", rooms }));
        }
        dispatch(addChatRooms({ room: rooms }));
    };

    const onClickRefuse = async () => {
        setResult(false);
        const verify = await sendVerifyResult({
            result: false,
            roomId,
            recevierId,
            group: isGroup ?? false,
            updatedAt: Date.now(),
        }).then((res) => res.data.verify);

        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ verify, type: "verify" }));
        }
    };

    return (
        <>
            <Card className="chat-card mb-3" onClick={onClick}>
                <CardBody className="px-4">
                    <Row className="gx-5">
                        <Col className="avatar-container col-auto pe-1 ">
                            <Avatar avatar={avatar as string} />
                        </Col>
                        <Col className="w-75">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5 className="mb-0">{name}</h5>
                                <div className="extra-small">{time}</div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="message-text me-2">{text}</div>
                                {isNotification === true ? (
                                    <Col className="col-auto">
                                        <ThreeDots className="text-color" />
                                    </Col>
                                ) : (
                                    <div className=" rounded-circle message-count  fw-bold">
                                        {""}
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </CardBody>
                {isGroup === true && !isNotification && (
                    <CardFooter className="px-4">
                        <ChatInfoRow
                            groupName={groupName}
                            membersAvatars={membersAvatars}
                            groupMembersNumber={membersNumber}
                            isGroup={true}
                        />
                    </CardFooter>
                )}
                {isNotification === true && (
                    <CardFooter className="px-4">
                        <Row>
                            {result === null && (
                                <>
                                    <Col>
                                        <a
                                            onClick={onClickRefuse}
                                            className="btn btn-sm w-100 chat-footer-hide border-radius border-0 py-2"
                                        >
                                            拒绝
                                        </a>
                                    </Col>
                                    <Col>
                                        <a
                                            onClick={onClickAgree}
                                            className="btn btn-sm btn-primary w-100 border-radius border-0 py-2"
                                        >
                                            同意
                                        </a>
                                    </Col>
                                </>
                            )}
                            {result === true && (
                                <>
                                    <Col className="text-center text-success w-100 border-radius border-0 py-2">
                                        已同意
                                    </Col>
                                </>
                            )}
                            {result === false && (
                                <>
                                    <Col className="text-center text-danger w-100 border-radius border-0 py-2">
                                        已拒绝
                                    </Col>
                                </>
                            )}
                            {result === "sender" && (
                                <>
                                    <Col className="text-center text-primary w-100 border-radius border-0 py-2">
                                        已发送
                                    </Col>
                                </>
                            )}
                            {result === "recevierAgree" && (
                                <>
                                    <Col className="text-center text-success w-100 border-radius border-0 py-2">
                                        已同意您的邀请
                                    </Col>
                                </>
                            )}
                            {result === "recevierRefuse" && (
                                <>
                                    <Col className="text-center text-danger w-100 border-radius border-0 py-2">
                                        已拒绝您的邀请
                                    </Col>
                                </>
                            )}
                        </Row>
                    </CardFooter>
                )}
            </Card>
        </>
    );
};

export default ChatCard;
