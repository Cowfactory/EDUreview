import React from 'react';

/**
 * Higher Order Component that represents an Auth protected component
 * @param {React.Component} WrappedComponent
 */
function withAuth(WrappedComponent, user) {
    return class AuthWrapper extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                user
            };
        }

        componentWillMount() {
            console.log(this.state.user);
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
        }
    };
}

export default withAuth;
