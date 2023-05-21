type AvatarProps = {
    onClick?: () => void;
    avatar: string;
};

const Avatar = ({ onClick, avatar }: AvatarProps) => {
    return (
        <>
            <div onClick={onClick}>
                <img src={avatar} className="rounded-circle avatar " />
            </div>
        </>
    );
};
export default Avatar;
