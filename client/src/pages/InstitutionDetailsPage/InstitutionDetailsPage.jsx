import React from "react";
import PageTemplate from "../../templates/PageTemplate/PageTemplate";
import ProgramListEntry from "../../components/ProgramListEntry/ProgramListEntry";
import { Link } from "react-router-dom";
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';

class InstitutionDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            cities: [],
            state: "",
            telephone: "",
            website: "",
            programs: []
        };
    }

    componentDidMount() {
        fetch(`/api/institutions/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => {
                document.title = `${data.name} - EDUreview`;
                this.setState(data);
            });
    }

    render() {
        return (
            <PageTemplate>
                <BreadCrumb>
                    <Link to="/">Home</Link>
                    Search
                    {this.state.name}
                </BreadCrumb>
                <h1>{this.state.name}</h1>
                <a
                    href={`https://${this.state.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {this.state.website}
                </a>

                {this.state.address ? <div>{this.state.address}</div> : <></>}
                {this.state.state ? <p>State: {this.state.state}</p> : <></>}
                {this.state.cities ? <div>{this.state.cities}</div> : <></>}
                {this.state.telephone ? <p>{this.state.telephone}</p> : <></>}
                <Link
                    to={{
                        pathname: "/add-program",
                        state: { institutionId: this.state._id, name: this.state.name }
                    }}
                >
                    Add a Program to this Institution
                </Link>
                <hr />
                <h2>This Institution's programs:</h2>

                {this.state.programs.map((program, idx) => (
                    <ProgramListEntry
                        key={idx}
                        name={program.name}
                        institutionName={this.state.name}
                        institutionId={this.state._id}
                        types={program.types}
                        programId={program._id}
                    />
                ))}
            </PageTemplate>
        );
    }
}

export default InstitutionDetailsPage;
