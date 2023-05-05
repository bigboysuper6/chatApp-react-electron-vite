import ChatInfoTitle from "./components/ChatInfoTitle";
import Tab from "../../../components/Tab";
import People from "@/components/People";
import Media from "@/components/Media";
import useActive from "@utils/hook/useActive";

const TabComponents = [<People />, <Media />, <People isFiles={true} />];

const ChatInfoBody = () => {
    const [active, handleActive] = useActive(0);

    return (
        <>
            <div className="chat-info-body my-3 hidden-overflow  ">
                <ChatInfoTitle />
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
                                {item}
                                {item}
                                {item}
                                {item}
                                {item}
                                {item}
                                {item}
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
