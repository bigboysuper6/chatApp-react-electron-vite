import { Card } from "reactstrap";
import Tab from "../../components/Tab";
import AuthCard from "./AuthCard";
import useActive from "@/utils/hook/useActive";

const CompoentList = ["SignIn", "SignUp"];
const Auth = () => {
    const [active, handleActive] = useActive(0);
    return (
        <>
            <div className="auth bg-light d-flex justify-content-center align-items-center ">
                <Card className="auth-card border-0 border-radius">
                    <Tab
                        textList={["登录", "注册"]}
                        active={active}
                        handleActive={handleActive}
                    />
                    <div className="auth-component mt-3 border-radius">
                        {CompoentList.map((item, index) => {
                            return (
                                <div
                                    className={`${
                                        active === index ? "" : "d-none"
                                    }`}
                                    key={index}
                                >
                                    <AuthCard model={item} />
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>
        </>
    );
};

export default Auth;
