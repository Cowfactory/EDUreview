import React from 'react';
import queryString from 'query-string';
import ProgramSearchResultsEntry from '../../components/ProgramSearchResultsEntry/ProgramSearchResultsEntry';
import InstitutionSearchResultsEntry from '../../components/InstitutionSearchResultsEntry/InstitutionSearchResultsEntry';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import styles from './SearchResultsPage.module.css';
import { Link } from 'react-router-dom'

class SearchResultsPage extends React.Component {
    state = {
        results: [],
        show: 10,
        skip: 0
    };

    componentDidMount() {
        this.queryForResults(10, 0);
    }

    queryForResults = (show, skip) => {
        let { q } = queryString.parse(this.props.location.search);
        let searchType = this.props.location.state.type;
        fetch(`/api/${searchType}/search`, {
            method: 'POST',
            body: JSON.stringify({
                query: q,
                skip: Number(skip),
                show: Number(show)
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(results => {
                this.setState({
                    results: results,
                    skip: Number(skip),
                    show: Number(show)
                });
            })
    }

    handleShowChange = (e) => {
        this.queryForResults(e.target.value, this.state.skip);
    }

    showPreviousPage = (e) => {
        let newSkip;
        if (this.state.skip - this.state.show <= 0) {
            newSkip = 0;
        } else {
            newSkip = Number(this.state.skip) - Number(this.state.show)
        }

        this.queryForResults(this.state.show, newSkip);
    }

    showNextPage = (e) => {
        let newSkip = Number(this.state.skip) + Number(this.state.show)
        this.queryForResults(this.state.show, newSkip);
    }

    render() {
        let resultsList = [];
        let type = this.props.location.state.type;
        let haveResults = this.state.results.length > 0 ? true : false;

        if (type === 'programs' && haveResults) {
            resultsList = this.state.results.map((item, key) => (
                <ProgramSearchResultsEntry
                    key={key}
                    name={item.name}
                    id={item._id}
                    types={item.types}
                />
            ));
        } else if (type === 'institutions' && haveResults) {
            resultsList = this.state.results.map((item, key) => (
                <InstitutionSearchResultsEntry key={key} name={item.name} id={item._id} />
            ));
        } else {
            resultsList = <p>No Results Found</p>;
        }

        return <PageTemplate>
            <div className={styles.filter_toolbox}>
                Filter Tools:
                <p>Show only: X, Y, Z [Search]</p>
                <p>Don't see the result you're looking for?</p>
                <Link to="add-institution">Add an institution listing here:</Link>
                <Link to="add-program">Add a program listing here:</Link>
            </div>
            <div className={styles.page_tools}>
                <div>
                    Num Results:
                    <select value={this.state.show} onChange={this.handleShowChange}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <div>
                    <span className={`${styles.page_nav} ${"noselect"}`} onClick={this.showPreviousPage}>{`< Previous ${this.state.show}`}</span>
                    <span className={`${styles.page_nav} ${"noselect"}`} onClick={this.showNextPage}>{`Next ${this.state.show} >`}</span>
                    <span className={`${styles.page_nav} ${"noselect"}`} onClick={this.resetControls}>Reset</span>
                </div>
            </div>
            <div className={styles.reviews}>
                <p>Showing results {`${this.state.skip + 1} - ${Number(this.state.skip) + Number(this.state.show) + 1}`}</p>
                {resultsList} {/* List of Reviews go here */}
            </div>
        </PageTemplate >
    }
}

export default SearchResultsPage;
