import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class AddProgramPage extends React.Component {
    state = {
        institutionId: '',
        institutionName: '',
        programName: '',
        redirect: false,
        validated: false,
        redirectId: ""
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        this.setState({ validated: true });

        if (form.checkValidity() === false) {
            return;
        }

        fetch('/api/programs', {
            method: 'POST',
            body: JSON.stringify({
                institutionId: this.state.institutionId,
                programName: this.state.programName,
                programTypes: this.getProgramTypes()
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(program => {
                this.setState({
                    redirectId: program.programId,
                    redirect: true
                });
            });
    };

    getProgramTypes = () => {
        const ret = [];
        const { online, inPerson, degree, certification } = this.state;

        if (online) ret.push(online);
        if (inPerson) ret.push(inPerson);
        if (degree) ret.push(degree);
        if (certification) ret.push(certification);

        return ret;
    }

    componentDidMount() {
        document.title = "Add Program - EDUreview";
        try {
            const { institutionId, name } = this.props.location.state;
            this.setState({
                institutionId,
                institutionName: name
            })
        } catch {
            this.setState({ redirect: true })
        }
    }

    render() {
        if (this.state.redirect) return <Redirect to={`/programs/${this.state.redirectId}`} />;

        const { validated } = this.state.validated;

        return (
            <PageTemplate>
                <h1>Add New Program to {this.state.institutionName}</h1>

                <FormTemplate>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={e => this.handleSubmit(e)}
                    >
                        <Form.Group as={Form.Row} controlId="formGroupEmail">
                            <Form.Label column sm={2}>Institution</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    disabled
                                    type="text"
                                    placeholder="Enter Institution Name"
                                    name="institutionName"
                                    value={this.state.institutionName}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Form.Row} controlId="formGroupProgram">
                            <Form.Label column sm={2}>Program Name</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Program Name"
                                    name="programName"
                                    value={this.state.programName}
                                    onChange={this.handleChange}
                                    isInvalid={!this.state.programName}
                                />
                            </Col>
                            <Form.Control.Feedback type="invalid">
                                Required Field
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Form.Row} controlId="formGroupTypes">
                            <Form.Label column sm={2}>Types</Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    inline
                                    label="Online"
                                    name="online"
                                    value="Online"
                                    onChange={this.handleChange}
                                />
                                <Form.Check
                                    inline
                                    label="In Person"
                                    name="inPerson"
                                    value="In Person"
                                    onChange={this.handleChange}
                                />
                                <Form.Check
                                    inline
                                    label="Accredited (Degrees)"
                                    name="degree"
                                    value="Accredited (Degrees)"
                                    onChange={this.handleChange}
                                />
                                <Form.Check
                                    inline
                                    label="Accredited (Certifications)"
                                    name="certification"
                                    value="Accredited (Certifications)"
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>

                        <Button type="submit">Submit</Button>
                    </Form>
                </FormTemplate>
            </PageTemplate>
        );
    }
}

export default AddProgramPage;
