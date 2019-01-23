import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import TestPage from '../pages/TestPage/TestPage';
import HomePage from '../pages/HomePage/HomePage';
import './App.css';
import FormPage from '../pages/FormPage/FormPage';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/test/" component={TestPage} />
                        <Route path="/page/" component={FormPage} />
                        {/* <Route path="/*" component={404Page} */}
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
