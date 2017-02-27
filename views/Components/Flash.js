import React from 'react';

export default class Flash extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let style = this.props.success ? "alert-success" :  "alert-danger";
        let icon = this.props.success ? "fa fa-hand-spock-o" : "fa fa-hand-stop-o";
        return (
            <div className={`alert ${style} col-xs-12`} role="alert">
                <span className={icon}></span>
                {this.props.message}
            </div>
        );
    }
}