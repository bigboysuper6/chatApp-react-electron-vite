import Avatar from "@/components/Avatar";

type MessageProps = {
    isUser?: Boolean;
    message: string;
};

const Message = ({ isUser, message }: MessageProps) => {
    return (
        <>
            <div
                className={`d-flex ${
                    isUser == true ? "flex-row-reverse" : ""
                }  message mt-3 align-items-end`}
            >
                <div>
                    <Avatar />
                </div>
                <div
                    className={`d-flex flex-column message-body ${
                        isUser == true ? "me-3" : "ms-3"
                    } `}
                >
                    <div
                        className={`message-text  py-3 ${
                            isUser == true ? "message-background-color" : ""
                        }`}
                    >
                        {message}
                    </div>
                    <div className="message-time-text">08:45 PM</div>
                </div>
            </div>
        </>
    );
};
export default Message;
