import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

class NavSearchField extends React.Component {
    state = {
        value: '',
        redirect: false,
        programSelector: 'programs'
    }

    handleChange = e => {
        this.setState({
            value: e.target.value
        });
    }

    onClick = e => {
        this.setState({
            programSelector: e.target.name,
            redirect: true
        })
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect
                    to={{
                        pathname: '/search',
                        search: `?q=${this.state.value}`,
                        state: { type: this.state.programSelector }
                    }}
                />
            );
        }
        return (
            <Form inline>
                <FormControl
                    value={this.state.value}
                    type="text"
                    placeholder="Search"
                    className="mr-sm-4"
                    onChange={this.handleChange}>
                </FormControl>
                <Button
                    name="programs"
                    variant="outline-info"
                    onClick={this.onClick}
                >
                    Program Search
                </Button>
                &nbsp;
                <Button
                    name="institutions"
                    variant="outline-info"
                    onClick={this.onClick}
                >
                    Institution Search
                </Button>
            </Form>
        )
    }
}

export default NavSearchField;