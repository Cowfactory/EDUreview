import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import './FormTemplate.css';

function FormTemplate(props) {
    return (
        <PageTemplate>
            <form className="FormTemplate" {...props.children} >
                {props.children}
                <input type="submit" value="Submit" />
            </form>
        </PageTemplate>
    )
}


export default FormTemplate;