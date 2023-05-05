type ButtonProps = {
    text: string;
    Svg: React.ComponentType;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
};
const Button = ({ Svg, text, onClick, type }: ButtonProps) => {
    return (
        <>
            <button
                className="btn btn-lg btn-primary w-100 d-flex align-items-center border-radius details-button"
                type={type ?? "button"}
                onClick={onClick}
            >
                {text}
                <span className="icon ms-auto">
                    <Svg />
                </span>
            </button>
        </>
    );
};
export default Button;
