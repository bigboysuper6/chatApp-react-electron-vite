import { Col } from "reactstrap";
import Avatar from "./Avatar";
type AvatarGroupProps = {
    Svg?: React.ReactElement;
    avatars: string[];
    number?: string;
    isChatHeader?: boolean | undefined;
    isGroup?: boolean;
    onClick?: () => void;
};
const AvatarGroup = ({
    Svg,
    avatars,
    number,
    isChatHeader,
    isGroup,
    onClick,
}: AvatarGroupProps) => {
    return (
        <>
            <Col className="col-auto d-flex chat-info-row">
                {avatars.map((item: any) => {
                    return <Avatar avatar={item} />;
                })}
                {isGroup && (
                    <div
                        className="rounded-circle fs-6 group-member-count fw-semibold avatar"
                        onClick={onClick}
                    >
                        {Svg ?? (isChatHeader ? "+" : "+" + number)}
                    </div>
                )}
            </Col>
        </>
    );
};

export default AvatarGroup;
