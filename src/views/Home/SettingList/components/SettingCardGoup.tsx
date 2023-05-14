import SupportCard from "../../SupportList/components/SupportCard";

const SettingCardGroup = () => {
    return (
        <>
            <p className="text-color my-3">Account</p>
            <div className="px-4 setting-card-group border-radius">
                <SupportCard isSetting={true} data={{ value: "修改密码" }} />
                <SupportCard isSetting={true} data={{ value: "修改头像" }} />
                <SupportCard isSetting={true} data={{ value: "修改地区" }} />
                <SupportCard
                    isSetting={true}
                    data={{ value: "修改电子邮箱" }}
                />
            </div>
        </>
    );
};
export default SettingCardGroup;
