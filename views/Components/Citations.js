import React from 'react';
import {Link} from 'react-router';
import {expired, queryCheck } from '../../src/helpers.js';

var Citations = React.createClass({
  render: function() {
    let citationNodes = this.props.data.map((x, i) =>{
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
                <td>License</td>
                <td>State</td>
                <td>Make</td>
                <td>Model</td>
                <td>Color</td>
                <td>Year</td>
                <td>Violation</td>
                <td>Ticket #</td>
                <td>Employee #</td>
                <td>Date</td>
                <td>Unit</td>
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