import People from "@/components/People";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import useOpen from "@/utils/hook/useOpen";
import PeopleInfo from "@/components/PeopleInfo";
import { useState } from "react";

const PeopleTab = () => {
    const members = useSelector((state: any) => {
        return state.message.value.groupInfo.members;
    });
    const owner = useSelector((state: any) => {
        return state.message.value.groupInfo.owner;
    });
    const handleDelete = () => {
        alert("成功删除成员");
    };
    const menuItems = ["删除成员"];
    const handleEvents = [handleDelete];

    return (
        <>
            <People
                isOwner={true}
                name={owner?.name}
                avatar={owner?.avatar}
                peopleData={owner}
                menuItems={menuItems}
                handleEvents={handleEvents}
                direction={"dropstart"}
            />
            {members?.map((item: any) => {
                return (
                    <People
                        name={item?.name}
                        avatar={item?.avatar}
                        peopleData={item}
                        menuItems={menuItems}
                        handleEvents={handleEvents}
                        direction={"dropstart"}
                    />
                );
            })}
        </>
    );
};

export default PeopleTab;
