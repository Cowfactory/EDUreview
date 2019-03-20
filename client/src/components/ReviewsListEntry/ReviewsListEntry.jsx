import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './ReviewsListEntry.css';

const ratings = {
    "Excellent": 5,
    "Very Good": 4,
    "Good": 3,
    "Fair": 2,
    "Poor": 1
}
const tfQuestions = {
    trueFalseQuestion1: "Did you enroll in the hopes of starting a new career?",
    trueFalseQuestion2: "Did the course match your expectations?",
    trueFalseQuestion3: "Would you recommend the course to someone else?"
}

const ffQuestions = {
    freeformQuestion1: "What are the most important takeaways from your time in the program?",
    freeformQuestion2: "What things detracted from, or were missing from the program?",
    freeformQuestion3: "Advice to future students:"
}

function ReviewsListEntry(props) {
    const { review, user } = props;
    let variant;
    switch (review.rating) {
        case "Excellent":
            variant = "success"
            break;
        case "Very Good":
            variant = "primary"
            break;
        case "Good":
            variant = "secondary"
            break;
        case "Fair":
            variant = "warning"
            break;
        case "Poor":
            variant = "danger"
            break;
        default:
            variant = "secondary"
            break;
    }

    return (
        <Col md={"auto"} className="ReviewsListEntry">
            <ListGroup.Item variant={variant}>
                <Col>
                    <Row>
                        <Col md={4}>
                            <Row>
                                <h3>“{review.headline}” - {ratings[review.rating]} / 5</h3>
                            </Row>
                            <Row>
                                {user ?
                                    <h5>- {user.username}, {review.enrollment}</h5>
                                    :
                                    <h5>- Anonymous User, {review.enrollment}</h5>
                                }
                            </Row>
                        </Col>
                        <Col md={8}>
                            <Row>
                                <Col>
                                    <Row>
                                        <i>{tfQuestions.trueFalseQuestion1}</i>
                                    </Row>
                                    <ListGroup.Item>
                                        <p>{review.trueFalseQuestion1}</p>
                                    </ListGroup.Item>
                                </Col>
                                <Col>
                                    <Row>
                                        <i>{tfQuestions.trueFalseQuestion2}</i>
                                    </Row>
                                    <ListGroup.Item>
                                        <p>{review.trueFalseQuestion2}</p>
                                    </ListGroup.Item>
                                </Col>
                                <Col>
                                    <Row>
                                        <i>{tfQuestions.trueFalseQuestion3}</i>
                                    </Row>
                                    <ListGroup.Item>
                                        <p>{review.trueFalseQuestion3}</p>
                                    </ListGroup.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <i>{ffQuestions.freeformQuestion1}</i>
                            </Row>
                            <ListGroup.Item>
                                <p>{review.freeformQuestion1}</p>
                            </ListGroup.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <i>{ffQuestions.freeformQuestion2}</i>
                            </Row>
                            <ListGroup.Item>
                                <p>{review.freeformQuestion2}</p>
                            </ListGroup.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <i>{ffQuestions.freeformQuestion3}</i>
                            </Row>
                            <ListGroup.Item>
                                <p>{review.freeformQuestion3}</p>
                            </ListGroup.Item>
                        </Col>
                    </Row>
                </Col>
            </ListGroup.Item>
        </Col>
    );
}

export default ReviewsListEntry;
