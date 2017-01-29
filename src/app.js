import React from 'react';
import ReactDOM from "react-dom";
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router';
import CitationApp from "../views/Components/CitationApp.js";
import RegistrationForm from "../views/Components/RegistrationForm.js";
import Ticket from "../views/Components/Ticket.js";


let node = document.getElementById('app');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={CitationApp}/>
        <Route path='/:ticket' component={Ticket} />
    </Router>, 
    node
);