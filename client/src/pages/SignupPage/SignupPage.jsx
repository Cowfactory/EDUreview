import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import { AppConsumer } from '../../App/AppContext';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';
class SignupPage extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        errors: {},
        redirect: false,
        validated: false,
    };

    handleSubmit(e, loginFromToken) {
        e.preventDefault();

        const form = e.currentTarget;
        this.setState({ validated: true });

        // Don't fetch if form invalid
        if (form.checkValidity() === false) {
            return;
        }

        fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                if (response.errors) {
                    this.setState({ errors: response.errors });
                } else {
                    // save the jwt
                    loginFromToken(response.token);
                    this.setState({ redirect: true });
                }
            })
            .catch(err => {
                this.setState({ errors: ['Error communicating with server'] });
            });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidMount() {
        document.title = "Signup - EDUreview";
    }

    render() {
        if (this.state.redirect) return <Redirect to="/" />;
        const { validated } = this.state;
        const { errors } = this.state;

        return (
            <AppConsumer>
                {({ loginFromToken }) => (

                    <PageTemplate>
                        <FormTemplate>
                            <Form
                                noValidate
                                validated={validated}
                                onSubmit={e => this.handleSubmit(e, loginFromToken)}
                            >
                                <Form.Group as={Form.Row} controlId="formGroupUsername">
                                    <Form.Label column sm={1}>Username</Form.Label>
                                    <Col sm={11}>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter Username"
                                            name="username"
                                            value={this.state.username}
                                            isInvalid={!!errors.username}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Text className="text-muted">
                                            Username must be between 3 and 16 characters
                                        </Form.Text>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.username || "Username is required"}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Form.Row} controlId="formGroupEmail">
                                    <Form.Label column sm={1}>Email</Form.Label>
                                    <Col sm={11}>
                                        <Form.Control
                                            type="email"
                                            required
                                            placeholder="Enter Email"
                                            name="email"
                                            value={this.state.email}
                                            isInvalid={!!errors.email}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Text className="text-muted">
                                            Email address must be unique and be between 3 and 99 characters
                                        </Form.Text>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email || "Email is required"}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Form.Row} controlId="formGroupPassword">
                                    <Form.Label column sm={1}>Password</Form.Label>
                                    <Col sm={11}>
                                        <Form.Control
                                            type="password"
                                            required
                                            placeholder="Enter Password"
                                            name="password"
                                            value={this.state.password}
                                            isInvalid={!!errors.password}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Text className="text-muted">
                                            Password must be between 8 and 128 characters
                                        </Form.Text>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password || "Password is required"}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Control.Feedback type="invalid">
                                    {errors.msg || "One or more fields is invalid"}
                                </Form.Control.Feedback>
                                <Button type="submit">Submit</Button>
                            </Form>
                        </FormTemplate>
                    </PageTemplate>
                )}
            </AppConsumer>
        );
    }
}

export default SignupPage;
