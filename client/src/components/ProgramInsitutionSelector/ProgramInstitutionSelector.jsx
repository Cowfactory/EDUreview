import React from 'react';

function ProgramInstitutionSelector(props) {
    return (
        <select value={props.programSelector} onChange={props.handleSelectionChange}>
            <option value={'programs'}>Program</option>
            <option value={'institutions'}>Institution</option>
        </select>
    )
}

export default ProgramInstitutionSelector;