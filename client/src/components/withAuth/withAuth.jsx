import React from 'react';
import AuthService from '../../services/AuthTokenService';

/**
 * Higher Order Component that represents an Auth protected component
 * @param {*} WrappedComponent 
 */
function withAuth(WrappedComponent) {
    const Auth = new AuthService();

    return class AuthWrapper extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                user: null
            };
            this.updateUserState = this.updateUserState.bind(this);
            this.login = this.login.bind(this);
            this.logout = this.logout.bind(this);
        }

        componentWillMount() {
            // if (!Auth.loggedIn()) {
            //     console.log(this.props);
            //     // this.props.history.replace('/login');
            // } else {
            //     try {
            //         const profile = Auth.getProfile();
            //         this.setState({
            //             user: profile
            //         });
            //     } catch (err) {
            //         Auth.logout();
            //         this.props.history.replace('/login');
            //     }
            // }
            // if (!Auth.loggedIn()) {
            //     this.props.history.replace('/login');
            // }
        }
        login() {
            Auth.login();
            const profile = Auth.getProfile();
            this.setState({
                user: profile
            });
        }
        logout() {
            Auth.logout();
            this.setState({
                user: null
            });
            this.props.history.replace('/');
        }
        updateUserState() {}

        render() {
            // if (this.state.user) {
            return (
                <WrappedComponent
                    history={this.props.history}
                    user={this.state.user}
                    updateUserState={this.updateUserState}
                    login={this.login}
                    logout={this.logout}
                    {...this.props}
                />
            );
            // } else {
            //     return null;
            // }
        }
    };
}

export default withAuth;
