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
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    area as changeArea,
    phoneNumber as changePhoneNumber,
    email as changeEmail,
} from "@/api/user";
import { setEmail, setPhoneNumber, setArea } from "@/app/Slices/user";
const SvgList = [
    <ChatsSvg />,
    <FriendsSvg />,
    <CreateChatSvg />,
    <NotificationsSvg />,
    // <SupportsSvg />,
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
    const dispatch = useDispatch();
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            email: "",
            phoneNumber: "",
            area: "",
        },
    });

    const onSubmit: SubmitHandler<any> = async (data) => {
        console.log(data);
        const { area, phoneNumber, email } = data;
        if (area && area.length > 0) {
            await changeArea({ area });
            dispatch(setArea({ area }));
            reset({ area: "" });
        }
        if (phoneNumber && phoneNumber.length > 0) {
            await changePhoneNumber({ phoneNumber });
            dispatch(setPhoneNumber({ phoneNumber }));
            reset({ phoneNumber: "" });
        }
        if (email && email.length > 0) {
            await changeEmail({ email });
            dispatch(setEmail({ email }));
            reset({ email: "" });
        }
    };

    return (
        <>
            <SupportCard
                isHomePage={true}
                isSetting={true}
                data={{ title: "国家/地区", value: data.area, type: "area" }}
                handleSubmit={handleSubmit(onSubmit)}
                control={control}
            />
            <SupportCard
                isHomePage={true}
                isSetting={true}
                data={{
                    title: "电话号码",
                    value: data.phoneNumber,
                    type: "phoneNumber",
                }}
                control={control}
                handleSubmit={handleSubmit(onSubmit)}
            />
            <SupportCard
                isHomePage={true}
                isSetting={true}
                isLastCard={true}
                data={{
                    title: "电子邮箱",
                    value: data["e-mail"],
                    type: "email",
                }}
                control={control}
                handleSubmit={handleSubmit(onSubmit)}
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
    const user = useSelector((state: any) => {
        return state.user.value.userInfo;
    });
    return (
        <>
            <Nav
                vertical
                className="text-center w-100 nav justify-content-evenly nav-bar "
            >
                <Avatar onClick={toggle} avatar={user.avatar} />
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
