import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import { Link } from 'react-router-dom';
import styles from './SearchResultsPageTemplate.module.css';

function SearchResultsPageTemplate(props) {
    return (
        <PageTemplate>
            <div className={styles.filter_toolbox}>
                Filter Tools:
                <p>Show only: X, Y, Z [Search]</p>
                <p>Don't see the result you're looking for?</p>
                <Link to="add-institution">Add an institution listing here:</Link>
                <Link to="add-program">Add a program listing here:</Link>
            </div>
            <div className={styles.reviews}>
                {props.children} {/* List of Reviews go here */}
            </div>
        </PageTemplate>
    )
}

export default SearchResultsPageTemplate;