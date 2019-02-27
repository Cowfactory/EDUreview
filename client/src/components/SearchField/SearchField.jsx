import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

// This Program Selector const helps with being consistent w/ the state management of 
// the dropdown selector for the serach box
const SEARCH_TYPE = ['programs', 'institutions'];
const PROGRAM = 0;
const INSTITUTION = 1;

class SearchField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textValue: '',
            redirect: false,
            programSelector: SEARCH_TYPE[PROGRAM]
        } 
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectionChange = this.handleSelectionChange.bind(this)
    }

    handleSelectionChange(e) {
        this.setState({
            programSelector: e.target.value
        })
    }

    handleChange(e) {
        this.setState({
            textValue: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({
            redirect: true
        })
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={`/search?type=${this.state.programSelector}&q=${this.state.textValue}`}></Redirect>
        }
        return (
            <div>
                <select value={this.state.programSelector} onChange={this.handleSelectionChange} >
                    <option value={SEARCH_TYPE[PROGRAM]}>Program</option>
                    <option value={SEARCH_TYPE[INSTITUTION]}>Institution</option>
                </select>
                <form onSubmit={this.handleSubmit} >
                    <input 
                        value={this.state.textValue} 
                        onChange={this.handleChange}
                        type="text" 
                        name="search">
                    </input>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }

}

export default SearchField;