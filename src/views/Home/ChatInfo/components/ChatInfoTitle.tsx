type IChatInfoTitleProps = {
    groupName: string;
    groupPurpose: string;
};

const ChatInfoTitle = ({ groupName, groupPurpose }: IChatInfoTitleProps) => {
    return (
        <>
            <div className="chat-info-title text-center ">
                <div>
                    <h5 className="d-inline-block">{groupName}</h5>
                </div>
                <div>
                    <div className="d-inline-block text-color">
                        {groupPurpose}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatInfoTitle;
