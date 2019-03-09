import React from 'react';
import AuthTokenService from '../../services/AuthTokenService';

/**
 * Higher Order Component that represents an Auth protected component
 * @param {React.Component} WrappedComponent
 */
function withAuth(WrappedComponent, user) {
    return class WithAuth extends React.Component {
        state = {
            user: null
        };

        jwtService = new AuthTokenService();

        componentWillMount() {
            if (this.jwtService.loggedIn()) {
                this.setState({
                    user: this.jwtService.getProfile()
                });
            }
        }

        render() {
            return (
                <WrappedComponent
                    user={this.state.user}
                    updateUserState={this.updateUserState}
                    {...this.props}
                />
            );
        }
    };
}

export default withAuth;
