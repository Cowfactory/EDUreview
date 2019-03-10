import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import ProgramListEntry from '../../components/ProgramListEntry/ProgramListEntry';

class BrowseProgramsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            programs: []
        };
        this.setPrograms = this.setPrograms.bind(this);
    }

    setPrograms = function(data) {
        this.setState({ programs: data });
    };

    componentDidMount() {
        fetch('/api/programs')
            .then(response => response.json())
            .then(data => {
                this.setPrograms(data);
            });
    }

    render() {
        return (
            <PageTemplate>
                <h1>Programs Search Results</h1>
                <Link to="/add-program">Add a Program</Link>
                {this.state.programs.map((item, idx) => (
                    <ProgramListEntry
                        key={idx}
                        institutionName={item.institutionName}
                        name={item.name}
                        types={item.types}
                        locations={item.locations}
                        programId={item._id}
                    />
                ))}
            </PageTemplate>
        );
    }
}

export default BrowseProgramsPage;
