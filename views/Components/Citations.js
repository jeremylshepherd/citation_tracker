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
    let headers = ['tag', 'state', 'make', 'model', 'color', 'year', 'violation', 'ticket', 'employee', 'date', 'unit'];
    let headerNodes = headers.map((h, i) => {
        let style = this.state.sortParam == h ? "bg-info" : "";
        let name = h == 'tag' ? 'license' : h;
        name = name.toUpperCase();
        return (
          <th className={style} onClick={this.setSortParam}>{name}</th>
        );
    });
    
    return (
      <div className="table-responsive">
          <table className="table table-striped table-hover table-condensed">
            <thead>
              <tr>
                {headerNodes}
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