import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit(e) {}
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
        return (
            <PageTemplate>
                <div>
                    <form onSubmit={this.handleSubmit}>
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
                        </div>
                    </form>
                </div>
            </PageTemplate>
        );
    }
}

export default LoginPage;
