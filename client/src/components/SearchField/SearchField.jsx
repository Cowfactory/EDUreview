import React, { Component } from 'react';

class SearchField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textValue: ''
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
        this.props.handleSubmit(e, this.state.textValue)
    }

    render() {
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