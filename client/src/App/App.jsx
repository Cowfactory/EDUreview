import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import './App.css';
import HomePage from '../pages/HomePage/HomePage';
import FormPage from '../pages/FormPage/FormPage';
import ReviewsPage from '../pages/ReviewsPage/ReviewsPage';
import PageNotFoundPage from '../pages/PageNotFoundPage/PageNotFoundPage';
import { AppProvider } from './AppContext';
import AddProgramPage from '../pages/AddProgramPage/AddProgramPage';
import AddInstitutionPage from '../pages/AddInstitutionPage/AddInstitutionPage';
import BrowseProgramsPage from '../pages/BrowseProgramsPage/BrowseProgramsPage';
import BrowseInstitutionsPage from '../pages/BrowseInstitutionsPage/BrowseInstitutionsPage';
import ProgramDetailsPage from '../pages/ProgramDetailsPage/ProgramDetailsPage';
import InstitutionDetailsPage from '../pages/InstitutionDetailsPage/InstitutionDetailsPage';

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
                            <Route path="/form/" component={FormPage} />
                            <Route path="/reviews/" component={ReviewsPage} />
                            <Route exact path="/programs" component={BrowseProgramsPage} />
                            <Route path="/programs/:id" component={ProgramDetailsPage} />
                            <Route path="/add-program" component={AddProgramPage} />
                            <Route exact path="/institutions" component={BrowseInstitutionsPage} />
                            <Route path="/institutions/:id" component={InstitutionDetailsPage} />
                            <Route path="/add-institution" component={AddInstitutionPage} />
                            <Route component={PageNotFoundPage} />  
                        </Switch>
                    </AppProvider>
                </Router>
            </div>
        );
    }
}

export default App;
