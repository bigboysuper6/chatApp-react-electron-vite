import SupportCard from "../../SupportList/components/SupportCard";

type ISettingCardGroupProps = {
    control: any;
    handleSubmit: any;
    title: string;
    data: object[];
};

const SettingCardGroup = ({
    control,
    handleSubmit,
    title,
    data,
}: ISettingCardGroupProps) => {
    return (
        <>
            <p className="text-color my-3">{[title]}</p>
            <div className="px-4 setting-card-group border-radius">
                {data.map((item: any) => {
                    return (
                        <SupportCard
                            isSetting={true}
                            data={item}
                            control={control}
                            handleSubmit={handleSubmit}
                        />
                    );
                })}
            </div>
        </>
    );
};
export default SettingCardGroup;
