import React from 'react';
import queryString from 'query-string';
import SearchResultsPageTemplate from '../../templates/SearchResultsPageTemplate/SearchResultsPageTemplate';

class SearchResultsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
        }
    }
    componentDidMount() {
        // Make sure query string is not malformed - type and query must not be null
        let params = queryString.parse(this.props.location.search)
        let {type, q} = params;
        if(type === undefined || q === undefined) return;

        fetch(`/api/${type}/search?q=${q}`)
        .then(response => response.json())
        .then(results => {
            this.setState({
                results: results
            })
        })
        .catch(err => {
            console.log("An error occured fetching search results")
        })
    }
    render() {
        let resultsList = [];
        if(this.state.results.length > 0) {
            resultsList = this.state.results.map((item, key) => (
                <p key={key}>{item.name}</p>
            ))
        } else {
            resultsList = <p>No Results Found</p>
        }

        return (
            <SearchResultsPageTemplate>
                {resultsList}
            </SearchResultsPageTemplate>
        )
    }
}

export default SearchResultsPage;