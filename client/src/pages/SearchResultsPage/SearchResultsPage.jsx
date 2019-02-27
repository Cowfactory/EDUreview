import React from 'react'
import PageTemplate from '../../templates/PageTemplate/PageTemplate';

class SearchResultsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
        }
    }
    componentDidMount() {
        if(this.props.location.search){
            fetch(`/api/${this.state.programSelector}?search=${this.props.location.search}`)
            .then( results => {
                this.setState({
                    results: results
                })
            })
        }
    }
    render() {
        return (
            <PageTemplate>
                asdf
            </PageTemplate>
        )
    }
}

export default SearchResultsPage;