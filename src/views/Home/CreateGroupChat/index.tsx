import Search from "../../../components/Search";
import Tab from "@/components/Tab";
import PeopleGroup from "@/components/PeopleGroup";
import Details from "./Details";
import useActive from "@utils/hook/useActive";
import Button from "@/components/Button";
import { ReactComponent as ArrowRightSvg } from "@assets/arrowRight.svg";
import Invite from "./Invite";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Form } from "reactstrap";
import { createContext } from "react";
import { useSelector } from "react-redux";

export const TabListContext = createContext<any>({});

type CreateGroupChatProps = {
    socket: WebSocket;
};

const CreateGroupChat = ({ socket }: CreateGroupChatProps) => {
    const [active, handleActive] = useActive(0);
    const { handleSubmit, control, reset } = useForm();
    const TabList = [<Details />, <Invite />];
    const friends = useSelector((state: any) => state.user.value.friends);
    const userId = useSelector((state: any) => state.user.value.userInfo._id);

    const onSubmit = async (data: any) => {
        const { groupName, purpose } = data;
        const selectedIds = Object.keys(data)
            .map((item: any) => {
                if (item.includes("friend-selected-") && data[item] === true) {
                    const friendIndex = item.replace("friend-selected-", "");
                    const letter = friendIndex[0];
                    const groupIndex = friendIndex.slice(1);
                    return friends.find((item: any) => {
                        return item.letter === letter;
                    }).groupArr[groupIndex]._id;
                }
            })
            .filter((item: any) => item !== undefined);
        console.log(selectedIds);
        if (groupName !== "" && purpose !== "" && selectedIds.length > 0) {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(
                    JSON.stringify({
                        type: "join",
                        info: {
                            recevierId: selectedIds,
                        },
                        userId,
                        content: purpose,
                        groupName,
                    })
                );
            }
        }
    };

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
                <TabListContext.Provider value={{ control }}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            {TabList.map((item, index) => {
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
                            <Button
                                Svg={ArrowRightSvg}
                                text="开始群聊"
                                type="submit"
                            />
                        </div>
                    </Form>
                </TabListContext.Provider>
            </div>
        </>
    );
};
export default CreateGroupChat;
