import People from "@/components/People";

type PeopleGroupProps = {
    groupName: string;
    groupArr: object[];
    isSelectInput?: Boolean;
};

const PeopleGroup = ({
    groupName,
    groupArr,
    isSelectInput,
}: PeopleGroupProps) => {
    return (
        <>
            <div>
                <div className="text-color my-3">{groupName}</div>
                {groupArr?.map((item: any, index: number) => {
                    return (
                        <People
                            key={index}
                            groupIndex={groupName + index}
                            name={item.name}
                            isPeopleGroup={true}
                            isSelectInput={isSelectInput}
                            avatar={item.avatar}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default PeopleGroup;
