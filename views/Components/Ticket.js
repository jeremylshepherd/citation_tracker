import React from 'react';
import $ from 'jquery';
import Bootstrap$ from 'bootstrap-jquery';
import Citations from './Citations';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Header from './Header';
import TicketFooter from './TicketFooter';
import Form from './Form';
import { expired, queryCheck } from '../../src/helpers';
import { browserHistory } from 'react-router';

var Ticket = React.createClass({
  getInitialState: function() {
    return ({
      citation: {
          violation: [],
          officer:{name: '', unit: ''}
      },
      username: '',
      user: {},
      active: false,
      auth: false
    });  
  },
  
  getUser: function() {
      $.ajax({
        url: '/api/me',
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({
              user: data,
              username: data.username,
              auth: true
            });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/api/me', status, err.toString());
          browserHistory.push('/');
        }.bind(this)
      });
    },
  
  getCitation: function() {
    $.ajax({
      url: '/api/citation/' + this.props.params.ticket,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({citation: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/citation/' + this.props.params.ticket, status, err.toString());
      }.bind(this)
    });
  },
  
  componentDidMount: function() {
    this.getCitation();
    this.getUser();
  },
  
  render: function() {
      let c = this.state.citation;
      let officer; 
      if(this.state.citation.officer.unit !== null){
          officer = this.state.citation.officer.name + ' #' + this.state.citation.officer.unit;
      }else{
          officer = this.state.citation.officer.name;
      }
      let dateClass = expired(c.date) ? " list-group-item-danger" : " list-group-item-success";
    return (
      <div>
        <div className='col-xs-12'>
          <Header user={this.state.user}/>
          <div className="list-group">
            <h4 className="list-group-item">{'Ticket Number: ' + c.ticket}</h4>
            <h4 className="list-group-item">{'Tag Number: ' + c.tag}</h4>
            <h4 className="list-group-item">{'State: ' + c.state}</h4>
            <h4 className="list-group-item">{'Make: ' + c.make}</h4>
            <h4 className="list-group-item">{'Model: ' + c.model}</h4>
            <h4 className="list-group-item">{'Color: ' + c.color}</h4>
            <h4 className="list-group-item">{'Employee Number: ' + c.employee}</h4>
            <h4 className="list-group-item">{'Violations: ' + c.violation.join(', ')}</h4>
            <h4 className={"list-group-item" + dateClass}>{'Citation Issued: ' + c.date + ' ' + c.time}</h4>
            <h4 className="list-group-item">{'Officer: ' + officer}</h4>
          </div>
        </div>
        <div className='col-xs-12'><TicketFooter /></div>
      </div>
    );
  }
});

module.exports = Ticket;