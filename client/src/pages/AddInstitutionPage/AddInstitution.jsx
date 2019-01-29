import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';

class AddInstitutionPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            websiteURL: ''
        }
        this.handleURLChange = this.handleURLChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleURLChange = (evt) => {
        this.changeState({
            websiteURL: evt.target.value
        })
    }

    handleNameChange = (evt) => {
        this.changeState({
            name: evt.target.value
        })
    }

    handleSubmit = (evt) => {
        //
    }

    render() {
        return (
            <PageTemplate>
                <h1>Add New Institution to EDUreview</h1>
                <FormTemplate onSubmit={this.handleSubmit}>
                    <label>
                        Institution Name:
                        <input 
                            type="text"
                            name="name" 
                            value={this.state.name}
                            onChange={this.handleNameChange} >
                        </input>
                    </label>
                    <label>
                        Website:
                        <input 
                            type="text"
                            name="website" 
                            value={this.state.websiteURL} 
                            onChange={this.handleURLChange} >
                        </input>
                    </label>
                </FormTemplate>
            </PageTemplate>
        )
    }
}

export default AddInstitutionPage;