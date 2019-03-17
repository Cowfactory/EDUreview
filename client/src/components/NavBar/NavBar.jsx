import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import { AppConsumer } from '../../App/AppContext';

function NavBar(props) {
    return (

        <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                <Navbar.Brand as={Link} to="/">EDUreview</Navbar.Brand>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-4" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Nav>

            <Nav>
                <AppConsumer>
                    {
                        context => context.user ? (
                            <>
                                <Nav.Item>
                                    <Nav.Link eventKey="disabled" disabled>
                                        {context.user.username}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/" onClick={context.logout}>
                                        Logout
                                    </Nav.Link>
                                </Nav.Item>
                            </>
                        ) : (
                                <>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to="/login">Log In</Nav.Link>
                                    </Nav.Item>
                                </>
                            )
                    }
                </AppConsumer>
            </Nav>
        </Navbar>
    )
}

export default NavBar;