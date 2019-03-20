import React from 'react';
import queryString from 'query-string';
import ProgramSearchResultsEntry from './ProgramSearchResultsEntry/ProgramSearchResultsEntry';
import InstitutionSearchResultsEntry from './InstitutionSearchResultsEntry/InstitutionSearchResultsEntry';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import { Link, Redirect } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import ListGroup from 'react-bootstrap/ListGroup';
import FilterTools from './FilterTools/FilterTools';
import NavigationTools from './NavigationTools/NavigationTools';

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
        redirect: false,
        type: 'programs',
        query: ''
    };

    componentDidMount() {
        document.title = 'Search Results - EDUreview';

        let type, query;
        try {
            type = this.props.location.state.type;
            let { q } = queryString.parse(this.props.location.search);
            query = q;
        } catch {
            return;
        }
        this.setState({ type, query }, () => {
            this.queryForResults(DEFAULT_SHOW, DEFAULT_SKIP);
        });
    }

    queryForResults = (show, skip, stateCode, ascending) => {
        let { type, query } = this.state;
        fetch(`/api/${type}/search`, {
            method: 'POST',
            body: JSON.stringify({
                query: query,
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
                    institution: res.institution || [],
                    skip: Number(skip),
                    show: Number(show),
                    count: res.count,
                    stateCode,
                    ascending
                });
            });
    };

    handleShowChange = e => {
        this.queryForResults(
            e.target.value,
            this.state.skip,
            this.state.stateCode,
            this.state.ascending
        );
    };

    showPreviousPage = e => {
        let newSkip;
        if (this.state.skip - this.state.show <= 0) {
            newSkip = 0;
        } else {
            newSkip = Number(this.state.skip) - Number(this.state.show);
        }

        this.queryForResults(this.state.show, newSkip, this.state.stateCode, this.state.ascending);
    };

    showNextPage = e => {
        if (this.state.results.length === 0) {
            return; //disable button when there are no more results
        }
        let newSkip = Number(this.state.skip) + Number(this.state.show);
        this.queryForResults(this.state.show, newSkip, this.state.stateCode, this.state.ascending);
    };

    resetControls = e => {
        this.queryForResults(
            DEFAULT_SHOW,
            DEFAULT_SKIP,
            this.state.stateCode,
            this.state.ascending
        );
    };
    selectstateCode = e => {
        this.queryForResults(this.state.show, DEFAULT_SKIP, e, this.state.ascending);
    };
    handleSortChange = e => {
        this.queryForResults(
            this.state.show,
            this.state.skip,
            this.state.stateCode,
            e.target.value
        );
    };
    render() {
        if (this.state.redirect) return <Redirect to="/" />;
        let { type, query } = this.state;

        let haveResults = this.state.results.length > 0 ? true : false;
        let resultsList = [];

        if (type === 'programs' && haveResults) {
            resultsList = this.state.results.map((program, key) => (
                <ProgramSearchResultsEntry
                    key={key}
                    idx={key}
                    program={program}
                    institution={this.state.institution}
                />
            ));
        } else if (type === 'institutions' && haveResults) {
            resultsList = this.state.results.map((institution, key) => (
                <InstitutionSearchResultsEntry
                    key={key}
                    idx={key}
                    institution={institution}
                />
            ));
        } else {
            resultsList = <p>No Results Found</p>;
        }

        return (
            <PageTemplate>
                <BreadCrumb>
                    <Link to="/">Home</Link>
                    Search
                </BreadCrumb>

                <FilterTools
                    stateCode={this.state.stateCode}
                    selectstateCode={this.selectstateCode}
                    handleSortChange={this.handleSortChange}
                    type={this.state.type}
                />

                <NavigationTools
                    handleShowChange={this.handleShowChange}
                    showPreviousPage={this.showPreviousPage}
                    showNextPage={this.showNextPage}
                    resetControls={this.resetControls}
                    show={this.state.show}
                    skip={this.state.skip}
                />

                <ListGroup>
                    <ListGroup.Item >
                        <div >
                            <p>
                                Querying {this.state.type} for: "{query}"
                            </p>
                            <p>
                                Showing results
                                {` ${this.state.skip + 1} - ${Number(this.state.skip) + Number(this.state.show) + 1}`}
                                &nbsp; of {this.state.count}
                            </p>
                            {resultsList}
                        </div>
                    </ListGroup.Item>
                </ListGroup>

                <NavigationTools
                    handleShowChange={this.handleShowChange}
                    showPreviousPage={this.showPreviousPage}
                    showNextPage={this.showNextPage}
                    resetControls={this.resetControls}
                    show={this.state.show}
                />
            </PageTemplate >
        );
    }
}

export default SearchResultsPage;
