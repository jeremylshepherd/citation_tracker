import React from 'react';
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
  
  handleInput: function(e) {
    let target = e.target;
    let value = cleanInput(target.value);
    let name = target.name;
    
    if(name == 'violation') {
      let arr = value.split(',');
      arr = arr.map((r) => {
        return r.trim();
      });
      this.setState({
        violation: arr
      });
    }else if(name == 'state') {
      this.setState({
        state: value.slice(0,2)
      });
    }else{
      this.setState({
        [name]: value
      });
    }
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
    if(!validator(this.state)){
      submit = <input type="button" className="btn btn-primary disabled" value="Enter"/>;
    }else{
      submit = <input type="button" className="btn btn-primary" value="Enter" onClick={this.handleCitationSubmit}/>;
    }
    
    return (
      <form className="form-group form-inline"><br/>
          <h4>If submit button is disabled, check to see you have correctly formatted data and filled all required fields.</h4>
          <h4>For example time and date should have a leading zero ex: 04:21 and 02/28/2016.</h4>
          <input name="make" type="text" className="form-control" placeholder="Make (required)" value={this.state.make} onChange={this.handleInput} required/>
          <input name="model" type="text" className="form-control" placeholder="Model" value={this.state.model} onChange={this.handleInput}/>
          <input name="color" type="text" className="form-control" placeholder="Color (required)" value={this.state.color} onChange={this.handleInput} required/>
          <br/>
          <br/>
          <input name="year" type="text" className="form-control" placeholder="Year" value={this.state.year} onChange={this.handleInput}/>
          <input name="tag" type="text" className="form-control" placeholder="License Plate No spaces. If no tag use NOTAG (required)" value={this.state.tag} onChange={this.handleInput} required/>
          <input name="state" type="text" className="form-control" placeholder="State (Use standard abbreviation)" value={this.state.state} onChange={this.handleInput} required/>
          <br/>
          <br/>
          <input name="violation" type="text" className="form-control" placeholder="Violation (required)" value={this.state.violation} onChange={this.handleInput} required/>
          <input name="ticket" type="text" className="form-control" placeholder="Ticket Number (required)" value={this.state.ticket} onChange={this.handleInput} required/>
          <br/>
          <br/>
          <input name="employee" type="text" className="form-control"id="employee" placeholder="Employee number" value={this.state.employee} onChange={this.handleInput}/>
          <br/>
          <br/>
          <input name="location" type="text" className="form-control" placeholder="Location (required)" value={this.state.location} onChange={this.handleInput} required/>
          <input name="date" type="text" className="form-control" placeholder="Date (MM/DD/YYYY required)" value={this.state.date} onChange={this.handleInput} required/>
          <input name="time" type="text" className="form-control" placeholder="Time (HH:MM required)" value={this.state.time} onChange={this.handleInput} required/>
          <br/>
          <br/>
          <input name="officer" type="text" className="form-control" placeholder="Officer (required)" value={this.state.officer} onChange={this.handleInput} required/>
          <input name="unit" type="text" className="form-control" placeholder="Unit #" value={this.state.unit} onChange={this.handleInput} required/>
          <br/>
          <br/>
          {submit}
        </form>
      );
  }
});

module.exports = Form;