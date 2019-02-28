import React from "react";
import queryString from "query-string";
import SearchResultsPageTemplate from "../../templates/SearchResultsPageTemplate/SearchResultsPageTemplate";
import ProgramSearchResultsEntry from "../../components/ProgramSearchResultsEntry/ProgramSearchResultsEntry";
import InstitutionSearchResultsEntry from "../../components/InstitutionSearchResultsEntry/InstitutionSearchResultsEntry";

class SearchResultsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
    }
    componentDidMount() {
        // Parse the query from the querystring
        let { q } = queryString.parse(this.props.location.search);
        let searchType = this.props.location.state.type;

        fetch(`/api/${searchType}/search?q=${q}`)
            .then(response => response.json())
            .then(results => {
                this.setState({
                    results: results
                });
            })
            .catch(err => {
                console.log(
                    "An error occured fetching search results",
                    "\n",
                    err
                );
            });
    }
    render() {
        let resultsList = [];
        let type = this.props.location.state.type;

        if (this.state.results.length > 0) {
            if (type === "programs") {
                resultsList = this.state.results.map((item, key) => (
                    <ProgramSearchResultsEntry
                        key={key}
                        name={item.name}
                        id={item._id}
                        types={item.types}
                    />
                ));
            } else if (type === "institutions") {
                resultsList = this.state.results.map((item, key) => (
                    <InstitutionSearchResultsEntry
                        key={key}
                        name={item.name}
                        id={item._id}
                    />
                ));
            }
        } else {
            resultsList = <p>No Results Found</p>;
        }
        return (
            <SearchResultsPageTemplate>{resultsList}</SearchResultsPageTemplate>
        );
    }
}

export default SearchResultsPage;
