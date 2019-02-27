import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import queryString from 'query-string';

class SearchResultsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
        }
    }
    componentDidMount() {
        console.log("component did mount - Search results page")
        // Make sure query string is not malformed - type and query must not be null
        let params = queryString.parse(this.props.location.search)
        let {type, q} = params;

        console.log(type, q);
        if(type === undefined || q === undefined) return;

        console.log("before fetch")

        fetch(`/api/${type}/search?q=${q}`)
        .then(response => response.json())
        .then(results => {
            this.setState({
                results: results
            })
        })
        .then(() => {
            console.log("state has been set.")
        })
    }
    render() {
        return (
            <PageTemplate>
                asdfaa
            </PageTemplate>
        )
    }
}

export default SearchResultsPage;