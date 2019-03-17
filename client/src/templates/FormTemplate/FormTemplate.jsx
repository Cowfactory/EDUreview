import React from 'react';
import './FormTemplate.css';

function FormTemplate(props) {
    return (
        <div className="FormTemplate border border-secondary rounded" {...props} >
            {props.children}
        </div>
    )
}


export default FormTemplate;