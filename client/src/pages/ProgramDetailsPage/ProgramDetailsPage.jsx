import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';

class ProgramDetailsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            institutionName: '',
            types: [],
            locations: []
        }
    }

    componentDidMount() {
        fetch(`/api/programs/${this.props.match.params.id}`)
        .then(response => response.json())
        .then(data => {
            this.setState(data);
        })
    }

    render() {
        return (
            <PageTemplate>
                <h1>These are the program details for:</h1>
                <h2>{ this.state.name }</h2>
                <p>{ this.state.institutionName }</p>
                <p>{ this.state.types }</p>
                <p>{ this.state.locations }</p>
                {/* All reviews down here */}
            </PageTemplate>
        )
    }
}

export default ProgramDetailsPage;