import SettingCardGroup from "./components/SettingCardGoup";
import Search from "@/components/Search";
const SettingList = () => {
    return (
        <>
            <div className="chat-list hidden-overflow px-4 bg-light ">
                <h2 className="fw-bold">通知</h2>
                <Search />
                <SettingCardGroup />
                <SettingCardGroup />
                <SettingCardGroup />
                <SettingCardGroup />
            </div>
        </>
    );
};
export default SettingList;
