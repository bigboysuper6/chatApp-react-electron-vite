import SupportCard from "../../SupportList/components/SupportCard";

const SettingCardGroup = () => {
    return (
        <>
            <p className="text-color my-3">Account</p>
            <div className="px-4 setting-card-group border-radius">
                <SupportCard isSetting={true} data={{}} />
            </div>
        </>
    );
};
export default SettingCardGroup;
