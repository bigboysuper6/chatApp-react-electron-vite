import ChatInfoTitle from "./components/ChatInfoTitle";
import Tab from "../../../components/Tab";
import FileTab from "./components/FileTab";
import ImageTab from "./components/ImageTab";
import PeopleTab from "./components/PeopleTab";
import useActive from "@utils/hook/useActive";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const ChatInfoBody = () => {
    const TabComponents = [<PeopleTab />, <ImageTab />, <FileTab />];

    const groupInfo = useSelector<RootState, any>((state) => {
        return state.message.value.groupInfo;
    });

    const userId = useSelector<RootState, any>((state) => {
        return state.user.value.userInfo._id;
    });
    const [active, handleActive] = useActive(0);

    const groupName = (() => {
        if (groupInfo.members?.length > 1) {
            return groupInfo.details.name;
        } else {
            return userId === groupInfo.owner?._id
                ? groupInfo.members?.[0].name
                : groupInfo.owner?.name;
        }
    })();

    const groupPurpose = (() => {
        if (groupInfo.members?.length > 1) {
            return groupInfo.details?.purpose;
        } else {
            return `欢迎来到与${
                userId === groupInfo.owner?._id
                    ? groupInfo.members?.[0].name
                    : groupInfo.owner?.name
            }的聊天室`;
        }
    })();
    return (
        <>
            <div className="chat-info-body my-3 hidden-overflow  ">
                <ChatInfoTitle
                    groupName={groupName}
                    groupPurpose={groupPurpose}
                />
                <Tab
                    textList={["成员", "媒体", "文件"]}
                    active={active}
                    handleActive={handleActive}
                />
                <div>
                    {TabComponents.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={active === index ? "" : "d-none"}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
export default ChatInfoBody;
