import Search from "../../../components/Search";
import PeopleGroup from "@/components/PeopleGroup";
import Button from "@/components/Button";
import { ReactComponent as AddFriendSvg } from "@assets/addFriend.svg";
import Modal from "@/components/Modal";
import { EnvelopeTitle, EnvelopeBody } from "@/components/Envelope";
import { useEffect, useState } from "react";
import { ReactComponent as ArrowRightSvg } from "@assets/arrowRight.svg";
import useOpen from "@/utils/hook/useOpen";
import { friend } from "@/api/friend";
import { useForm, Controller, Control } from "react-hook-form";
import { Form } from "reactstrap";
import { getUser } from "@/api/user";
import { useSelector } from "react-redux";

type FooterProps = {
    onClick: () => void;
};

const Footer = ({ onClick }: FooterProps) => {
    return (
        <>
            <Button
                text={"添加好友"}
                Svg={ArrowRightSvg}
                type={"submit"}
                onClick={onClick}
            />
        </>
    );
};

type IFriendListProps = {
    socket: WebSocket;
    rooms?: any[];
};

const FriendList = ({ socket, rooms }: IFriendListProps) => {
    const [modal, toggle] = useOpen(false);
    const [friends, setFriends] = useState([]);
    const userId = useSelector((state: any) => state.user.value.userInfo._id);

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: { phoneNumber: "", verify: "" },
    });

    useEffect(() => {
        getFriends();
    }, []);

    const onSubmit = async (data: EnvelopeData) => {
        const { phoneNumber, verify } = data;
        if (phoneNumber !== "" && verify !== "") {
            let { user, exist } = await getUser({ phoneNumber }).then((res) => {
                return res.data;
            });
            if (exist) {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(
                        JSON.stringify({
                            type: "join",
                            info: {
                                recevierId: [user._id],
                            },
                            userId,
                            content: verify,
                        })
                    );
                }
            } else {
                alert("用户不存在 ");
            }
        }
    };

    const getFriends = async () => {
        const friends = await friend().then((res) => {
            return res.data.friends;
        });
        setFriends(friends);
    };

    return (
        <>
            <div className="chat-list hidden-overflow px-4 bg-light ">
                <h2 className="fw-bold">朋友</h2>
                <Search />
                <Button text={"添加好友"} Svg={AddFriendSvg} onClick={toggle} />
                <Form>
                    <Modal
                        Title={<EnvelopeTitle isAddFirend={true} />}
                        Body={
                            <EnvelopeBody
                                control={control}
                                isAddFirend={true}
                            />
                        }
                        toggle={toggle}
                        modal={modal}
                        Footer={<Footer onClick={handleSubmit(onSubmit)} />}
                    />
                </Form>
                <PeopleGroup />
                <PeopleGroup />
                <PeopleGroup />
                <PeopleGroup />
                <PeopleGroup />
                <PeopleGroup />
                <PeopleGroup />
            </div>
        </>
    );
};
export default FriendList;
