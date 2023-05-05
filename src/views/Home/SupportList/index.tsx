import SupportCard from "./components/SupportCard";
import Search from "@/components/Search";
const SupportList = () => {
    return (
        <>
            <div className="chat-list hidden-overflow px-4 bg-light ">
                <h2 className="fw-bold">支持</h2>
                <Search />
                <SupportCard
                    data={{ title: "profile", value: "chage profile" }}
                />
            </div>
        </>
    );
};
export default SupportList;
