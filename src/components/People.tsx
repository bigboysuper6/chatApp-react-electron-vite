import { Col, Row, Input, FormGroup } from "reactstrap";
import { ReactComponent as ThreeDotsVerticalSvg } from "@assets/threeDotsVertical.svg";
import Avatar from "./Avatar";
import AvatarGroup from "./AvatarGroup";
import ToolTip from "./ToolTip";
import { useContext } from "react";
import { Controller } from "react-hook-form";
import { TabListContext } from "@/views/Home/CreateGroupChat";
type PeopleProps = {
    isOwner?: Boolean;
    isPeopleGroup?: Boolean;
    isSelectInput?: Boolean;
    isFiles?: Boolean;
    name?: string;
    groupIndex?: string;
    fileSize?: string;
    avatar?: string;
    avatars?: string[];
    Svg?: React.ReactElement;
};

const People = ({
    isOwner,
    isPeopleGroup,
    isSelectInput,
    isFiles,
    name,
    groupIndex,
    fileSize,
    avatar,
    avatars,
    Svg,
}: PeopleProps) => {
    const { control } = useContext(TabListContext);

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
                            <AvatarGroup
                                avatars={avatars ?? []}
                                Svg={Svg}
                                isGroup={true}
                            />
                            <Col className="px-0">
                                <h4 className="my-0">{name}</h4>
                                <p className="text-color my-0">{fileSize}</p>
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col className="col-auto">
                                <Avatar avatar={avatar as string} />
                            </Col>
                            <Col>{name}</Col>
                        </>
                    )}

                    {isOwner === true && (
                        <Col className="col-auto owner-text">owner</Col>
                    )}
                    <Col className="col-auto text-color">
                        {isSelectInput === true ? (
                            <FormGroup check>
                                <Controller
                                    defaultValue={false}
                                    name={`friend-selected-${groupIndex}`}
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="checkbox"
                                            className="people-group-select-input"
                                            {...field}
                                        />
                                    )}
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
