import Search from "../../../components/Search";
import Tab from "@/components/Tab";
import PeopleGroup from "@/components/PeopleGroup";
import Details from "./Details";
import useActive from "@utils/hook/useActive";
import Button from "@/components/Button";
import { ReactComponent as ArrowRightSvg } from "@assets/arrowRight.svg";

const TabComponents = [<Details />, <PeopleGroup />];

const CreateGroupChat = () => {
    const [active, handleActive] = useActive(0);
    return (
        <>
            <div className="create-group-chat hidden-overflow px-4 bg-light  ">
                <h2 className="fw-bold">创建群聊</h2>
                <Search />
                <Tab
                    textList={["细节", "邀请"]}
                    active={active}
                    handleActive={handleActive}
                />
                <div>
                    {TabComponents.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`${
                                    active === index ? "" : "d-none"
                                } pb-5`}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
                <div className="position-absolute bottom-0 start-0 pb-4 w-100 px-3">
                    <Button Svg={ArrowRightSvg} text="开始群聊" />
                </div>
            </div>
        </>
    );
};
export default CreateGroupChat;
