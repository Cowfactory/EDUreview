import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import ProgramListEntry from '../../components/ProgramListEntry/ProgramListEntry';
import { Link } from 'react-router-dom';
class InstitutionDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            cities: [],
            state: '',
            telephone: '',
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
                <a href={`https://${this.state.website}`} target="_blank" rel="noopener noreferrer">{this.state.website}</a>

                {this.state.address ?
                    <div>{this.state.address}</div>
                    :
                    <></>
                }
                {this.state.state ?
                    <p>State: {this.state.state}</p>
                    :
                    <></>
                }
                {this.state.cities ?
                    <div>{this.state.cities}</div>
                    :
                    <></>
                }
                {this.state.telephone ?
                    <p>{this.state.telephone}</p>
                    :
                    <></>
                }

                <h2>This Institution's programs:</h2>
                <Link
                    to={{
                        pathname: '/add-program',
                        state: { institutionId: this.state._id, name: this.state.name }
                    }}
                >
                    Add a Program to this Institution
                </Link>
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
            </PageTemplate>
        );
    }
}

export default InstitutionDetailsPage;
