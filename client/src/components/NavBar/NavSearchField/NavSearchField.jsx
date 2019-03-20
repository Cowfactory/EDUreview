import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class NavSearchField extends React.Component {
    render() {
        return (
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-4" />
                <Button variant="outline-info">Search</Button>
            </Form>
        )
    }
}

export default NavSearchField;