import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

class TrueFalsePicker extends React.Component {
    handleChange = (value, e) => {
        this.props.handleChange(e);
    }

    render() {
        return (
            <ButtonToolbar>
                <ToggleButtonGroup
                    type="radio"
                    name={this.props.name}
                    className="mr-3"
                    onChange={this.handleChange}
                >
                    <ToggleButton variant="primary" value={"Yes"}>Yes</ToggleButton>
                    <ToggleButton variant="primary" value={"No"}>No</ToggleButton>
                </ToggleButtonGroup>
                <Button disabled variant="secondary">?</Button>
            </ButtonToolbar>
        )
    }
};

export default TrueFalsePicker;