import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import SearchField from '../../components/SearchField/SearchField';



function HomePage(props) {
    return (
        <PageTemplate >
            <h1>EDUreview</h1>

            <div>
                <span>Find me the</span>
                <SearchField />
            </div>                
        </PageTemplate>
    )
}

export default HomePage;