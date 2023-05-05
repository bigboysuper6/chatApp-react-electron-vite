import avatar from "@assets/avatar.jpeg";

type AvatarProps = {
    onClick?: () => void;
};

const Avatar = ({ onClick }: AvatarProps) => {
    return (
        <>
            <div onClick={onClick}>
                <img src={avatar} className="rounded-circle avatar " />
            </div>
        </>
    );
};
export default Avatar;
