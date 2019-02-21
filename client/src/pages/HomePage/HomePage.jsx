import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import SearchField from '../../components/SearchField/SearchField';

const SEARCH_TYPE = ['programs', 'institutions'];
const PROGRAM = 0;
const INSTITUTION = 1;

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            programSelector: SEARCH_TYPE[PROGRAM]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (evt) => {
        this.setState({
            programSelector: evt.target.value
        })
    }
   
    handleSubmit = (e, searchValue) => {
        e.preventDefault()
        //e.target.value is the searchbox text
        fetch(`/api/${this.state.programSelector}?search=${searchValue}`)
        .then( _ => {
            this.setState({
                redirect: true
            })
        })
    }

    render() {
        return (
            <PageTemplate >
                <h1>EDUreview</h1>
    
                <div>
                    <span>Find me the</span>
                    <br /><br />
                    <select value={this.state.programSelector} onChange={this.handleChange} >
                        <option value={SEARCH_TYPE[PROGRAM]}>Program</option>
                        <option value={SEARCH_TYPE[INSTITUTION]}>Institution</option>
                    </select>
                    <span>called</span>
                    <SearchField 
                        handleSubmit={this.handleSubmit}
                    />
                </div>                
            </PageTemplate>
        )
    }
}

export default HomePage;