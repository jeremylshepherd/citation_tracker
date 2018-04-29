import React from 'react';
import Flash from './Flash';
import {Link} from 'react-router';

var Header = React.createClass({
  render: function() {
    let icon = Object.keys(this.props.user).length > 0 ?
        (<div className="collapse navbar-collapse nav navbar-nav navbar-right" id="right-nav"><Link to={`/officer/${this.props.user.local.username}`} className="btn btn-link">{`Logged in as ${this.props.user.local.username}`}</Link> <a href="/logout" className="btn btn-danger">Log Out</a></div>) : 
        (<div className="collapse navbar-collapse nav navbar-nav navbar-right" id="right-nav">Please <Link to='/login' className="btn btn-primary" data-toggle="modal" data-target="#registerForm">Register</Link><span> or </span>
        <a href='/login' className="btn btn-success" data-toggle="modal" data-target="#loginForm">Log In</a></div>);
        
    let brand = this.props.user ? 
    (<Link to='/' className="navbar-brand">Citation Tracker</Link>):
    (<a href='/' className="navbar-brand">Citation Tracker</a>);
    let flash = this.props.message ? <Flash message={this.props.message} success={this.props.success} /> : <span></span>;
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="row">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#right-nav"
                  aria-expanded="false"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                {brand}
              </div>
            {icon}
            </div>
          </div>
        </nav>
        <div className="flashPoint">
          {flash}
        </div>
        <header>
          <h1 className="text-center" id="dept"><img className="patch" src="/dist/expandedPatch.svg"/> Good Samaritan Campus Police</h1>
        </header>
      </div>
    );
  }
});

module.exports = Header;