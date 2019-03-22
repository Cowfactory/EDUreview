import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import SearchField from '../../components/SearchField/SearchField';
import Jumbotron from 'react-bootstrap/Jumbotron';
class HomePage extends React.Component {
    componentDidMount() {
        document.title = 'EDUreview';
    }

    render() {
        return (
            <PageTemplate >
                <Jumbotron>
                    <h1>EDUreview</h1>
                    <div>
                        <SearchField />
                    </div>
                </Jumbotron>
            </PageTemplate >
        )
    }
}

export default HomePage;