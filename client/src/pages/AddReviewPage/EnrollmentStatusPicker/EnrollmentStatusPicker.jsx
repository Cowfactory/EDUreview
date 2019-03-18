import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class EnrollmentStatusPicker extends React.Component {
    state = {
        active: null
    }

    handleChange = (value, e) => {
        e.preventDefault();
        this.setState({
            active: e.target.value
        })
    }

    render() {
        return (
            <DropdownButton
                title={this.state.active || "Select status"}>
                <Dropdown.Item
                    as="button"
                    value="Current Student"
                    onSelect={this.handleChange}
                >
                    Current Student
                </Dropdown.Item>
                <Dropdown.Item
                    as="button"
                    value="Graduated"
                    onSelect={this.handleChange}
                >
                    Graduated
                </Dropdown.Item>
                <Dropdown.Item
                    as="button"
                    value="Current Student"
                    onSelect={this.handleChange}
                >
                    Formerly Enrolled
                </Dropdown.Item>
            </DropdownButton>

        )
    }
};

export default EnrollmentStatusPicker;