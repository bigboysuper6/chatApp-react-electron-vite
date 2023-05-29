import SupportCard from "@/views/Home/SupportList/components/SupportCard";
import Modal from "./Modal";
import { EnvelopeTitle } from "./Envelope";
import { ReactComponent as AreaSvg } from "@assets/area.svg";
import { ReactComponent as EnvelopeSvg } from "@assets/envelope.svg";
import { ReactComponent as PhoneSvg } from "@assets/phone.svg";
type BodyProps = {
    data: {
        area?: string;
        phoneNumber?: string;
        "e-mail"?: string;
    };
};

type PeopleInfoProps = {
    data: {
        area?: string;
        phoneNumber?: string;
        "e-mail"?: string;
        name?: string;
        avatar?: string;
    };
    modal: boolean;
    toggle: () => void;
};

const Body = ({ data }: BodyProps) => {
    return (
        <>
            <SupportCard
                isHomePage={true}
                isSetting={true}
                data={{ title: "国家/地区", value: data.area, type: "area" }}
                type="peopleInfo"
                Svg={<AreaSvg className="text-color" />}
            />
            <SupportCard
                isHomePage={true}
                isSetting={true}
                data={{
                    title: "电话号码",
                    value: data.phoneNumber,
                    type: "phoneNumber",
                }}
                Svg={<PhoneSvg className="text-color" />}
                type="peopleInfo"
            />
            <SupportCard
                isHomePage={true}
                isSetting={true}
                isLastCard={true}
                data={{
                    title: "电子邮箱",
                    value: data["e-mail"],
                    type: "email",
                }}
                type="peopleInfo"
                Svg={<EnvelopeSvg className="text-color" />}
            />
        </>
    );
};

const PeopleInfo = ({ data, modal, toggle }: PeopleInfoProps) => {
    console.log(data, "data");
    return (
        <>
            <Modal
                Title={
                    <EnvelopeTitle
                        isHomePage={true}
                        title={data.name}
                        avatar={data.avatar}
                    />
                }
                Body={<Body data={data} />}
                Footer={<></>}
                modal={modal}
                toggle={toggle}
            />
        </>
    );
};

export default PeopleInfo;
