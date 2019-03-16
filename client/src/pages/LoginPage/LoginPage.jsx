import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import { AppConsumer } from '../../App/AppContext';
import { Redirect } from 'react-router-dom';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: [],
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit(e, login) {
        e.preventDefault();
        login(this.state.email, this.state.password)
            .then(res => {
                this.setState({ redirect: true });
            })
            .catch(err => {
                err.response.json().then(response => {
                    this.setState({ errors: response.errors });
                });
            });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    componentDidMount() {
        document.title = "Login - EDUreview";
    }

    render() {
        if (this.state.redirect) return <Redirect to="/" />;
        let errMsg = <div />;
        if (this.state.errors.length) {
            errMsg = this.state.errors.map((err, key) => <p key={key}>Error: {err}</p>);
        }

        return (
            <AppConsumer>
                {({ login }) => {
                    return (
                        <PageTemplate>
                            <div>
                                {/* Extraordinarily strange way of passing AppConsumer's toggle func to handleSubmit() */}
                                <form onSubmit={e => this.handleSubmit(e, login)}>
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
                                <div>{errMsg}</div>
                            </div>
                        </PageTemplate>
                    );
                }}
            </AppConsumer>
        );
    }
}

export default LoginPage;
