import People from "@/components/People";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const PeopleTab = () => {
    const members = useSelector((state: any) => {
        return state.message.value.groupInfo.members;
    });
    const owner = useSelector((state: any) => {
        return state.message.value.groupInfo.owner;
    });
    return (
        <>
            <People isOwner={true} name={owner?.name} avatar={owner?.avatar} />
            {members?.map((item: any) => {
                return <People name={item?.name} avatar={item?.avatar} />;
            })}
        </>
    );
};

export default PeopleTab;
