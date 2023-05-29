import { Row, Col } from "reactstrap";
import { useContext } from "react";
import { HomeContext } from "@/views/Home";
type IMediaProps = {
    src: string[];
};

const Media = ({ src }: IMediaProps) => {
    const { setImg, imagePreviewToggle } = useContext(HomeContext);
    const handlePreview = (img: string) => {
        setImg(img);
        imagePreviewToggle();
    };
    return (
        <>
            <Row className="row-cols-3 my-2">
                {src.map((item: any) => {
                    return (
                        <>
                            <Col className="mt-3">
                                <img
                                    className="img-fluid rounded"
                                    style={{ width: "100px", height: "100px" }}
                                    src={item}
                                    onClick={() => handlePreview(item)}
                                />
                            </Col>
                        </>
                    );
                })}
            </Row>
        </>
    );
};
export default Media;
