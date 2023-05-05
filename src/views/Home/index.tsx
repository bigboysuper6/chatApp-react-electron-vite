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
export const ChatBoxContext = createContext<any>({});
export const ChatInfoContext = createContext<any>({});
export const AsideContext = createContext<any>({});
const Home = () => {
    //control chatinfo display or not
    const [isDisplay, setIsDisplay] = useState(true);
    const [visible, setVisible] = useState(false);
    const [active, handleActive] = useActive(0);
    const [socket] = useSocket(import.meta.env.VITE_APP_SOCKET_URL);

    const [AsideComponents] = useState([
        <ChatList />,
        <FriendList socket={socket} />,
        <CreateGroupChat />,
        <NotificationList />,
        <SupportList />,
        <SettingList />,
    ]);

    // useEffect(() => {
    //     if (!visible) setIsDisplay(false);
    // }, [visible]);

    //setIsDisplay
    const handleSetIsDisplay = () => {
        setIsDisplay((value) => {
            return !value;
        });
    };

    return (
        <>
            <div
                className={`home d-grid container-fluid p-0 ${
                    isDisplay
                        ? "home-grid-template-columns-4"
                        : "home-grid-template-columns-3"
                }`}
            >
                <NavBar active={active} handleActive={handleActive} />
                <AsideContext.Provider value={{ setVisible, socket }}>
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
                <ChatBoxContext.Provider value={{ handleSetIsDisplay, socket }}>
                    <div className={` ${visible ? "visible" : "invisible"}`}>
                        <ChatBox />
                    </div>
                </ChatBoxContext.Provider>
                <ChatInfoContext.Provider value={{ setIsDisplay }}>
                    <ChatInfo isDisplay={isDisplay} />
                </ChatInfoContext.Provider>
            </div>
        </>
    );
};
export default Home;
