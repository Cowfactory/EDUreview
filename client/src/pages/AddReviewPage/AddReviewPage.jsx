import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import withAuth from '../../components/withAuth/withAuth';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';

class AddReviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            textValue: 'this is the initial text'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = function(event) {
        this.setState({
            textValue: event.target.value
        });
    };
    handleSubmit = function(event) {
        event.preventDefault();
        console.log('Click!');

        let payload = {
            review: this.state.textValue
        };
        if (this.props.user) {
            payload.userId = this.props.user._id;
        }
        console.log(`before fetch to /api/programs/${this.props.match.params.id}/reviews`);
        fetch(`/api/programs/${this.props.match.params.id}/reviews`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(_ => {
                console.log(_);
                console.log('setting state');
                this.setState({ redirect: true });
            })
            .catch(err => {
                console.log('failure');
                console.log(err);
            });
    };

    render() {
        if (this.state.redirect) return <Redirect to={`/programs/${this.props.match.params.id}`} />;
        return (
            <PageTemplate>
                <h1>Write your review</h1>
                <FormTemplate onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.textValue} onChange={this.handleChange} />
                </FormTemplate>
            </PageTemplate>
        );
    }
}

export default withAuth(AddReviewPage);
