import React from 'react';
import TicketFooter from './TicketFooter';

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
    this.setState({
      ticket: e.target.value.toUpperCase()
    });
  },
  
  handleMakeInput: function(e) {
    this.setState({
      make: e.target.value.toUpperCase()
    });
  },
  
  handleModelInput: function(e) {
    this.setState({
      model: e.target.value.toUpperCase()
    });
  },
  
  handleColorInput: function(e) {
    this.setState({
      color: e.target.value.toUpperCase()
    });
  },
  
  handleYearInput: function(e) {
    this.setState({
      year: e.target.value
    });
  },
  
  handleTagInput: function(e) {
    this.setState({
      tag: e.target.value.toUpperCase()
    });
  },
  
  handleStateInput: function(e) {
    let input = e.target.value;
    this.setState({
      state: input.slice(0,2).toUpperCase()
    });
  },
  
  handleViolationInput: function(e) {
    let arr = e.target.value.split(',');
    arr = arr.map((r) => {
      return r.trim();
    });
    this.setState({
      violation: arr
    });
  },
  
  handleEmployeeInput: function(e) {
    this.setState({
      employee: e.target.value
    });
  },
  
  handleLocationInput: function(e) {
    this.setState({
      location: e.target.value.toUpperCase()
    });
  },
  
  handleDateInput: function(e) {
    this.setState({
      date: e.target.value
    });
  },
  
  handleTimeInput: function(e) {
    
    this.setState({
      time: e.target.value
    });
  },
  
  handleOfficerInput: function(e) {
    this.setState({
      officer: e.target.value.toUpperCase()
    });
  },
  
  handleUnitInput: function(e) {
    this.setState({
      unit: e.target.value
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
    if(
      !this.state.ticket ||
      !this.state.make ||
      !this.state.color || 
      !this.state.tag || 
      !this.state.violation.length || 
      !this.state.location || 
      !this.state.officer || 
      this.state.date.length < 10 || 
      this.state.time.length <5) {
      submit = <input type="button" className="btn btn-primary disabled" value="Enter" onClick={this.handleCitationSubmit}/>;
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