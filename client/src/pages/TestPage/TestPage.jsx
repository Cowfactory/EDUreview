import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';

class TestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Joe"
        }
    }
    
    render() {
        return (
            <PageTemplate>
                <h1>Test Page</h1>
                <p>formerly {this.state.name}'s page</p>
            </PageTemplate>
        )
    }
}

export default TestPage;