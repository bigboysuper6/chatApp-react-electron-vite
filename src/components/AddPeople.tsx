import Button from "@/components/Button";
import { ReactComponent as ArrowRightSvg } from "@assets/arrowRight.svg";

type FooterProps = {
    onClick: () => void;
    text?: string;
};

export const Footer = ({ onClick, text }: FooterProps) => {
    return (
        <>
            <Button
                text={text ?? "添加好友"}
                Svg={ArrowRightSvg}
                type={"submit"}
                onClick={onClick}
            />
        </>
    );
};
