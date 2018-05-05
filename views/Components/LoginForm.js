import React from 'react';

var LoginForm = React.createClass({
    getInitialState: function() {
        return ({
           email: '',
           password: ''
        });
    },
    
    handleEmail: function(e) {
        this.setState({email: e.target.value});
    },
    
    handlePassword: function(e) {
        this.setState({password: e.target.value});
    },
    
    handleLogin: function() {
        let log = {};
        log.email = this.state.email;
        log.password = this.state.password;
        this.props.login(log);
        this.setState({
            email: '',
            password: ''
        });
    },
    
    render: function() {
        return (
            <div className="modal fade" id="loginForm">
                <div id="register">    
                    <div className="container">
                        <form className="form-horizontal">
                            <span className="glyphicon glyphicon-remove" data-dismiss="modal"/>
                            <div className="form-group col-sm-4-offset-4">
                                <div className="col-sm-offset-4 col-sm-4">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputLoginUserName" 
                                        placeholder="email" 
                                        name="email" 
                                        onChange={this.handleEmail}
                                        value={this.state.email}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-4 col-sm-4">
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="inputLoginPassword" 
                                        placeholder="Password" 
                                        name="password" 
                                        onChange={this.handlePassword}
                                        value={this.state.password}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-4 col-sm-4">
                                    <input type="button" className="btn btn-success" onClick={this.handleLogin} data-dismiss="modal" value="Log In"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
  }
});

module.exports = LoginForm;