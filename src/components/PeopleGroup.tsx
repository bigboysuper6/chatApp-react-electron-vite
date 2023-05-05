import People from "@/components/People";

type PeopleGroupProps = {};

const PeopleGroup = () => {
    return (
        <>
            <div>
                <div className="text-color my-3">A</div>
                <People isPeopleGroup={true} />
                <People isPeopleGroup={true} />
                <People isPeopleGroup={true} />
                <People isPeopleGroup={true} />
            </div>
        </>
    );
};

export default PeopleGroup;
