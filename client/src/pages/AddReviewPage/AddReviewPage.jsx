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

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    handleSubmit = function (event) {
        event.preventDefault();

        let payload = {
            review: this.state.textValue,
            programId: this.props.match.params.id
        };
        if (this.props.user) {
            payload.user = this.props.user._id;
        }
        fetch('/api/reviews/', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                this.setState({ redirect: true });
            })
            .catch(err => {
                console.log(err);
            });
    };

    componentDidMount() {
        // Did we <Link> to this page? ie. the program data is passed via props.location
        if (!this.props.location.program) {
            fetch(`/api/programs/${this.props.match.params.id}`)
                .then(response => response.json())
                .then(review => {
                    this.setState(review)
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            this.setState({ redirect: true })
            // ToDo - Redirect to browse page?
        }
    }

    render() {
        console.log(this.state)
        if (this.state.redirect) return <Redirect to={`/programs/${this.props.match.params.id}`} />;
        return (
            <PageTemplate>
                <h1>Write your review for</h1>
                <p>{this.state.name}</p>
                <FormTemplate onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.textValue} onChange={this.handleChange} />
                    <label>
                        Course Location:
                        <input type="text"
                            value={this.state.location}
                            name="location"
                            onChange={this.handleLocationChange}
                        />
                    </label>
                    <label>
                        Rating
                        <input></input>
                    </label>
                    <label>
                        Enrollment Status:
                        <input></input>
                    </label>
                    <label>
                        Course Location:
                        <input></input>
                    </label>
                    <label>
                        Review Headline:
                        <input></input>
                    </label>
                    <label>
                        What are the most important takeaways from your time in the program?:
                        <input></input>
                    </label>
                    <label>
                        What aspects detracted from, or were missing from the program:
                        <input></input>
                    </label>
                    <label>
                        Advice to future students:
                        <input></input>
                    </label>
                </FormTemplate>
            </PageTemplate>
        );
    }
}

export default withAuth(AddReviewPage);
