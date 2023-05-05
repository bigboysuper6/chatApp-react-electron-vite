import { Col } from "reactstrap";
import Avatar from "./Avatar";
type AvatarGroupProps = {
    Svg?: React.ReactElement;
};
const AvatarGroup = ({ Svg }: AvatarGroupProps) => {
    return (
        <>
            <Col className="col-auto d-flex chat-info-row">
                <Avatar />
                <div className="rounded-circle fs-6 group-member-count fw-semibold avatar">
                    {Svg ?? "+4"}
                </div>
            </Col>
        </>
    );
};

export default AvatarGroup;
