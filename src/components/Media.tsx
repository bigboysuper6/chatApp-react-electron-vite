import { Row, Col } from "reactstrap";
import media from "@assets/media.jpeg";
const Media = () => {
    return (
        <>
            <Row className="row-cols-3 my-2">
                <Col className="mt-3">
                    <img className="img-fluid rounded" src={media} />
                </Col>
                <Col className="mt-3">
                    <img className="img-fluid rounded " src={media} />
                </Col>
                <Col className="mt-3">
                    <img className="img-fluid rounded " src={media} />
                </Col>
                <Col className="mt-3">
                    <img className="img-fluid rounded " src={media} />
                </Col>
                <Col className="mt-3">
                    <img className="img-fluid rounded " src={media} />
                </Col>
                <Col className="mt-3">
                    <img className="img-fluid rounded " src={media} />
                </Col>
            </Row>
        </>
    );
};
export default Media;
