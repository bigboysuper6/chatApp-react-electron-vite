import { ReactComponent as ProfileSvg } from "@assets/profile.svg";
import { ReactComponent as ImgSvg } from "@assets/img.svg";
import { ReactComponent as AddSvg } from "@assets/add.svg";
import { ReactComponent as AddFriendSvg } from "@assets/addFriend.svg";
import { Row, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { useForm, Controller, Control } from "react-hook-form";

import Avatar from "./Avatar";
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
    return (
        <>
            <div className="envelope-title">
                <ProfileSvg />
                <div className="d-flex justify-content-center">
                    <div className="position-relative envelop-svg rounded-circle d-inline-block">
                        {isHomePage ? (
                            <Avatar />
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
                                        : "Enter your group name"}
                                </Label>
                                <Controller
                                    render={({ field }) => (
                                        <Input
                                            id="phoneNumber"
                                            className="border-0"
                                            {...field}
                                        />
                                    )}
                                    control={control}
                                    name="phoneNumber"
                                />
                            </FormGroup>
                        </Col>
                        <Col className="col-12">
                            <FormGroup>
                                <Label for="exampleText">
                                    {isAddFirend
                                        ? "请输入验证信息"
                                        : "What's your purpose?"}
                                </Label>
                                <Controller
                                    render={({ field }) => (
                                        <Input
                                            id="verify"
                                            type="textarea"
                                            className="border-0"
                                            {...field}
                                        />
                                    )}
                                    control={control}
                                    name="verify"
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
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: { phoneNumber: "", verify: "" },
    });

    const onSubmit = (data: EnvelopeData) => {
        console.log(data);
    };

    return (
        <>
            <Form
                className="envelope mt-3 hidden-overflow"
                onSubmit={handleSubmit(onSubmit)}
            >
                <EnvelopeTitle />
                <EnvelopeBody control={control} />
            </Form>
        </>
    );
};

export default Envelope;
