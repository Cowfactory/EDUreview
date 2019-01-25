import React from 'react';
import NavBox from '../../components/NavBox/NavBox';

class TestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Joe"
        }
    }
    
    render() {
        return (
            <>
                <NavBox/>
                <h1>Test Page</h1>
                <p>formerly {this.state.name}'s page</p>
            </>
        )
    }
}

export default TestPage;