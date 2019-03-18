import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import { AppConsumer } from '../../App/AppContext';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';

class LoginPage extends React.Component {
    state = {
        email: '',
        password: '',
        redirect: false,
        validated: false,
        errors: {}
    };

    handleSubmit = (e, login) => {
        e.preventDefault();
        this.setState({ validated: true });

        login(this.state.email, this.state.password)
            .then(() => {
                this.setState({ redirect: true });
            })
            .catch(err => {
                err.response.json()
                    .then(res => {
                        this.setState({ errors: res.errors });
                    })
            })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        document.title = "Login - EDUreview";
    }

    render() {
        if (this.state.redirect) return <Redirect to="/" />;
        const { validated } = this.state;
        const { errors } = this.state;

        return (
            <AppConsumer>
                {({ login }) => {
                    return (
                        <PageTemplate>
                            <FormTemplate>

                                <Form
                                    noValidate
                                    validated={validated}
                                    onSubmit={e => this.handleSubmit(e, login)}
                                >
                                    <Form.Group controlId="formGroupEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            required
                                            placeholder="Enter Email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Required Field
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
                                            isInvalid={!!errors.msg}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.msg || "Username or Password was invalid"}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button type="submit">Submit</Button>
                                </Form>
                            </FormTemplate>
                        </PageTemplate>
                    );
                }}
            </AppConsumer>
        );
    }
}

export default LoginPage;
