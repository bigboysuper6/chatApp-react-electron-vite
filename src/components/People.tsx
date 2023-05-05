import { Col, Row, Input, FormGroup } from "reactstrap";
import { ReactComponent as ThreeDotsVerticalSvg } from "@assets/threeDotsVertical.svg";
import Avatar from "./Avatar";
import AvatarGroup from "./AvatarGroup";
import ToolTip from "./ToolTip";
type PeopleProps = {
    isOwner?: Boolean;
    isPeopleGroup?: Boolean;
    isSelectInput?: Boolean;
    isFiles?: Boolean;
};

const People = ({
    isOwner,
    isPeopleGroup,
    isSelectInput,
    isFiles,
}: PeopleProps) => {
    return (
        <>
            <div
                className={`people ${
                    isPeopleGroup === true
                        ? "people-group my-3 px-3"
                        : "border-bottom"
                }`}
            >
                <Row className={`align-items-center ${isFiles ? "ms-0" : ""} `}>
                    {isFiles ? (
                        <>
                            <AvatarGroup />
                            <Col className="px-0">
                                <h4 className="my-0">
                                    askhjdkjaslhbdjklhas-hdklasd
                                </h4>
                                <p className="text-color my-0">54.2kb mp4</p>
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col className="col-auto">
                                <Avatar />
                            </Col>
                            <Col>Jaron</Col>
                        </>
                    )}

                    {isOwner === true && (
                        <Col className="col-auto owner-text">owner</Col>
                    )}
                    <Col className="col-auto text-color">
                        {isSelectInput === true ? (
                            <FormGroup check>
                                <Input
                                    type="checkbox"
                                    className="people-group-select-input"
                                />
                            </FormGroup>
                        ) : (
                            // <ThreeDotsVerticalSvg />
                            <ToolTip />
                        )}
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default People;
