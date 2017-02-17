import React from 'react';
import TicketFooter from './TicketFooter';
import {cleanInput, validator} from '../../src/helpers';

var Form = React.createClass({
  getInitialState: function() {
    return ({
        ticket: '',
        make: '',
        model: '',
        color: '',
        year: '',
        tag: '',
        state: '',
        violation: [],
        employee: '',
        location: '',
        date: '',
        time: '',
        officer: '',
        unit: ''
    });
  },
  
  handleTicketInput: function(e) {
    let input = cleanInput(e.target.value);
    this.setState({
      ticket: input
    });
  },
  
  handleMakeInput: function(e) {
    let input = cleanInput(e.target.value);
    this.setState({
      make: input
    });
  },
  
  handleModelInput: function(e) {
    let input = cleanInput(e.target.value);
    this.setState({
      model: input
    });
  },
  
  handleColorInput: function(e) {
    let input = cleanInput(e.target.value);
    this.setState({
      color: input
    });
  },
  
  handleYearInput: function(e) {
    let input = cleanInput(e.target.value);
    this.setState({
      year: input
    });
  },
  
  handleTagInput: function(e) {
    let input = cleanInput(e.target.value);
    this.setState({
      tag: input
    });
  },
  
  handleStateInput: function(e) {
    let input = cleanInput(e.target.value);
    this.setState({
      state: input.slice(0,2)
    });
  },
  
  handleViolationInput: function(e) {
    let input = cleanInput(e.target.value);
    let arr = input.split(',');
    arr = arr.map((r) => {
      return r.trim();
    });
    this.setState({
      violation: arr
    });
  },
  
  handleEmployeeInput: function(e) {
    let input = cleanInput(e.target.value);
    this.setState({
      employee: input
    });
  },
  
  handleLocationInput: function(e) {
    let input = cleanInput(e.target.value);
    this.setState({
      location: input
    });
  },
  
  handleDateInput: function(e) {
    let input = cleanInput(e.target.value);
    this.setState({
      date: input
    });
  },
  
  handleTimeInput: function(e) {
    let input = cleanInput(e.target.value);
    this.setState({
      time: input
    });
  },
  
  handleOfficerInput: function(e) {
    let input = cleanInput(e.target.value);
    this.setState({
      officer: input
    });
  },
  
  handleUnitInput: function(e) {
    let input = cleanInput(e.target.value);
    this.setState({
      unit: input
    });
  },
  
  handleCitationSubmit: function() {
    let cite = {};
    cite.ticket = this.state.ticket;
    cite.make = this.state.make;
    cite.model = this.state.model;
    cite.color = this.state.color;
    cite.year = this.state.year;
    cite.tag = this.state.tag;
    cite.state = this.state.state;
    cite.violation = this.state.violation;
    cite.employee = this.state.employee;
    cite.location = this.state.location;
    cite.date = this.state.date;
    cite.time = this.state.time;
    cite.officer = {name: this.state.officer, unit: this.state.unit};
    this.props.cite(cite);
    this.setState({
        ticket: '',
        make: '',
        model: '',
        color: '',
        year: '',
        tag: '',
        state: '',
        violation: [],
        employee: '',
        location: '',
        date: '',
        time: '',
        officer: '',
        unit: ''
    });
  },
  
  render: function() {
    let submit;
    // if(
    //   !this.state.ticket ||
    //   !this.state.make ||
    //   !this.state.color || 
    //   !this.state.tag || 
    //   !this.state.violation.length || 
    //   !this.state.location || 
    //   !this.state.officer || 
    //   this.state.date.length < 10 || 
    //   this.state.time.length <5) {
    if(!validator(this.state)){
      submit = <input type="button" className="btn btn-primary disabled" value="Enter"/>;
    }else{
      submit = <input type="button" className="btn btn-primary" value="Enter" onClick={this.handleCitationSubmit}/>;
    }
    
    return (
      <form className="form-group form-inline"><br/>
          <h4>If submit button is disabled, check to see you have correctly formatted data and filled all required fields.</h4>
          <h4>For example time and date should have a leading zero ex: 04:21 and 02/28/2016.</h4>
          <input type="text" className="form-control" placeholder="Make (required)" value={this.state.make} onChange={this.handleMakeInput} required/>
          <input type="text" className="form-control" placeholder="Model" value={this.state.model} onChange={this.handleModelInput}/>
          <input type="text" className="form-control" placeholder="Color (required)" value={this.state.color} onChange={this.handleColorInput} required/>
          <br/>
          <br/>
          <input type="text" className="form-control" placeholder="Year" value={this.state.year} onChange={this.handleYearInput}/>
          <input type="text" className="form-control" placeholder="License Plate No spaces. If no tag use NOTAG (required)" value={this.state.tag} onChange={this.handleTagInput} required/>
          <input type="text" className="form-control" placeholder="State (Use standard abbreviation)" value={this.state.state} onChange={this.handleStateInput} required/>
          <br/>
          <br/>
          <input type="text" className="form-control" placeholder="Violation (required)" value={this.state.violation} onChange={this.handleViolationInput} required/>
          <input type="text" className="form-control" placeholder="Ticket Number (required)" value={this.state.ticket} onChange={this.handleTicketInput} required/>
          <br/>
          <br/>
          <input type="text" className="form-control"id="employee" placeholder="Employee number" value={this.state.employee} onChange={this.handleEmployeeInput}/>
          <br/>
          <br/>
          <input type="text" className="form-control" placeholder="Location (required)" value={this.state.location} onChange={this.handleLocationInput} required/>
          <input type="text" className="form-control" placeholder="Date (MM/DD/YYYY required)" value={this.state.date} onChange={this.handleDateInput} required/>
          <input type="text" className="form-control" placeholder="Time (HH:MM required)" value={this.state.time} onChange={this.handleTimeInput} required/>
          <br/>
          <br/>
          <input type="text" className="form-control" placeholder="Officer (required)" value={this.state.officer} onChange={this.handleOfficerInput} required/>
          <input type="text" className="form-control" placeholder="Unit #" value={this.state.unit} onChange={this.handleUnitInput} required/>
          <br/>
          <br/>
          {submit}
        </form>
      );
  }
});

module.exports = Form;