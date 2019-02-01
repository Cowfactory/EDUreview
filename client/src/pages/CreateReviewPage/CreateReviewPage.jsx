import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';

class CreateReviewPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            textValue: "this is the initial text"
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = function(event) {
        this.setState({
            textValue: event.target.value
        })
    }
    handleSubmit = function(event) {
        event.preventDefault();
        
        let payload = {
            // programId: this.props.match.params.id,
            userId: null, //ToDo: implement user ID ref,
            review: this.state.textValue
        }

        fetch(`/api/programs/${this.props.match.params.id}/reviews`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( _ => {
            this.setState({ redirect: true });
        })

        // .then(res => res.json())
        // .then(response => console.log('Success:', JSON.stringify(response)))
        //.catch(error => console.error('Error:', error));

    }

    render() {
        if(this.state.redirect) return <Redirect to={`/programs/${this.props.match.params.id}`}></Redirect>
        return (
            <PageTemplate>
                <h1>This is page</h1>
                <FormTemplate onSubmit={this.handleSubmit}>
                    <input type="text" 
                        value={this.state.textValue}
                        onChange={this.handleChange} >
                    </input>
                </FormTemplate>
            </PageTemplate>
        )
    }
}

export default CreateReviewPage;