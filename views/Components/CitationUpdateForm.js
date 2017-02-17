import React, {Component} from 'react';
import {validator, cleanInput} from '../../src/helpers.js';
import $ from 'jquery';

export default class CitationUpdateForm extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {...props};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  
  handleInputChange(e) {
    let target = e.target;
    let value = cleanInput(target.value);
    let name = target.name;
    value = value.toUpperCase();
    if(target.name === 'violation') {
      value = value.split(',').map((r) => {
        return r.trim();
      });
    }
    if(name == 'officer'){
      this.setState({
        officer:{
          name: value
        }
      });
    }
    if(name == 'unit'){
      this.setState({
        officer:{
          unit: value
        }
      });
    }
    this.setState({
      [name]: value
    });
  }
  
  handleUpdate() {
    let cite = {};
    cite.tag = this.state.tag;
    cite.make = this.state.make;
    cite.model = this.state.model;
    cite.color = this.state.color;
    cite.state = this.state.state;
    cite.year = this.state.year;
    cite.violation = this.state.violation;
    cite.employee = this.state.employee;
    cite.location = this.state.location;
    cite.ticket = this.state.ticket;
    cite.date = this.state.date;
    cite.time = this.state.time;
    cite.officer = this.state.officer;
    this.props.update(cite);
  }
  
  render() {
    let button;
    if(!validator(this.state)){
      console.log('Input is now false');
      button = (
        <button 
          className="btn btn-primary disabled"
          type="submit" 
          data-dismiss="modal">
          Update
        </button>
      );
    }else{
      button = (
        <button 
          className="btn btn-primary"
          onClick={this.handleUpdate} 
          type="submit" 
          data-dismiss="modal">
          Update
        </button>
      );
    }
    return (
      <div className="modal fade" id={this.props.id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                {this.state.ticket ? this.state.ticket : "No number"}
              </h4>
              <span className="glyphicon glyphicon-remove pull-right" data-dismiss="modal"></span>
            </div>
            <div className="modal-body">
              <form className="form-group" >
                <input 
                  className="form-control" 
                  name="tag" 
                  placeholder="Tag" 
                  value={this.state.tag} 
                  onChange={this.handleInputChange}
                />
                <input 
                  className="form-control" 
                  name="make" 
                  placeholder="Make"  
                  value={this.state.make}
                  onChange={this.handleInputChange}
                />
                <input 
                  className="form-control" 
                  name="model" 
                  placeholder="Model"  
                  value={this.state.model}
                  onChange={this.handleInputChange}
                />
                <input 
                  className="form-control" 
                  name="color" 
                  placeholder="Color"  
                  value={this.state.color}
                  onChange={this.handleInputChange}
                />
                <input 
                  className="form-control" 
                  name="state" 
                  placeholder="State"  
                  value={this.state.state}
                  onChange={this.handleInputChange}
                />
                <input 
                  className="form-control" 
                  name="year" 
                  placeholder="Year"  
                  value={this.state.year}
                  onChange={this.handleInputChange}
                />
                <input 
                  className="form-control" 
                  name="violation" 
                  placeholder="Violation(s)"  
                  value={this.state.violation}
                  onChange={this.handleInputChange}
                />
                <input 
                  className="form-control" 
                  name="location" 
                  placeholder="Location"  
                  value={this.state.location}
                  onChange={this.handleInputChange}
                />
                <input 
                  className="form-control" 
                  name="ticket" 
                  placeholder="Ticket"  
                  value={this.state.ticket}
                  onChange={this.handleInputChange}
                />
                <input 
                  className="form-control" 
                  name="employee" 
                  placeholder="Employee #"  
                  value={this.state.employee}
                  onChange={this.handleInputChange}
                />
                <input 
                  className="form-control" 
                  name="date" 
                  placeholder="Date"  
                  value={this.state.date}
                  onChange={this.handleInputChange}
                />
                <input 
                  className="form-control" 
                  name="time" 
                  placeholder="Time"  
                  value={this.state.time}
                  onChange={this.handleInputChange}
                />
                <input 
                  className="form-control" 
                  name="officer" 
                  placeholder="Officer"  
                  value={this.state.officer.name}
                  onChange={this.handleInputChange}
                />
                <input 
                  className="form-control" 
                  name="unit" 
                  placeholder="Unit #"  
                  value={this.state.officer.unit}
                  onChange={this.handleInputChange}
                />
                <div className="modal-footer">
                  {button}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );    
  }
}