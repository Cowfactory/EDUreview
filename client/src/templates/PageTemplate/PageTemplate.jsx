import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import FooterBar from '../../components/FooterBar/FooterBar';
import styles from './PageTemplate.module.css';

function PageTemplate(props) {
    return (
        <div className={styles.PageTemplate}>
            <NavBar />
            <main>
                {props.children}
            </main>
            <FooterBar />
        </div>
    )
}

export default PageTemplate;