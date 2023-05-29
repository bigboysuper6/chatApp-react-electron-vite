import {
    Card,
    CardBody,
    Row,
    Col,
    CardFooter,
    Input,
    Form,
    FormGroup,
    Button,
} from "reactstrap";
import { ReactComponent as ArrowRightSvg } from "@assets/arrowRight.svg";
import { ReactElement, useState } from "react";
import { Controller } from "react-hook-form";

type SupportCardProps = {
    isSetting?: Boolean;
    isHomePage?: boolean;
    isLastCard?: boolean;
    data: {
        title?: string;
        value?: string;
        type?: string;
    };
    control?: any;
    handleSubmit?: any;
    type?: "peopleInfo";
    Svg?: ReactElement;
};

const SupportCard = ({
    isSetting,
    isHomePage,
    isLastCard,
    data,
    control,
    handleSubmit,
    type,
    Svg,
}: SupportCardProps) => {
    const [rotation, setRotation] = useState(0);

    const handleClick = () => {
        setRotation((value) => {
            return value === 90 ? 0 : 90;
        });
    };

    return (
        <>
            <Card
                className={`border-0 support-card border-radius ${
                    isHomePage ? "" : "my-3"
                } `}
            >
                <CardBody className="p-0">
                    <div
                        className={`support-card-body ${
                            !isSetting && "border-radius"
                        } ${!isLastCard ? "border-bottom" : ""}  
                        `}
                    >
                        <Row className="align-items-center">
                            <Col className="d-flex flex-column">
                                <h4 className="my-0">{data.title}</h4>
                                {isSetting && (
                                    <p
                                        className={`my-0 text-color ${
                                            isLastCard || isHomePage
                                                ? ""
                                                : "mb-3"
                                        }`}
                                    >
                                        {data.value}
                                    </p>
                                )}
                            </Col>
                            <Col className="col-auto">
                                {!isSetting && (
                                    <a className="btn btn-icon rounded-circle support-card-a ">
                                        <ArrowRightSvg />
                                    </a>
                                )}
                                {isSetting &&
                                    (type == "peopleInfo" ? (
                                        Svg
                                    ) : (
                                        <a className="text-color">
                                            <ArrowRightSvg
                                                style={{
                                                    transform: `rotate(${rotation}deg)`,
                                                }}
                                                onClick={handleClick}
                                            />
                                        </a>
                                    ))}
                            </Col>
                        </Row>
                    </div>
                </CardBody>
                {isSetting && rotation === 90 && (
                    <CardFooter className="pt-3 support-card-footer border-0 border-bottom">
                        <Form
                            className="support-card-footer-form"
                            onSubmit={handleSubmit}
                        >
                            <FormGroup className="d-flex justify-content-center flex-wrap">
                                {data.type === "password" && (
                                    <Controller
                                        name="currentPassword"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                placeholder="currentPassword"
                                                className="mb-3"
                                                {...field}
                                            />
                                        )}
                                    />
                                )}
                                {data.type == "avatar" ? (
                                    <Controller
                                        name={data.type as string}
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                placeholder={data.type}
                                                className="mb-3"
                                                type="file"
                                                onChange={(event) =>
                                                    field.onChange(
                                                        event.target.files
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                ) : (
                                    <Controller
                                        name={data.type as string}
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                placeholder={data.type}
                                                className="mb-3"
                                                {...field}
                                            />
                                        )}
                                    />
                                )}
                                <Button
                                    type="submit"
                                    className="border-0 w-100"
                                >
                                    提交
                                </Button>
                            </FormGroup>
                        </Form>
                    </CardFooter>
                )}
            </Card>
        </>
    );
};
export default SupportCard;
