import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import './App.css';
import TestPage from '../pages/TestPage/TestPage';
import HomePage from '../pages/HomePage/HomePage';
import FormPage from '../pages/FormPage/FormPage';
import ReviewsPage from '../pages/ReviewsPage/ReviewsPage';
import PageNotFoundPage from '../pages/PageNotFoundPage/PageNotFoundPage';
import { AppProvider } from './AppContext';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isUserLoggedIn: false
        }
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <AppProvider value={this.state}>    
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/test/" component={TestPage} />
                            <Route path="/form/" component={FormPage} />
                            <Route path="/reviews/" component={ReviewsPage} />
                            <Route component={PageNotFoundPage} />  
                        </Switch>
                    </AppProvider>
                </Router>
            </div>
        );
    }
}

export default App;
