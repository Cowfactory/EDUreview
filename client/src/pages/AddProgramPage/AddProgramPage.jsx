import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';

class AddProgramPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            institutionsList: [],
            selectedInstitutionId: '',
            programName: '',
            programTypes: [],
            programLocations: [],
            redirect: false,
            dropDownDisabled: false,
        };
        this.handleProgramInstitutionNameChange = this.handleProgramInstitutionNameChange.bind(
            this
        );
        this.handleSelectedInstitutionIdChange = this.handleSelectedInstitutionIdChange.bind(this);
        this.handleProgramNameChange = this.handleProgramNameChange.bind(this);
        this.handleProgramTypesChange = this.handleProgramTypesChange.bind(this);
        this.handleProgramLocationsChange = this.handleProgramLocationsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        
        var IID, IName;  //Institution ID/Name if routed from Institution Details page 
        try { 
            IID = this.props.location.state.IID; 
            IName = this.props.location.state.Name;
        }
        catch{ 
            IID = undefined; 
            IName = undefined;
        }

        fetch('/api/institutions')
            .then(response => response.json())
            .then(data => {
                let reducedArr = data.map(item => {
                    return {
                        id: item._id,
                        name: item.name
                    };
                });
                if (IID && IName){
                    this.setState({
                        institutionsList: reducedArr,
                        selectedInstitutionId: IID,
                        programInstitutionName: IName,
                        dropDownDisabled: true
                    });
                }
                else{
                    this.setState({
                        institutionsList: reducedArr,
                        selectedInstitutionId: reducedArr[0].id
                    });
                }
            });
    }

    handleSelectedInstitutionIdChange = function(event) {
        this.setState({
            selectedInstitutionId: event.target.value
        });
    };

    handleProgramInstitutionNameChange = function(event) {
        this.setState({
            programInstitutionName: event.target.value
        });
    };

    handleProgramNameChange = function(event) {
        this.setState({
            programName: event.target.value
        });
    };
    handleProgramTypesChange = function(event) {
        this.setState({
            programTypes: event.target.value
        });
    };
    handleProgramLocationsChange = function(event) {
        this.setState({
            programLocations: event.target.value
        });
    };

    handleSubmit = function(event) {
        //AJAX send the form data to our API endpoint on our server
        //POST some data - ie the data in the form
        event.preventDefault();

        fetch('/api/programs', {
            method: 'POST',
            body: JSON.stringify({
                selectedInstitutionId: this.state.selectedInstitutionId,
                programName: this.state.programName,
                programTypes: this.state.programTypes,
                programLocations: this.state.programLocations
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(_ => {
            this.setState({
                redirect: true
            });
        });
        // .then(res => res.json())
        // .then(response => console.log('Success:', JSON.stringify(response)))
        //.catch(error => console.error('Error:', error));
    };

    render() {
        const redirect = this.state.redirect;
        if (redirect) return <Redirect to="/programs" />;
        return (
            <PageTemplate>
                <h1>Add New Program to EDUreview</h1>
                <Link to="/programs">Browse all programs</Link>
                <FormTemplate onSubmit={this.handleSubmit}>
                    <label>
                        Institution:
                        <select
                            value={this.state.selectedInstitutionId}
                            onChange={this.handleSelectedInstitutionIdChange}
                            disabled={this.state.dropDownDisabled}>
                            {this.state.institutionsList.map((inst, idx) => (
                                <option key={idx} value={inst.id}>
                                    {inst.name}
                                </option>
                            ))};
                        </select>
                    </label>

                    <label>
                        Program Name:
                        <input
                            type="text"
                            name="programName"
                            value={this.state.programName}
                            onChange={this.handleProgramNameChange}
                        />
                    </label>

                    <label>
                        Program Types:
                        <input
                            type="text"
                            name="programTypes"
                            value={this.state.programTypes}
                            onChange={this.handleProgramTypesChange}
                        />
                    </label>

                    <label>
                        Program Locations:
                        <input
                            type="text"
                            name="programLocations"
                            value={this.state.programLocations}
                            onChange={this.handleProgramLocationsChange}
                        />
                    </label>
                </FormTemplate>
            </PageTemplate>
        );
    }
}

export default AddProgramPage;
