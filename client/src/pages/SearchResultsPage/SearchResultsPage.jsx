import React from 'react';
import queryString from 'query-string';
import ProgramSearchResultsEntry from '../../components/ProgramSearchResultsEntry/ProgramSearchResultsEntry';
import InstitutionSearchResultsEntry from '../../components/InstitutionSearchResultsEntry/InstitutionSearchResultsEntry';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import styles from './SearchResultsPage.module.css';
import { Link } from 'react-router-dom'
import { RegionDropdown } from 'react-country-region-selector';

const DEFAULT_SHOW = 10;
const DEFAULT_SKIP = 0;

class SearchResultsPage extends React.Component {
    state = {
        results: [],
        show: DEFAULT_SHOW,
        skip: DEFAULT_SKIP,
        count: 0,
        stateCode: '',
        ascending: 1,
    };

    componentDidMount() {
        this.queryForResults(DEFAULT_SHOW, DEFAULT_SKIP);
    }

    queryForResults = (show, skip, stateCode, ascending) => {
        let { q } = queryString.parse(this.props.location.search);
        let searchType = this.props.location.state.type;
        fetch(`/api/${searchType}/search`, {
            method: 'POST',
            body: JSON.stringify({
                query: q,
                skip: Number(skip),
                show: Number(show),
                stateCode,
                ascending: ascending
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(res => {
                this.setState({
                    results: res.results || [],
                    skip: Number(skip),
                    show: Number(show),
                    count: res.count,
                    stateCode,
                    ascending
                });
            })
    }

    handleShowChange = (e) => {
        this.queryForResults(e.target.value, this.state.skip, this.state.stateCode, this.state.ascending);
    }

    showPreviousPage = (e) => {
        let newSkip;
        if (this.state.skip - this.state.show <= 0) {
            newSkip = 0;
        } else {
            newSkip = Number(this.state.skip) - Number(this.state.show)
        }

        this.queryForResults(this.state.show, newSkip, this.state.stateCode, this.state.ascending);
    }

    showNextPage = (e) => {
        if (this.state.results.length === 0) {
            return; //disable button when there are no more results
        }
        let newSkip = Number(this.state.skip) + Number(this.state.show)
        this.queryForResults(this.state.show, newSkip, this.state.stateCode, this.state.ascending);
    }

    resetControls = (e) => {
        this.queryForResults(DEFAULT_SHOW, DEFAULT_SKIP, this.state.stateCode, this.state.ascending);
    }
    selectstateCode = (e) => {
        this.queryForResults(this.state.show, DEFAULT_SKIP, e, this.state.ascending);
    }
    handleSortChange = (e) => {
        this.queryForResults(this.state.show, this.state.skip, this.state.stateCode, e.target.value);
    }
    render() {
        let resultsList = [];
        let type = this.props.location.state.type;
        let haveResults = this.state.results.length > 0 ? true : false;
        let { q } = queryString.parse(this.props.location.search);

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
                <InstitutionSearchResultsEntry key={key} institution={item} />
            ));
        } else {
            resultsList = <p>No Results Found</p>;
        }

        return <PageTemplate>
            <div className={styles.filter_toolbox}>
                Filter Tools:
                <div>
                    <p>Show Only:
                        <RegionDropdown
                            country={"United States"}
                            value={this.state.stateCode}
                            onChange={this.selectstateCode}
                            valueType="short"
                        />
                    </p>
                </div>
                <div>
                    <p>
                        Sort By Names:
                        <select onChange={this.handleSortChange}>
                            <option value={1}>Ascending</option>
                            <option value={-1}>Descending</option>
                        </select>
                    </p>
                </div>
                <p>Don't see the result you're looking for?</p>
                <Link to="add-institution">Add an institution listing here</Link>
                <Link to="add-program">Add a program listing here</Link>
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
                <p>Querying {this.props.location.state.type} for: "{q}"</p>
                <p>Showing results
                    {` ${this.state.skip + 1} - ${Number(this.state.skip) + Number(this.state.show) + 1}`}
                    {" "}of {this.state.count}
                </p>
                {resultsList} {/* List of Reviews go here */}
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
        </PageTemplate >
    }
}

export default SearchResultsPage;
