import React from 'react';
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