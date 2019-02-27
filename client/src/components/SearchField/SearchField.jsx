import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class SearchField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textValue: '',
            redirect: false
        } 
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
            return <Redirect to={`/search?type=${this.props.searchType}&q=${this.state.textValue}`}></Redirect>
        }
        return (
            <div>
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