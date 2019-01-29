import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';

class AddProgramPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            programInstitutionName: '',
            programName: '',
            programTypes: [],
            programLocations: []
        }
        this.handleProgramInstitutionNameChange = this.handleProgramInstitutionNameChange.bind(this)
        this.handleProgramNameChange = this.handleProgramNameChange.bind(this)
        this.handleProgramTypesChange = this.handleProgramTypesChange.bind(this)
        this.handleProgramLocationsChange = this.handleProgramLocationsChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleProgramInstitutionNameChange = function(event) {
        this.setState({
            programInstitutionName: event.target.value
        })
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
            programLocations: event.target.value
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
                <label>
                    Institution Name:
                    <input 
                        type="text"
                        name="institutionName" 
                        value={this.state.programInstitutionName}
                        onChange={this.handleProgramInstitutionNameChange} >
                    </input>
                </label>

                <label>
                    Program Name:
                    <input 
                        type="text"
                        name="programName" 
                        value={this.state.programName}
                        onChange={this.handleProgramNameChange} >
                    </input>
                </label>

                <label>
                    Program Types:
                    <input 
                        type="text"
                        name="programTypes" 
                        value={this.state.programTypes}
                        onChange={this.handleProgramTypesChange} >
                    </input>
                </label>

                <label>
                    Program Locations:
                    <input 
                        type="text"
                        name="programLocations" 
                        value={this.state.programLocations}
                        onChange={this.handleProgramLocationsChange} >
                    </input>
                </label>
                </FormTemplate>
            </PageTemplate>
        )
    }
}

export default AddProgramPage;