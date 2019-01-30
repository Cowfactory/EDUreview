import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';

class BrowseInstitutionsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            institutions: []
        }
        this.setInstitutions = this.setInstitutions.bind(this)
    }

    setInstitutions = function(data) {
        this.setState({ institutions: data })
    }

    componentWillMount() {
        fetch('/api/institutions')  
        .then(response => response.json())
        .then(data => {
            this.setInstitutions(data);
        })
    }

    render() {
        return (
            <PageTemplate >
                <h1>Institution Search Results</h1>
                <Link to="/add-institution">Add an Institution</Link>
                {this.state.institutions.map( (item, idx) => (
                    <div key={idx}>
                        <p>NAME: {item.name}</p>
                        <p>WEBSITE: {item.website}</p>
                    </div>
                ))}
            </PageTemplate>
        )
    }
}

export default BrowseInstitutionsPage;