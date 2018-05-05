import React from 'react';


var RegistrationForm = React.createClass({
    getInitialState: function() {
        return ({
           username: '',
           email: '',
           password: ''
        });
    },
    
    handleUserName: function(e) {
        this.setState({username: e.target.value});
    },
    
    handleEmail: function(e) {
        this.setState({email: e.target.value});
    },
    
    handlePassword: function(e) {
        this.setState({password: e.target.value});
    },
    
    handleRegistration: function() {
        let reg = {};
        reg.username = this.state.username;
        reg.email = this.state.email;
        reg.password = this.state.password;
        this.props.newReg(reg);
        this.setState({
            username: '',
            email: '',
            password: ''
        });
    },
    
    render: function() {
        return (
            <div className="modal fade" id="registerForm">
                <div id="register">    
                    <div className="container">
                        <form className="form-horizontal">
                            <span className="glyphicon glyphicon-remove" data-dismiss="modal"/>
                            <div className="form-group col-sm-4-offset-4">
                                <div className="col-sm-offset-4 col-sm-4">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputRegisterUserName" 
                                        placeholder="username" 
                                        name="username" 
                                        onChange={this.handleUserName}
                                        value={this.state.username}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-sm-4-offset-4">
                                <div className="col-sm-offset-4 col-sm-4">
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="inputRegisterEmail" 
                                        placeholder="Email" 
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
                                        id="inputRegisterPassword" 
                                        placeholder="Password" 
                                        name="password" 
                                        onChange={this.handlePassword}
                                        value={this.state.password}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-4 col-sm-4">
                                    <input type="button" className="btn btn-primary" onClick={this.handleRegistration} data-dismiss="modal" value="Register"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
  }
});

module.exports = RegistrationForm;