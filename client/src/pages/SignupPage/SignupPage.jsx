import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import { AppConsumer } from '../../App/AppContext';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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

    render() {
        if (this.state.redirect) return <Redirect to="/" />;
        const { validated } = this.state;
        const { errors } = this.state;

        return (
            <AppConsumer>
                {({ loginFromToken }) => (
                    <PageTemplate>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={e => this.handleSubmit(e, loginFromToken)}
                        >
                            <Form.Group controlId="formGroupUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Username"
                                    name="username"
                                    value={this.state.username}
                                    isInvalid={!!errors.username}
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username || "Username is required"}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    required
                                    placeholder="Enter Email"
                                    name="email"
                                    value={this.state.email}
                                    isInvalid={!!errors.email}
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email || "Email is required"}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                    placeholder="Enter Password"
                                    name="password"
                                    value={this.state.password}
                                    isInvalid={!!errors.password}
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password || "Password is required"}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Control.Feedback type="invalid">
                                {errors.msg || "One or more fields is invalid"}
                            </Form.Control.Feedback>
                            <Button type="submit">Submit</Button>
                        </Form>
                    </PageTemplate>
                )}
            </AppConsumer>
        );
    }
}

export default SignupPage;
