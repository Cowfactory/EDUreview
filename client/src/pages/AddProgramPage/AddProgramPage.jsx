import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';

class AddProgramPage extends React.Component {
    state = {
        institutionsList: [],
        selectedInstitutionId: '',
        programName: '',
        programTypes: [],
        programLocations: [],
        redirect: false,
        dropDownDisabled: false
    };

    handleSelectedInstitutionIdChange = e => {
        this.setState({ selectedInstitutionId: e.target.value });
    };
    handleProgramInstitutionNameChange = e => {
        this.setState({ programInstitutionName: e.target.value });
    };
    handleProgramNameChange = e => {
        this.setState({ programName: e.target.value });
    };
    handleProgramTypesChange = e => {
        this.setState({ programTypes: e.target.value });
    };
    handleProgramLocationsChange = e => {
        this.setState({ programLocations: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

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
        }).then(() => {
            this.setState({ redirect: true });
        });
    };

    componentDidMount() {

    }

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
                            disabled={this.state.dropDownDisabled}
                        >
                            {this.state.institutionsList.map((inst, idx) => (
                                <option key={idx} value={inst.id}>
                                    {inst.name}
                                </option>
                            ))}
                            ;
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
