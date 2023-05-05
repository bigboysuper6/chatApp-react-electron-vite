import { ReactComponent as ThreeDots } from "@assets/threeDots.svg";
import AvatarGroup from "./AvatarGroup";
import { ChatBoxContext } from "@/views/Home";
import { Col, Row } from "reactstrap";
import { useContext } from "react";
type ChatInfoRowProps = {
    isChatHeader?: Boolean;
};
const ChatInfoRow = ({ isChatHeader }: ChatInfoRowProps) => {
    const { handleSetIsDisplay } = useContext(ChatBoxContext);

    return (
        <>
            <Row className="d-flex align-items-center">
                <Col className="group-name ">
                    {isChatHeader === true ? (
                        <>
                            <h5 className="h5">
                                2023春招内推3群2023春招内推3群
                            </h5>
                            <div className="text-color">35 members</div>
                        </>
                    ) : (
                        <>2023春招内推3群2023春招内推3群</>
                    )}
                </Col>
                <Col className="col-auto">
                    <ThreeDots
                        className="text-color"
                        onClick={handleSetIsDisplay}
                    />
                </Col>
                <AvatarGroup />
            </Row>
        </>
    );
};
export default ChatInfoRow;
