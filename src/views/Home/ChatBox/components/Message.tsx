import Avatar from "@/components/Avatar";
import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { ReactComponent as DownloadFileSvg } from "@assets/downloadFile.svg";
import { downloadFile } from "@/api/message";
import { useSelector, useDispatch } from "react-redux";

type MessageProps = {
    message: string;
    type: "message" | "img" | "file";
    fileSize: string;
    createdAt: string;
    senderId: string;
};

const Message = ({
    message,
    type,
    fileSize,
    createdAt,
    senderId,
}: MessageProps) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const userId = useSelector((state: any) => {
        return state.user.value.userInfo._id;
    });
    const groupInfo = useSelector((state: any) => {
        return state.message.value.groupInfo;
    });

    const isUser = senderId === userId;

    const avatar = (() => {
        if (groupInfo?.owner && groupInfo?.members) {
            return [groupInfo?.owner, ...groupInfo?.members].find(
                (item: any) => {
                    return item?._id === senderId;
                }
            )?.avatar;
        } else {
            return undefined;
        }
    })();

    console.log(avatar, "avatar");
    useEffect(() => {
        const image = new Image();
        image.src = message;
        image.onload = () => {
            const { width, height } = image;
            setDimensions({ width, height });
        };
    }, [message]);

    const handleDownload = async () => {
        await downloadFile({
            filename: message,
        })
            .then((response) => {
                const url = URL.createObjectURL(response.data);
                const a = document.createElement("a");
                a.href = url;
                a.download = message.slice(message.lastIndexOf("_") + 1); // 指定下载时的文件名
                a.click();
                URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error("Download error:", error);
            });
    };

    const MessageContent = () => {
        if (type === "img") {
            console.log("yes");
            return (
                <img
                    src={message}
                    style={{
                        width:
                            dimensions.width > dimensions.height
                                ? "300px"
                                : "auto",
                        height:
                            dimensions.width < dimensions.height
                                ? "300px"
                                : "auto",
                    }}
                    className="border-radius"
                />
            );
        } else if (type === "file") {
            return (
                <div
                    className={`message-text  py-3 ${
                        isUser == true ? "message-background-color" : ""
                    }`}
                >
                    <Row>
                        <Col className="col-auto d-flex p-0 flex-nowrap">
                            <button
                                className="btn btn-icon rounded-circle text-primary btn-light"
                                onClick={handleDownload}
                            >
                                <DownloadFileSvg />
                            </button>
                        </Col>
                        <Col className="">
                            <div>{message.split("_").slice(2).join("_")}</div>
                            <div>{fileSize}</div>
                        </Col>
                    </Row>
                </div>
            );
        } else {
            return (
                <div
                    className={`message-text d-inline-block py-3 ${
                        isUser == true ? "message-background-color" : ""
                    }`}
                >
                    {message}
                </div>
            );
        }
    };
    return (
        <>
            <div
                className={`d-flex ${
                    isUser == true ? "flex-row-reverse" : ""
                }  message mt-3 align-items-end`}
            >
                <div>
                    <Avatar avatar={avatar} />
                </div>
                <div
                    className={`d-flex flex-column message-body ${
                        isUser == true ? "me-3" : "ms-3"
                    } `}
                >
                    <MessageContent />
                    <div className="message-time-text">{createdAt}</div>
                </div>
            </div>
        </>
    );
};
export default Message;
