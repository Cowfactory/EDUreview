import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import ProgramListEntry from '../../components/ProgramListEntry/ProgramListEntry';
import { Link } from 'react-router-dom';
class InstitutionDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            website: '',
            programs: []
        };
    }

    componentDidMount() {
        fetch(`/api/institutions/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState(data);
            });
    }

    render() {
        return (
            <PageTemplate>
                <h1>{this.state.name}</h1>
                <h3>{this.state.website}</h3>
                <br />
                <Link to="/add-program">Add a Program to this Institution</Link>
                <h2>This Institution's programs:</h2>
                {/* All programs down here */}
                {this.state.programs.map((program, idx) => (
                    <ProgramListEntry
                        key={idx}
                        institutionName={program.institutionName}
                        name={program.name}
                        types={program.types}
                        locations={program.locations}
                        programId={program._id}
                    />
                ))}
                {/*
                {this.state.programs.map( (program, idx) => {
                    return (
                        <div key={idx}>
                            <p>{program.name}</p>
                            { program.locations.map( (location, idx) => <p key={idx}>{location}</p>) }
                            { program.types.map( (type, idx) => <p key={idx}>{type}</p>) }
                        </div>
                    )
                })}
            */}
            </PageTemplate>
        );
    }
}

export default InstitutionDetailsPage;
