import PeopleGroup from "@/components/PeopleGroup";
import { useSelector } from "react-redux";

const Invite = () => {
    const friends = useSelector((state: any) => state.user.value.friends);

    return (
        <>
            {friends.map((item: any) => {
                return (
                    <PeopleGroup
                        groupArr={item?.groupArr}
                        groupName={item?.letter}
                        isSelectInput={true}
                    />
                );
            })}
        </>
    );
};

export default Invite;
