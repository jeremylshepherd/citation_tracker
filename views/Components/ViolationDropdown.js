import React from 'react';

var ViolationDropdown = React.createClass({
  render: function() {
    return (
      <div className="VioDrop">
        <div className="dropdown-toggle" id="VioDrop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <h3>
            <span className="btn btn-default">Violation Codes<span className="caret"></span></span>
          </h3>
        </div>
          <ul className="dropdown-menu" aria-labelledby="VioDrop">
            <li>1.  NO PARKING ZONE</li>
            <li>2.  RESERVED SPACE</li>
            <li>3.  BLOCKING DRIVEWAY</li>
            <li>4.  EMERGENCY DRIVEWAY</li>
            <li>5.  WITHIN 10 (TEN) FEET OF A FIRE HYDRANT</li>
            <li>6.  PARKING WITHOUT A PERMIT</li>
            <li>7.  PARKING IN AN UNASSIGNED SPACE</li>
            <li>8.  PARKING IN A LOADING DOCK AREA</li>
            <li>9.  DOUBLE PARKING</li>
            <li>10. WITHIN AN INTERSECTION</li>
            <li>11. EXCEEDING TIME LIMIT</li>
            <li>12. IN A FIRE LANE</li>
            <li>13. NO "H" STICKER</li>
            <li>14. OTHER</li>
          </ul>
      </div>
    );
  }
});

module.exports = ViolationDropdown;