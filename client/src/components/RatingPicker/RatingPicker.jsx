import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

class RatingPicker extends React.Component {
    state = {
        active: null
    }

    handleChange = (value, e) => {
        this.setState({
            active: e.target.value
        })
    }

    render() {
        return (
            <ButtonToolbar>
                <ToggleButtonGroup
                    type="radio"
                    name="options"
                    value={this.state.value}
                    className="mr-3"
                    onChange={this.handleChange}
                >
                    <ToggleButton variant="secondary" value="Poor">1</ToggleButton>
                    <ToggleButton variant="secondary" value="Fair">2</ToggleButton>
                    <ToggleButton variant="secondary" value="Good">3</ToggleButton>
                    <ToggleButton variant="secondary" value="Very Good">4</ToggleButton>
                    <ToggleButton variant="secondary" value="Excellent">5</ToggleButton>
                </ToggleButtonGroup>
                <Button disabled variant="info">{this.state.active || "?"}</Button>
            </ButtonToolbar>
        )
    }
};

export default RatingPicker;