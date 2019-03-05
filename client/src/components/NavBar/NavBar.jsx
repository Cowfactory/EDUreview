import React from 'react';
import { Link } from 'react-router-dom';
import { AppConsumer } from '../../App/AppContext';
import './NavBar.css';

function NavBar(props) {
    return (
        <div className="NavBar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/programs">Browse Programs</Link>
                </li>
                <li>
                    <Link to="/institutions">Browse Insitutions</Link>
                </li>
            </ul>
            <ul>
                <AppConsumer>
                    {context =>
                        context.user ? (
                            <>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/" onClick={context.logout}>
                                        Log out
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/signup">Sign Up</Link>
                                </li>
                                <li>
                                    <Link to="/login">Log in</Link>
                                </li>
                            </>
                        )
                    }
                </AppConsumer>
            </ul>
        </div>
    );
}

export default NavBar;
