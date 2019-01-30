import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';

class BrowseProgramsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            programs: []
        }
        this.setPrograms = this.setPrograms.bind(this)
    }

    setPrograms = function(data) {
        this.setState({ programs: data })
    }

    componentWillMount() {
        fetch('/api/programs')  
        .then(response => response.json())
        .then(data => {
            this.setPrograms(data);
        })
    }

    render() {
        return (
            <PageTemplate >
                <h1>Programs Search Results</h1>
                {this.state.programs.map( (item, idx) => (
                    <div key={idx}>
                        <p>INSTITUTION: {item.institutionName}</p>
                        <p>NAME: {item.name}</p>
                        <p>TYPES: {item.types}</p>
                        <p>LOCATIONS: {item.locations}</p>
                    </div>
                ))}
            </PageTemplate>
        )
    }
}

export default BrowseProgramsPage;