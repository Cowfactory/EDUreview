import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ProgramInstitutionSelector from '../ProgramInsitutionSelector/ProgramInstitutionSelector';
import Button from 'react-bootstrap/Button'

const SEARCH_TYPE = ['programs', 'institutions'];
const PROGRAM = 0;
const INSTITUTION = 1;

class SearchField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: '',
            redirect: false,
            programSelector: SEARCH_TYPE[PROGRAM]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
    }

    handleSelectionChange(e) {
        this.setState({
            programSelector: e.target.value
        });
    }

    handleChange(e) {
        this.setState({
            textValue: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            redirect: true
        });
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect
                    to={{
                        pathname: '/search',
                        search: `?q=${this.state.textValue}`,
                        state: { type: this.state.programSelector }
                    }}
                />
            );
        }
        return (
            <div>
                <h3>
                    Find me a &nbsp;
                    <ProgramInstitutionSelector
                        programSelector={this.state.programSelector}
                        handleSelectionChange={this.handleSelectionChange}
                    />
                    <br /> <br />
                    <span>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                value={this.state.textValue}
                                onChange={this.handleChange}
                                type="text"
                                name="search"
                            />
                            &nbsp;
                            <Button onClick={this.handleSubmit}>Submit</Button>
                        </form>
                    </span>
                </h3>

            </div>
        );
    }
}

export default SearchField;
