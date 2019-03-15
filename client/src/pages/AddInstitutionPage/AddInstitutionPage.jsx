import React from 'react';
import {
    Link,
    Redirect
} from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';

class AddInstitutionPage extends React.Component {
    state = {
        name: '',
        address: '',
        city: '',
        cities: [],
        state: '',
        telephone: '',
        websiteURL: '',
        redirect: false
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value })
    }
    handleAddressChange = (e) => {
        this.setState({ address: e.target.value })
    }
    handleCityChange = (e) => {
        this.setState({ city: e.target.value })
    }
    handleStateChange = (e) => {
        this.setState({ state: e.target.value })
    }
    handleTelephoneChange = (e) => {
        this.setState({ telephone: e.target.value })
    }
    handleURLChange = (e) => {
        this.setState({ websiteURL: e.target.value })
    }
    addCity = (e) => {
        this.setState(({ cities }) => {
            this.setState(cities.push(e.target.value))
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/institutions', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                address: this.state.address,
                city: this.state.city,
                telephone: this.state.telephone,
                website: this.state.websiteURL,
                skip: 0
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(_ => {
                this.setState({
                    redirect: true
                })
            })
    }

    render() {
        if (this.state.redirect) return <Redirect to="/institutions"></Redirect>
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
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleAddressChange} >
                        </input>
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            name="city"
                            value={this.state.city}
                            onChange={this.handleCityChange} >
                            {/* // onSubmit={this.addCity}>  */}
                        </input>
                    </label>
                    <label>
                        State:
                        <input
                            type="text"
                            name="city"
                            value={this.state.state}
                            onChange={this.handleStateChange}>
                        </input>
                    </label>
                    <label>
                        Telephone:
                        <input
                            type="text"
                            name="telephone"
                            value={this.state.telephone}
                            onChange={this.handleTelephoneChange} >
                        </input>
                    </label>
                    <label>
                        Website:
                        <input
                            type="url"
                            name="website"
                            placeholder="https://example.com"
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