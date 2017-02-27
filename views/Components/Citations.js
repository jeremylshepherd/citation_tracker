import React from 'react';
import {Link} from 'react-router';
import {expired, queryCheck, compare } from '../../src/helpers.js';

var Citations = React.createClass({
  getInitialState: function(){
    return ({
      desc: false,
      sortParam: 'date'
    });
  },
  
  setSortParam: function(e) {
    let target = e.target;
    let name = target.innerHTML;
    name = name.toLowerCase();
    if(name == 'license') {
      name = 'tag';
    }
    
    if(name == 'employee #') {
      name = 'employee';
    }
    
    if(name == 'ticket #') {
      name = 'ticket';
    }
    
    this.setState({
      sortParam: name,
      desc: !this.state.desc
    });
  },
  
  render: function() {
    let data = this.props.data.sort((a, b) => {
      let param = this.state.sortParam;
      if(param == 'unit') {
        return compare(a['officer'][param], b['officer'][param]); //To make work with nested data object on 'unit'
      }
      return compare(a[param], b[param]);
    });
    if(this.state.desc) {
      data = data.reverse();
    }
    let citationNodes = data.map((x, i) =>{
      let clName = expired(x.date) ? 'danger' : '';
      let link = `/${x.ticket}`;
      return (
        <tr key={i} className={clName}>
          <td>{x.tag}</td>
          <td>{x.state}</td>
          <td>{x.make}</td>
          <td>{x.model}</td>
          <td>{x.color}</td>
          <td>{x.year}</td>
          <td>{x.violation.join(', ')}</td>
          <td><Link to={link}>{x.ticket}</Link></td>
          <td>{x.employee}</td>
          <td>{x.date}</td>
          <td>{x.officer.unit}</td>
        </tr>
      );
    });
    return (
      <div>
          <table className="table table-striped table-hover table-bordered table-responsive">
            <thead>
              <tr>
                <td onClick={this.setSortParam}>License</td>
                <td onClick={this.setSortParam}>State</td>
                <td onClick={this.setSortParam}>Make</td>
                <td onClick={this.setSortParam}>Model</td>
                <td onClick={this.setSortParam}>Color</td>
                <td onClick={this.setSortParam}>Year</td>
                <td onClick={this.setSortParam}>Violation</td>
                <td onClick={this.setSortParam}>Ticket #</td>
                <td onClick={this.setSortParam}>Employee #</td>
                <td onClick={this.setSortParam}>Date</td>
                <td onClick={this.setSortParam}>Unit</td>
              </tr>
            </thead>
            <tbody>
              {citationNodes}
            </tbody>
          </table>
        </div>
    );
  }
});

module.exports = Citations;