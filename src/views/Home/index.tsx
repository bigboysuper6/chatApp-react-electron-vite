import NavBar from "./NavBar";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import ChatInfo from "./ChatInfo";
import FriendList from "./FriendList";
import SupportList from "./SupportList";
import NotificationList from "./NotificationList";
import SettingList from "./SettingList";
import CreateGroupChat from "./CreateGroupChat";
import useActive from "@utils/hook/useActive";
import { useState, createContext, useEffect } from "react";
import useSocket from "@/utils/hook/useSocket";
import { friend } from "@/api/friend";
import { setFriends } from "@/app/Slices/user";
import { useDispatch } from "react-redux";
import useOpen from "@/utils/hook/useOpen";
import PeopleInfo from "@/components/PeopleInfo";
import ImagePreview from "@/components/ImagePreview";
export const ChatBoxContext = createContext<any>({});
export const ChatInfoContext = createContext<any>({});
export const AsideContext = createContext<any>({});
export const HomeContext = createContext<any>({});

const Home = () => {
    //control chatinfo display or not
    const [isDisplay, setIsDisplay] = useState(false);
    const [visible, setVisible] = useState(false);
    const [active, handleActive] = useActive(0);
    const [socket, visibleBox] = useSocket(import.meta.env.VITE_APP_SOCKET_URL);
    console.log(socket, "socket");
    const dispatch = useDispatch();
    const [peopleInfoModal, peopleInfoToggle] = useOpen(false);
    const [imagePreviewModal, imagePreviewToggle] = useOpen(false);
    const [peopleData, setPeopleData] = useState({});
    const [img, setImg] = useState("");
    console.log(visible, "visible");
    const AsideComponents = [
        <ChatList />,
        <FriendList socket={socket} />,
        <CreateGroupChat socket={socket} />,
        <NotificationList />,
        // <SupportList />,
        <SettingList />,
    ];

    useEffect(() => {
        if (visibleBox == false) setVisible(false);
    }, [visibleBox]);

    useEffect(() => {
        getFriends();
    });

    const getFriends = async () => {
        const friends = await friend({ group: true }).then((res) => {
            return res.data.friends;
        });
        dispatch(setFriends(friends));
    };

    //setIsDisplay
    const handleSetIsDisplay = () => {
        setIsDisplay((value) => {
            return !value;
        });
    };

    return (
        <>
            <HomeContext.Provider
                value={{
                    peopleInfoToggle,
                    setPeopleData,
                    setImg,
                    imagePreviewToggle,
                }}
            >
                <div
                    className={`home d-grid container-fluid p-0 ${
                        isDisplay
                            ? "home-grid-template-columns-4"
                            : "home-grid-template-columns-3"
                    }`}
                >
                    <NavBar active={active} handleActive={handleActive} />
                    <AsideContext.Provider
                        value={{
                            setVisible,
                            socket,
                            peopleInfoToggle,
                            setPeopleData,
                        }}
                    >
                        {AsideComponents.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`${
                                        active === index ? "" : "d-none"
                                    } position-relative`}
                                >
                                    {item}
                                </div>
                            );
                        })}
                    </AsideContext.Provider>
                    <ChatBoxContext.Provider
                        value={{ handleSetIsDisplay, socket }}
                    >
                        <div
                            className={` ${visible ? "visible" : "invisible"}`}
                        >
                            <ChatBox />
                        </div>
                    </ChatBoxContext.Provider>
                    <ChatInfoContext.Provider
                        value={{
                            setIsDisplay,
                            peopleInfoToggle,
                            setPeopleData,
                            setVisible,
                            socket,
                        }}
                    >
                        <ChatInfo isDisplay={isDisplay && visible} />
                    </ChatInfoContext.Provider>
                </div>
                <PeopleInfo
                    data={peopleData}
                    toggle={peopleInfoToggle}
                    modal={peopleInfoModal}
                />
                <ImagePreview
                    img={img}
                    toggle={imagePreviewToggle}
                    modal={imagePreviewModal}
                ></ImagePreview>
            </HomeContext.Provider>
        </>
    );
};
export default Home;
