import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from '../pages/HomePage/HomePage';
import AddReviewPage from '../pages/AddReviewPage/AddReviewPage';
import PageNotFoundPage from '../pages/PageNotFoundPage/PageNotFoundPage';
import { AppProvider } from './AppContext';
import AddProgramPage from '../pages/AddProgramPage/AddProgramPage';
import AddInstitutionPage from '../pages/AddInstitutionPage/AddInstitutionPage';
import BrowseProgramsPage from '../pages/BrowseProgramsPage/BrowseProgramsPage';
import BrowseInstitutionsPage from '../pages/BrowseInstitutionsPage/BrowseInstitutionsPage';
import ProgramDetailsPage from '../pages/ProgramDetailsPage/ProgramDetailsPage';
import InstitutionDetailsPage from '../pages/InstitutionDetailsPage/InstitutionDetailsPage';
import SearchResultsPage from '../pages/SearchResultsPage/SearchResultsPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/SignupPage/SignupPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import AuthTokenService from '../services/AuthTokenService';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            login: this.login,
            logout: this.logout,
            loginFromToken: this.loginFromToken,
            jwtService: this.jwtService
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.loginFromToken = this.loginFromToken.bind(this);
        this.jwtService = this.jwtService;
    }

    jwtService = new AuthTokenService();

    /**
     * Logs user in.
     * Reflects the state change in App's state, and stores JWT in localStorage
     * Function accessed via the AppProvider Context API.
     * @param {string} email
     * @param {string} password
     */
    login = async (email, password) => {
        try {
            const token = await this.jwtService.login(email, password);
            this.setState({ user: this.jwtService.getProfile() });
            return token;
        } catch (err) {
            throw err;
        }
    };

    loginFromToken = token => {
        this.jwtService.setToken(token);
        this.setState({ user: this.jwtService.getProfile() });
    };

    /**
     * Logs user out.
     * Reflects the state change in App's state, and removes JWT from localStorage
     * Function accessed via the AppProvider Context API.
     */
    logout = () => {
        this.jwtService.logout();
        this.setState({ user: null });
    };

    componentDidMount() {
        // Log in user via token if present
        if (!this.state.userLoggedIn) {
            if (this.jwtService.loggedIn()) {
                this.setState({ user: this.jwtService.getProfile() });
            }
        }
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <AppProvider value={this.state}>
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/search" component={SearchResultsPage} />
                            <Route exact path="/programs" component={BrowseProgramsPage} />
                            <Route exact path="/programs/:id" component={ProgramDetailsPage} />
                            <Route path="/programs/:id/addreview" component={AddReviewPage} />
                            <Route path="/add-program" component={AddProgramPage} />
                            <Route exact path="/institutions" component={BrowseInstitutionsPage} />
                            <Route path="/institutions/:id" component={InstitutionDetailsPage} />
                            <Route path="/add-institution" component={AddInstitutionPage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/signup" component={SignupPage} />
                            <Route path="/profile" component={ProfilePage} />
                            <Route component={PageNotFoundPage} />
                        </Switch>
                    </AppProvider>
                </Router>
            </div>
        );
    }
}

export default App;
