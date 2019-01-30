import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import ProgramDetails from '../../components/ProgramDetails/ProgramDetails';

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
                    <ProgramDetails
                        institutionName={item.institutionName}
                        name={item.name}
                        types={item.types}
                        locations={item.locations} >
                    </ProgramDetails>
                ))}
            </PageTemplate>
        )
    }
}

export default BrowseProgramsPage;