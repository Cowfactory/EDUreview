import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import InstitutionDetails from '../../components/InstitutionDetails/InstitutionDetails';
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

    componentDidMount() {
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
                    <InstitutionDetails 
                        key={idx} 
                        name={item.name} 
                        website={item.website}
                        institutionId={item._id}> 
                    </InstitutionDetails>
                ))}
            </PageTemplate>
        )
    }
}

export default BrowseInstitutionsPage;