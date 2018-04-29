import React from 'react';
import $ from 'jquery';
import Citations from './Citations';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Header from './Header';
import ViolationDropdown from './ViolationDropdown';
import Form from './Form';
import Toggle from 'material-ui/Toggle';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {expired, queryCheck } from '../../src/helpers';

var CitationApp = React.createClass({
  getInitialState: function() {
    return ({
      addCite: false,
      data: [], 
      query: '',
      username: '',
      user: {},
      active: false,
      auth: false,
      message: '',
      success: false
    });  
  },
  
  getUser: function() {
      $.ajax({
        url: '/api/me',
        dataType: 'json',
        cache: false,
        success: function(data) {
          if(!this.state.auth){
            this.setState({
              message: data.message,
              success: true
            });
          }
          this.setState({
              user: data,
              username: data.local.username,
              auth: true
            });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/api/me', status, err.toString());
        }.bind(this)
      });
    },
  
  getCitations: function() {
    $.ajax({
      url: '/api/citations',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/citations', status, err.toString());
      }.bind(this)
    });
  },
  
  addNewCite: function(obj) {
        let cite = obj;
        $.ajax({
          url: '/api/new/citation',
          dataType: 'json',
          type: 'POST',
          data: cite,
          success: function(res) {
            this.setState({
              addCite: false, 
              message: res.message,
              success: true
            });
            this.getCitations();
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/api/new/citation', status, err.toString());
            this.setState({
              message: err.message
            });
          }.bind(this)
        });
    },
  
  componentDidMount: function() {
    this.getCitations();
    this.getUser();
  },
  
  componentDidUpdate: function() {
    if(this.state.message){
      this.clearFlash();
    }
  },
  
  clearFlash: function() {
    setTimeout(() => {
      console.log('timer activated');
      this.setState({message: '', success: false});
    }, 5000);
  },
  
  handleQueryInput: function(e) {
    this.setState({query: e.target.value});
  },
  
  clearQuery: function(e) {
    this.setState({query: ''});
  },
  
  toggleAddCite: function() {
    this.setState({addCite: !this.state.addCite});
  },
  
  toggleActive: function() {
    this.setState({active: !this.state.active});
  },
  
  registerUser: function(obj) {
    $.ajax({
          url: '/signup',
          type: 'POST',
          data: obj,
          success: function(data) {
              this.getUser();
              console.log('User registered');
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/signup', status, err.toString());
          }.bind(this)
        });
  },
  
  logInUser: function(obj) {
    $.ajax({
          url: '/signon',
          type: 'POST',
          data: obj,
          success: function(data) {
              this.getUser();
              console.log('User signed in!');
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/signon', status, err.toString());
          }.bind(this)
        });
  },
  
  render: function() {
    let data = JSON.parse(JSON.stringify(this.state.data));
    
    let filtered = [];
    data.map((r) => {
      let query = this.state.query.toLowerCase();
      
      if(!this.state.query && !this.state.active){
        filtered = data;
      }else if(!this.state.query && this.state.active){
        if(!expired(r.date)){
          filtered.push(r);
        }
      }else if(this.state.query && this.state.active){
        if(!expired(r.date) && queryCheck(r, query)){
          filtered.push(r);
        }
      }else{ 
        if(queryCheck(r, query)){
          filtered.push(r);
        }
      }
    });
    if(this.state.active){
      filtered = filtered.map((r)=>{
        if(!expired(r.date)){
          return r;
        }  
      });
    }
    let cancel = <h3 className={this.state.addCite ? 'btn btn-danger': 'btn btn-primary'} onClick={this.toggleAddCite}>{this.state.addCite ? "Cancel" : "Add a citation"}</h3>;
    let form;
    if(this.state.auth){
      form = this.state.addCite ? (<div><Form cite={this.addNewCite}/>{cancel}</div>) : <div>{cancel}</div>;
    }
    let count = `${filtered.length} records currently showing`;
    return (
      <div>
        <div>
          <Header user={this.state.user} message={this.state.message} success={this.state.success}/>
          <div>
            {form}
          </div>
          <div className="flex-banner">
            <div>
              <ViolationDropdown />
            </div>
            <div>
              <h2 id="count"><span className="label label-primary">{count}</span></h2>
            </div>
            <div style={{ alignSelf: 'flex-end' }}>
              <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <Toggle 
                  label={this.state.active ? 'Active' : 'All'} 
                  toggled={this.state.active} onToggle={() => 
                  this.setState({ active: !this.state.active })}
                  thumbSwitchedStyle={{ backgroundColor: '#008CBA' }}
                  labelStyle={{color: '#222'}}
                  labelPosition="left"/>
              </MuiThemeProvider>
            </div>
          </div>
          <div className="input-group">
          <input type="text" placeholder="Search" className="form-control" value={this.state.query} onChange={this.handleQueryInput}/>        
          <span className="input-group-addon" onClick={this.clearQuery}>Clear</span>
          </div>
          <Citations data={filtered}/>
        </div>
        <LoginForm login={this.logInUser}/>
        <RegistrationForm newReg={this.registerUser}/>
      </div>
    );
  }
});

module.exports = CitationApp;