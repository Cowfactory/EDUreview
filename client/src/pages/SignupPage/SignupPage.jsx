import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import { AppConsumer } from '../../App/AppContext';
import { Redirect } from 'react-router-dom';
import AuthService from '../../services/AuthService';

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            errors: [],
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.AuthService = new AuthService();
    }

    handleSubmit(e, toggleIsUserLoggedIn) {
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
                    AuthService.setToken(response.token);
                    toggleIsUserLoggedIn();
                    this.setState({ redirect: true });
                }
            })
            .catch(err => {
                this.setState({ errors: ['Error communicating with server'] });
            });
    }
    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }
    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        if (this.state.redirect) return <Redirect to="/" />;

        let errMsg = <div />;
        if (this.state.errors.length) {
            errMsg = this.state.errors.map((err, key) => <p key={key}>Error: {err}</p>);
        }

        return (
            <AppConsumer>
                {({ toggleIsUserLoggedIn }) => (
                    <PageTemplate>
                        <div>
                            <form onSubmit={e => this.handleSubmit(e, toggleIsUserLoggedIn)}>
                                <div>
                                    <label htmlFor="username">Username:</label>
                                    <input
                                        name="username"
                                        type="text"
                                        value={this.state.username}
                                        onChange={this.handleUsernameChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.handleEmailChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        name="password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.handlePasswordChange}
                                    />
                                    <input type="submit" />
                                </div>
                                <div>{errMsg}</div>
                            </form>
                        </div>
                    </PageTemplate>
                )}
            </AppConsumer>
        );
    }
}

export default SignupPage;
