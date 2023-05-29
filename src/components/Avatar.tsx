import { useContext } from "react";
import { HomeContext } from "@/views/Home";
type AvatarProps = {
    onClick?: () => void;
    avatar: string;
    peopleData?: any;
};

const Avatar = ({ onClick, avatar, peopleData }: AvatarProps) => {
    const { peopleInfoToggle, setPeopleData } = useContext(HomeContext);
    const handlePeopleInfo = () => {
        if (peopleData) {
            peopleInfoToggle();
            setPeopleData(peopleData);
        }
    };
    return (
        <>
            <div onClick={onClick ?? handlePeopleInfo}>
                <img src={avatar} className="rounded-circle avatar " />
            </div>
        </>
    );
};
export default Avatar;
