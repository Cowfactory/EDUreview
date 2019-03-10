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

        let payload = {
            review: this.state.textValue
        };
        if (this.props.user) {
            payload.user = this.props.user._id;
        }

        fetch(`/api/programs/${this.props.match.params.id}/reviews`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            this.setState({ redirect: true });
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
