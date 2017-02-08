import React from 'react';
import ReactDOM from "react-dom";
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router';
import CitationApp from "../views/Components/CitationApp.js";
import RegistrationForm from "../views/Components/RegistrationForm.js";
import Ticket from "../views/Components/Ticket.js";
import Profile from '../views/Components/Profile.js';

let node = document.getElementById('app');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={CitationApp}/>
        <Route path='/:ticket' component={Ticket} />
        <Route path='/officer/:user' component={Profile} />
    </Router>, 
    node
);