import React from 'react';
import { Link } from 'react-router-dom';
import { AppConsumer } from '../../App/AppContext';
import './NavBar.css';

function NavBar(props) {
    return (
        <div className="NavBar">
            <ul>
                <li>
                    <Link to="/">Home Page</Link>
                </li>
                <li>
                    <Link to="/test">Test Page</Link>
                </li>
                <li>
                    <Link to="/form">The Form Page</Link>
                </li>
                <li>
                    <Link to="/reviews">The Reviews Page</Link>
                </li>
            </ul>
            <ul>
                <AppConsumer>
                    {context => (
                        context.isUserLoggedIn ?
                        <>
                            <li>
                                <Link to="/">Profile</Link>
                            </li>
                            <li>
                                <Link to="/">Log out</Link>
                            </li>
                        </>
                        :
                        <>
                            <li>
                                <Link to="/">Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/">Log in</Link>
                            </li>
                        </>
                    )}
                </AppConsumer>
            </ul>
        </div>
    )
}

export default NavBar;