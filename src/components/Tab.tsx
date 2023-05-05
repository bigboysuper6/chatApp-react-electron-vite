import { Nav, NavItem, NavLink } from "reactstrap";

type TabProps = {
    textList: string[];
    active: number;
    handleActive: (activeIndex: number) => void;
};

const Tab = ({ textList, active, handleActive }: TabProps) => {
    return (
        <>
            <Nav className="nav nav-pills nav-justified tab">
                {textList.map((item, index) => (
                    <NavItem
                        key={index}
                        className={active === index ? "active" : ""}
                        onClick={() => handleActive(index)}
                    >
                        {item}
                    </NavItem>
                ))}
            </Nav>
        </>
    );
};

export default Tab;
