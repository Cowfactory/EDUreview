import React from 'react';
import { 
    Link,
    Redirect
} from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';

class AddInstitutionPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            websiteURL: '',
            redirect: false
        }
        this.handleURLChange = this.handleURLChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleURLChange = (evt) => {
        this.setState({
            websiteURL: evt.target.value
        })
    }

    handleNameChange = (evt) => {
        this.setState({
            name: evt.target.value
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        fetch('/api/institutions', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                websiteURL: this.state.websiteURL
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( _ => {
            this.setState({
                redirect: true
            })
        })
    }

    render() {
        const redirect = this.state.redirect;
        if(redirect) return <Redirect to="/institutions"></Redirect>
        return (
            <PageTemplate>
                <h1>Add New Institution to EDUreview</h1>
                <Link to="/institutions">Browse all institutions</Link>
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