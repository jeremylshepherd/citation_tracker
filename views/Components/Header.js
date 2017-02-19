import React from 'react';
import {Link} from 'react-router';

var Header = React.createClass({
  render: function() {
    let icon = Object.keys(this.props.user).length > 0 ?
        (<div className="navbar-form navbar-right">Logged in as <Link to={`/officer/${this.props.user.local.username}`}>{this.props.user.local.username}</Link> <a href="/logout" className="btn btn-danger">Log Out</a></div>) : 
        (<div className="navbar-form navbar-right">Please <Link to='/login' className="btn btn-primary" data-toggle="modal" data-target="#registerForm">Register</Link><span> or </span>
        <a href='/login' className="btn btn-success" data-toggle="modal" data-target="#loginForm">Log In</a></div>);
        
    let brand = this.props.user ? 
    (<Link to='/' className="navbar-brand">Citation Tracker</Link>):
    (<a href='/' className="navbar-brand">Citation Tracker</a>);
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            {brand}
            {icon}
          </div>
        </nav>
        <header>
          <h1><img className="patch" src="/dist/expandedPatch.svg"/> Good Samaritan Campus Police</h1>
          <h3>Citation Application</h3>
        </header>
      </div>
    );
  }
});

module.exports = Header;