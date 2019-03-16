import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import { AppConsumer } from '../../App/AppContext';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
class SignupPage extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        errors: [],
        redirect: false,
    };

    handleSubmit(e, loginFromToken) {
        e.preventDefault();
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
                console.log(err);
                this.setState({ errors: ['Error communicating with server'] });
            });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        if (this.state.redirect) return <Redirect to="/" />;

        let errMsg = <div />;
        if (this.state.errors.length) {
            errMsg = this.state.errors.map((err, key) => <p key={key}>Error: {err}</p>);
        }

        return (
            <AppConsumer>
                {({ loginFromToken }) => (
                    <PageTemplate>
                        <Form onSubmit={e => this.handleSubmit(e, loginFromToken)}>
                            <Form.Group controlId="formGroupUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" name="username" value={this.state.username} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.handleChange} />
                            </Form.Group>
                        </Form>
                        <div>{errMsg}</div>
                        <Button type="submit">Submit</Button>
                    </PageTemplate>
                )}
            </AppConsumer>
        )
    }
}

export default SignupPage;
