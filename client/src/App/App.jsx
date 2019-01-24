import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import TestPage from '../pages/TestPage/TestPage';
import HomePage from '../pages/HomePage/HomePage';
import FormPage from '../pages/FormPage/FormPage';
import ReviewsPage from '../pages/ReviewsPage/ReviewsPage';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/test/" component={TestPage} />
                        <Route path="/form/" component={FormPage} />
                        <Route path="/reviews/" component={ReviewsPage} />
                        {/* <Route path="/*" component={404Page} */}
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
