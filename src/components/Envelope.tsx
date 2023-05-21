import { ReactComponent as ProfileSvg } from "@assets/profile.svg";
import { ReactComponent as ImgSvg } from "@assets/img.svg";
import { ReactComponent as AddSvg } from "@assets/add.svg";
import { ReactComponent as AddFriendSvg } from "@assets/addFriend.svg";
import { Row, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { useForm, Controller, Control } from "react-hook-form";
import { TabListContext } from "@/views/Home/CreateGroupChat";
import Avatar from "./Avatar";
import { useContext } from "react";
import { useSelector } from "react-redux";
type EnvelopeProps = {
    isAddFirend?: boolean;
    isHomePage?: boolean;
    title?: string;
};

export const EnvelopeTitle = ({
    isAddFirend,
    isHomePage,
    title,
}: EnvelopeProps) => {
    const user = useSelector((state: any) => {
        return state.user.value.userInfo;
    });
    return (
        <>
            <div className="envelope-title">
                <ProfileSvg />
                <div className="d-flex justify-content-center">
                    <div className="position-relative envelop-svg rounded-circle d-inline-block">
                        {isHomePage ? (
                            <Avatar avatar={user.avatar} />
                        ) : (
                            <div className="text-center envelop-img-svg">
                                {isAddFirend ? <AddFriendSvg /> : <ImgSvg />}
                            </div>
                        )}
                        {!isAddFirend && !isHomePage && (
                            <div className="position-absolute bottom-0  d-inline-block rounded-circle  envelop-add-svg ">
                                <AddSvg />
                            </div>
                        )}
                    </div>
                </div>
                {isHomePage && (
                    <h4 className="text-center mt-2 position-relative envelop-user-name">
                        {title}
                    </h4>
                )}
            </div>
        </>
    );
};
type EnvelopeBodyProps = {
    isAddFirend?: boolean;
    control: Control<
        {
            phoneNumber: string;
            verify: string;
            groupName: string;
            purpose: string;
        },
        any
    >;
};
export const EnvelopeBody = ({ isAddFirend, control }: EnvelopeBodyProps) => {
    return (
        <>
            <div className="envelop-body">
                <Form className="create-group-form">
                    <Row>
                        <Col className="col-12">
                            <FormGroup>
                                <Label for="exampleEmail">
                                    {isAddFirend
                                        ? "请输入账号(手机号)"
                                        : "请输入群聊的名称"}
                                </Label>
                                <Controller
                                    render={({ field }) => (
                                        <Input
                                            id={
                                                isAddFirend
                                                    ? "phoneNumber"
                                                    : "groupName"
                                            }
                                            className="border-0"
                                            {...field}
                                        />
                                    )}
                                    control={control}
                                    name={
                                        isAddFirend
                                            ? "phoneNumber"
                                            : "groupName"
                                    }
                                />
                            </FormGroup>
                        </Col>
                        <Col className="col-12">
                            <FormGroup>
                                <Label for="exampleText">
                                    {isAddFirend
                                        ? "请输入验证信息"
                                        : "创建群聊的目的?"}
                                </Label>
                                <Controller
                                    render={({ field }) => (
                                        <Input
                                            id={
                                                isAddFirend
                                                    ? "verify"
                                                    : "purpose"
                                            }
                                            type="textarea"
                                            className="border-0"
                                            {...field}
                                        />
                                    )}
                                    control={control}
                                    name={isAddFirend ? "verify" : "purpose"}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
};

const Envelope = () => {
    const { control } = useContext(TabListContext);

    return (
        <>
            <EnvelopeTitle />
            <EnvelopeBody control={control} />
        </>
    );
};

export default Envelope;
