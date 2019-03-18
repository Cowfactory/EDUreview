import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import withAuth from '../../components/withAuth/withAuth';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';
import RatingPicker from '../../components/RatingPicker/RatingPicker';
import TrueFalsePicker from '../../components/TrueFalsePicker/TrueFalsePicker';


class AddReviewPage extends Component {
    state = {
        redirect: false,
        validated: false,
        errors: {},
        city: "",
        rating: "",
        enrollment: "",
        trueFalseQuestion1: "",
        trueFalseQuestion2: "",
        trueFalseQuestion3: "",
        headline: "",
        freeformQuestion1: "",
        freeformQuestion2: "",
        freeformQuestion3: ""
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        let payload = {
            // review: this.state.textValue,
            programId: this.props.match.params.id
        };
        if (this.props.user) {
            payload.user = this.props.user._id;
        }
        fetch('/api/reviews/', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                this.setState({ redirect: true });
            })
            .catch(err => {
                console.log(err);
            });
    };

    componentDidMount() {
        // Did we <Link> to this page? ie. the program data is passed via props.location
        if (!this.props.location.program) {
            fetch(`/api/programs/${this.props.match.params.id}`)
                .then(response => response.json())
                .then(review => {
                    this.setState(review)
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            this.setState({ redirect: true })
            // ToDo - Redirect to browse page?
        }
    }

    render() {
        if (this.state.redirect) return <Redirect to={`/programs/${this.props.match.params.id}`} />;

        const { validated } = this.state;
        const { errors } = this.state.errors;


        return (
            <PageTemplate>
                <h1>Write your review for {this.state.name}</h1>
                <FormTemplate>

                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={this.handleSubmit}
                    >
                        <div className="form-row">
                            <Form.Group className="col" controlId="formGroupLocation">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    placeholder="Enter City"
                                    value={this.state.city}
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Required Field
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Form.Group className="col" controlId="formGroupRating">
                                <Form.Label>Rating</Form.Label>
                                {/* <Form.Control
                                    type="text"
                                    name="rating"
                                    placeholder="Enter Rating"
                                    value={this.state.rating}
                                    onChange={this.handleChange}
                                /> */}
                                <InputGroup>
                                    <RatingPicker>

                                    </RatingPicker>
                                </InputGroup>

                                <Form.Control.Feedback type="invalid">
                                    Required Field
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="col" controlId="formGroupEnrollment">
                                <Form.Label>Enrollment</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="enrollment"
                                    placeholder="Enter Enrollment Status"
                                    value={this.state.enrollment}
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Required Field
                                </Form.Control.Feedback>
                            </Form.Group>

                        </div>
                        <hr />
                        <div className="form-row">
                            <Form.Group className="col" controlId="formGroupTF1">
                                <Form.Label>Did you enroll in the hopes of starting a career, or a career transition?</Form.Label>
                                {/* <Form.Control
                                    type="text"
                                    name="trueFalseQuestion1"
                                    placeholder="Enter Response"
                                    value={this.state.trueFalseQuestion1}
                                    onChange={this.handleChange}
                                /> */}
                                <TrueFalsePicker></TrueFalsePicker>
                                <Form.Control.Feedback type="invalid">
                                    Required Field
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="col" controlId="formGroupTF2">
                                <Form.Label>Did the course match your expectations?</Form.Label>
                                {/* <Form.Control
                                    type="text"
                                    name="trueFalseQuestion2"
                                    placeholder="Enter Response"
                                    value={this.state.trueFalseQuestion2}
                                    onChange={this.handleChange}
                                /> */}
                                <TrueFalsePicker></TrueFalsePicker>
                                <Form.Control.Feedback type="invalid">
                                    Required Field
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="col" controlId="formGroupTF3">
                                <Form.Label>Would you recommend this program to somebody with similar expectations as you?</Form.Label>
                                {/* <Form.Control
                                    type="text"
                                    name="trueFalseQuestion3"
                                    placeholder="Enter Response"
                                    value={this.state.trueFalseQuestion3}
                                    onChange={this.handleChange}
                                /> */}
                                <TrueFalsePicker></TrueFalsePicker>
                                <Form.Control.Feedback type="invalid">
                                    Required Field
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <hr />

                        <Form.Group controlId="formGroupHeadline">
                            <Form.Label>Review Headline</Form.Label>
                            <Form.Control
                                type="text"
                                name="headline"
                                placeholder="Enter Review Headline"
                                value={this.state.headline}
                                onChange={this.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required Field
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formGroupQ1">
                            <Form.Label>What are the most important takeaways from your time in the program?</Form.Label>
                            <Form.Control
                                type="text"
                                name="freeformQuestion1"
                                placeholder="Enter Response"
                                value={this.state.freeformQuestion1}
                                onChange={this.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required Field
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formGroupQ2">
                            <Form.Label>What things detracted from, or were missing from the program</Form.Label>
                            <Form.Control
                                type="text"
                                name="freeformQuestion2"
                                placeholder="Enter Response"
                                value={this.state.freeformQuestion2}
                                onChange={this.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required Field
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formGroupQ3">
                            <Form.Label>Advice to future students:</Form.Label>
                            <Form.Control
                                type="text"
                                name="freeformQuestion3"
                                placeholder="Enter Response"
                                value={this.state.freeformQuestion3}
                                onChange={this.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required Field
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit">Submit</Button>
                    </Form>
                </FormTemplate>
            </PageTemplate >
        );
    }
}

export default withAuth(AddReviewPage);
