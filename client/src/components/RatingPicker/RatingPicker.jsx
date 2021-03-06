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
        this.props.handleChange(e);
        this.setState({
            active: e.target.value
        })
    }

    render() {
        return (
            <ButtonToolbar>
                <ToggleButtonGroup
                    type="radio"
                    name={this.props.name}
                    value={this.state.value}
                    className="mr-3"
                    onChange={this.handleChange}
                >
                    <ToggleButton variant="primary" value="Poor">1</ToggleButton>
                    <ToggleButton variant="primary" value="Fair">2</ToggleButton>
                    <ToggleButton variant="primary" value="Good">3</ToggleButton>
                    <ToggleButton variant="primary" value="Very Good">4</ToggleButton>
                    <ToggleButton variant="primary" value="Excellent">5</ToggleButton>
                </ToggleButtonGroup>
                <Button disabled variant="info">{this.state.active || "?"}</Button>
            </ButtonToolbar>
        )
    }
};

export default RatingPicker;