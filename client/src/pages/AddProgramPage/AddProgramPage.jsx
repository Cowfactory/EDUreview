import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';

class AddProgramPage extends React.Component {
    state = {
        institutionId: '',
        programName: '',
        programTypes: [],
        programLocations: [],
        redirect: false,
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        fetch('/api/programs', {
            method: 'POST',
            body: JSON.stringify({
                institutionId: this.state.institutionId,
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
        document.title = "Add Program - EDUreview";
        const { institutionId, name } = this.props.location.state;

        if (institutionId == null) {
            this.setState({ redirect: true });
        }
        else {
            this.setState({
                institutionId,
                institutionName: name
            })
        }

    }

    render() {
        const redirect = this.state.redirect;
        if (redirect) return <Redirect to="/" />;
        return (
            <PageTemplate>
                <h1>Add New Program to EDUreview</h1>
                <Link to="/programs">Browse all programs</Link>
                <FormTemplate onSubmit={this.handleSubmit}>
                    <label>
                        Institution:
                        <select
                            value={this.state.institutionName}
                            onChange={this.handleChange}
                            disabled={true}
                        >
                            <option value={this.state.institutionName}> {this.state.institutionName}</option>
                        </select>
                    </label>

                    <label>
                        Program Name:
                        <input
                            type="text"
                            name="programName"
                            value={this.state.programName}
                            onChange={this.handleChange}
                        />
                    </label>

                    <label>
                        Program Types:
                        <input
                            type="text"
                            name="programTypes"
                            value={this.state.programTypes}
                            onChange={this.handleChange}
                        />
                    </label>

                    <label>
                        Program Locations:
                        <input
                            type="text"
                            name="programLocations"
                            value={this.state.programLocations}
                            onChange={this.handleChange}
                        />
                    </label>
                </FormTemplate>
            </PageTemplate>
        );
    }
}

export default AddProgramPage;
