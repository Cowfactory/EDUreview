import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';

class AddProgramPage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            programName: '',
            programTypes: [],
            programLocations: []
        }
        this.programName = this.handleProgramNameChange.bind(this)
        this.programTypes = this.handleProgramTypesChange.bind(this)
        this.programLocations = this.handleProgramLocationsChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleProgramNameChange = function(event) {
        this.setState({
            programName: event.target.value
        })
    }
    handleProgramTypesChange = function(event) {
        this.setState({
            programTypes: event.target.value

        })
    }
    handleProgramLocationsChange = function(event) {
        this.setState({
            programTypes: event.target.value
        })
    }

    handleSubmit = function(event) {
        //AJAX send the form data to our API endpoint on our server
        //POST some data - ie the data in the form
        event.preventDefault();

        fetch('/api/programs', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // .then(res => res.json())
        // .then(response => console.log('Success:', JSON.stringify(response)))
        //.catch(error => console.error('Error:', error));

    }


    render(){
        return (
            <PageTemplate >
                <h1>Add New Program to EDUreview</h1>
                <FormTemplate onSubmit = {this.handleSubmit}>

                </FormTemplate>
            </PageTemplate>
        )
    }
}

export default AddProgramPage;