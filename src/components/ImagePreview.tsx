import SupportCard from "@/views/Home/SupportList/components/SupportCard";
import { EnvelopeTitle } from "./Envelope";
import { useEffect, useState } from "react";
import {
    Button,
    Modal as TheModal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
type BodyProps = {
    img: string;
};

type PeopleInfoProps = { img: string; modal: boolean; toggle: () => void };

const Body = ({ img }: BodyProps) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    useEffect(() => {
        const image = new Image();
        image.src = img;
        image.onload = () => {
            const { width, height } = image;
            setDimensions({ width, height });
        };
    }, [img]);
    return (
        <>
            <img
                src={img}
                style={{
                    width:
                        dimensions.width > dimensions.height ? "700px" : "auto",
                    height:
                        dimensions.width < dimensions.height ? "700px" : "auto",
                }}
                className="border-radius"
            />
        </>
    );
};

const ImagePreview = ({ img, modal, toggle, ...args }: PeopleInfoProps) => {
    return (
        <>
            <TheModal
                isOpen={modal}
                toggle={toggle}
                {...args}
                scrollable={true}
                centered={true}
                className="modal"
                style={{ maxWidth: "700px" }}
            >
                <Body img={img} />
            </TheModal>
        </>
    );
};

export default ImagePreview;
