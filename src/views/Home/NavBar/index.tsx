import { Nav, NavItem } from "reactstrap";
import { useEffect, useState } from "react";

import Avatar from "../../../components/Avatar";
import { ReactComponent as CreateChatSvg } from "@assets/createChat.svg";
import { ReactComponent as SupportsSvg } from "@assets/supports.svg";
import { ReactComponent as NotificationsSvg } from "@assets/notifications.svg";
import { ReactComponent as FriendsSvg } from "@assets/friends.svg";
import { ReactComponent as SettingsSvg } from "@assets/settings.svg";
import { ReactComponent as ChatsSvg } from "@assets/chats.svg";
import Modal from "@/components/Modal";
import useOpen from "@/utils/hook/useOpen";
import { EnvelopeTitle } from "@/components/Envelope";
import SupportCard from "../SupportList/components/SupportCard";
import { details } from "@/api/user";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/app/Slices/user";
const SvgList = [
    <ChatsSvg />,
    <FriendsSvg />,
    <CreateChatSvg />,
    <NotificationsSvg />,
    <SupportsSvg />,
    <SettingsSvg />,
];

type BodyProps = {
    data: {
        area?: string;
        phoneNumber?: string;
        "e-mail"?: string;
    };
};

const Body = ({ data }: BodyProps) => {
    return (
        <>
            <SupportCard
                isHomePage={true}
                isSetting={true}
                data={{ title: "国家/地区", value: data.area }}
            />
            <SupportCard
                isHomePage={true}
                isSetting={true}
                data={{ title: "电话号码", value: data.phoneNumber }}
            />
            <SupportCard
                isHomePage={true}
                isSetting={true}
                isLastCard={true}
                data={{ title: "电子邮箱", value: data["e-mail"] }}
            />
        </>
    );
};

const Footer = () => {
    const handleClick = () => {
        sessionStorage.removeItem("Authorization");
        window.location.href = "/";
    };
    return (
        <>
            <h4 onClick={handleClick} className="text-start text-danger w-100">
                Logout
            </h4>
        </>
    );
};

type NavBarProps = {
    active: number;
    handleActive: (activeIndex: number) => void;
};

interface user {
    name?: string;
    area?: string;
    phoneNumber?: string;
    "e-mail"?: string;
}

const NavBar = ({ active, handleActive }: NavBarProps) => {
    const [modal, toggle] = useOpen(false);
    const [user, setUser] = useState<user>({});
    const dispatch = useDispatch();

    useEffect(() => {
        getDetails();
    }, []);

    const getDetails = async () => {
        const user = await details().then((res) => {
            return res.data.user;
        });
        setUser(user);
        dispatch(setUserInfo({ userInfo: user }));
    };

    return (
        <>
            <Nav
                vertical
                className="text-center w-100 nav justify-content-evenly nav-bar "
            >
                <Avatar onClick={toggle} />
                <Modal
                    Title={
                        <EnvelopeTitle isHomePage={true} title={user.name} />
                    }
                    Body={<Body data={user} />}
                    Footer={<Footer />}
                    modal={modal}
                    toggle={toggle}
                />
                <div>
                    {SvgList.map((item, index) => {
                        return (
                            <NavItem
                                key={index}
                                className={active === index ? "active" : ""}
                                onClick={() => handleActive(index)}
                            >
                                {item}
                            </NavItem>
                        );
                    })}
                </div>
            </Nav>
        </>
    );
};

export default NavBar;
