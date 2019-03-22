import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import withAuth from '../../components/withAuth/withAuth';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';
import RatingPicker from '../../components/RatingPicker/RatingPicker';
import TrueFalsePicker from '../../components/TrueFalsePicker/TrueFalsePicker';
import EnrollmentStatusPicker from './EnrollmentStatusPicker/EnrollmentStatusPicker';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';

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

    checkHeadlineValidity = () => {
        let length = this.state.headline.length;
        if (length > 0 && length < 32) {
            return true;
        }
        return false;
    }

    handleSubmit = e => {
        e.preventDefault();

        const form = e.currentTarget;
        this.setState({ validated: true });

        // Don't fetch if form invalid
        if (form.checkValidity() === false) {
            return;
        }
        const {
            city, rating, enrollment, trueFalseQuestion1,
            trueFalseQuestion2, trueFalseQuestion3, headline,
            freeformQuestion1, freeformQuestion2, freeformQuestion3 } = this.state;

        let payload = {
            review: {
                city, rating, enrollment, trueFalseQuestion1,
                trueFalseQuestion2, trueFalseQuestion3, headline,
                freeformQuestion1, freeformQuestion2, freeformQuestion3
            },
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
                this.setState({ errors: err })
            });
    };

    componentDidMount() {
        document.title = 'Add Review - EDUreview';
        // Did we <Link> to this page? ie. the program data is passed via props.location
        let institutionName
        try {
            institutionName = this.props.location.state.institutionName;
        } catch { }

        if (!this.props.location.program) {
            fetch(`/api/programs/${this.props.match.params.id}`)
                .then(response => response.json())
                .then(program => {
                    this.setState({
                        program,
                        institutionName,
                    })
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

        const { validated, institutionName } = this.state;
        let name, institutionId, programId;
        if (this.state.program) {
            name = this.state.program.name;
            institutionId = this.state.program.institutionId;
            programId = this.state.program._id;
        }
        // const { errors } = this.state.errors;

        return (
            <PageTemplate>
                <BreadCrumb>
                    <Link to="/">Home</Link>
                    Search
                    <Link to={`/institutions/${institutionId}`}>{institutionName}</Link>
                    <Link to={`/programs/${programId}`}>{name}</Link>
                    Add Review
                </BreadCrumb>
                <h1>Write your review for:</h1>
                <h2>
                    <Link to={{
                        pathname: `/programs/${programId}`,
                        state: { institutionName, institutionId }
                    }}>{name}</Link>
                    &nbsp; at &nbsp;
                    <Link to={`/institutions/${institutionId}`}>{institutionName}</Link>
                </h2>
                <FormTemplate>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={e => this.handleSubmit(e)}
                    >
                        <Row>
                            <Form.Group className="col" controlId="formGroupLocation">
                                <Form.Label>City:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    placeholder="Enter City"
                                    value={this.state.city}
                                    onChange={this.handleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Required Field
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="col" controlId="formGroupRating">
                                <Form.Label>Rating:</Form.Label>
                                <RatingPicker
                                    name="rating"
                                    handleChange={this.handleChange}
                                    isValid={false}
                                />
                                <FormControl
                                    className="d-none"
                                    isInvalid={!this.state.rating}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Required Field
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="col" controlId="formGroupEnrollment">
                                <Form.Label>Enrollment Status:</Form.Label>
                                <EnrollmentStatusPicker
                                    name="enrollment"
                                    handleChange={this.handleChange}
                                />
                                <FormControl
                                    className="d-none"
                                    isInvalid={!this.state.enrollment}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Required Field
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <hr />

                        <Row>
                            <Form.Group className="col" controlId="formGroupTF1">
                                <Form.Label>Did you enroll in the hopes of starting a new career?</Form.Label>
                                <TrueFalsePicker
                                    name="trueFalseQuestion1"
                                    handleChange={this.handleChange}
                                />
                                <FormControl
                                    className="d-none"
                                    isInvalid={!this.state.trueFalseQuestion1}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Required Field
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="col" controlId="formGroupTF2">
                                <Form.Label>Did the course match your expectations?</Form.Label>
                                <TrueFalsePicker
                                    name="trueFalseQuestion2"
                                    handleChange={this.handleChange}
                                />
                                <FormControl
                                    className="d-none"
                                    isInvalid={!this.state.trueFalseQuestion2}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Required Field
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="col" controlId="formGroupTF3">
                                <Form.Label>Would you recommend the course to someone else?</Form.Label>
                                <TrueFalsePicker
                                    name="trueFalseQuestion3"
                                    handleChange={this.handleChange}
                                />
                                <FormControl
                                    className="d-none"
                                    isInvalid={!this.state.trueFalseQuestion3}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Required Field
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <hr />

                        <Form.Group controlId="formGroupHeadline">
                            <Form.Label>Review Headline:</Form.Label>
                            <Form.Control
                                type="text"
                                name="headline"
                                placeholder="Enter Review Headline"
                                isInvalid={!this.checkHeadlineValidity()}
                                value={this.state.headline}
                                onChange={this.handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {"Required Field, Length < 32 characters"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formGroupQ1">
                            <Form.Label>What are the most important takeaways from your time in the program?</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                name="freeformQuestion1"
                                placeholder="Enter Response"
                                value={this.state.freeformQuestion1}
                                onChange={this.handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Required Field
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formGroupQ2">
                            <Form.Label>What things detracted from, or were missing from the program?</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                name="freeformQuestion2"
                                placeholder="Enter Response"
                                value={this.state.freeformQuestion2}
                                onChange={this.handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Required Field
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formGroupQ3">
                            <Form.Label>Advice to future students:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                name="freeformQuestion3"
                                placeholder="Enter Response"
                                value={this.state.freeformQuestion3}
                                onChange={this.handleChange}
                                required
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
