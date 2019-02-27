import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import SearchField from '../../components/SearchField/SearchField';

/* 
 * This Program Selector const helps with being consistent w/ the state management of 
 * the dropdown selector for the serach box
*/
const SEARCH_TYPE = ['programs', 'institutions'];
const PROGRAM = 0;
const INSTITUTION = 1;

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            programSelector: SEARCH_TYPE[PROGRAM],
        }
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
    }

    handleSelectionChange = (e) => {
        this.setState({
            programSelector: e.target.value
        })
    }

    render() {
        return (
            <PageTemplate >
                <h1>EDUreview</h1>
    
                <div>
                    <span>Find me the</span>
                    <br /><br />
                    <select value={this.state.programSelector} onChange={this.handleSelectionChange} >
                        <option value={SEARCH_TYPE[PROGRAM]}>Program</option>
                        <option value={SEARCH_TYPE[INSTITUTION]}>Institution</option>
                    </select>
                    <span>called</span>
                    <SearchField searchType={this.state.programSelector}/>
                </div>                
            </PageTemplate>
        )
    }
}

export default HomePage;