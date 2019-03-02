import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import { AppConsumer } from '../../App/AppContext';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMsg: '',
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit(e, toggleIsUserLoggedIn) {
        e.preventDefault();
        fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                if (response.error) {
                    this.setState({ errorMsg: response.error });
                } else {
                    localStorage.setItem('jwtToken', response.token);
                    toggleIsUserLoggedIn();
                }
            });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <AppConsumer>
                {({ toggleIsUserLoggedIn }) => {
                    return (
                        <PageTemplate>
                            <div>
                                {/* Extraordinarily strange way of passing AppConsumer's toggle func to handleSubmit() */}
                                <form onSubmit={e => this.handleSubmit(e, toggleIsUserLoggedIn)}>
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
                                    <div />
                                </form>
                            </div>
                        </PageTemplate>
                    );
                }}
            </AppConsumer>
        );
    }
}

export default LoginPage;
