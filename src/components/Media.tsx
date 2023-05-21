import { Row, Col } from "reactstrap";

type IMediaProps = {
    src: string[];
};

const Media = ({ src }: IMediaProps) => {
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
