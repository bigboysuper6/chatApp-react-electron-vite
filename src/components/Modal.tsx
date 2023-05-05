import {
    Button,
    Modal as TheModal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";

type ModalProps = {
    Title: React.ReactElement;
    Body: React.ReactElement;
    Footer: React.ReactElement;
    modal: boolean;
    toggle: () => void;
};

const Modal = ({ Title, Body, Footer, modal, toggle, ...args }: ModalProps) => {
    return (
        <TheModal
            isOpen={modal}
            toggle={toggle}
            {...args}
            scrollable={true}
            centered={true}
            className="modal"
        >
            <div className="modal-header p-0 w-100 border-0 mb-3 ">{Title}</div>
            <ModalBody className="mb-3 hidden-overflow">{Body}</ModalBody>
            <ModalFooter className="border-0 ">{Footer}</ModalFooter>
        </TheModal>
    );
};

export default Modal;
