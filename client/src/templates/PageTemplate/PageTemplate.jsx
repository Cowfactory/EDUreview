import React from 'react';
import NavBar from '../../components/NavBar/NavBar';

function PageTemplate(props) {
    return (
        <>
            <NavBar />
            {props.children}
            {/* FOOTER BAR */}
        </>              
    )
}

export default PageTemplate;