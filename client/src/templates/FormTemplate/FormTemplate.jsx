import React from 'react';
import './FormTemplate.css';

function FormTemplate(props) {
    return (
        <form className="FormTemplate" {...props.children} >
            {props.children}
            <input type="submit" value="Submit" />
        </form>
    )
}


export default FormTemplate;