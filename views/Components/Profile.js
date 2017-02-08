import React from 'react';
import {Link, browserHistory} from 'react-router';
import Header from './Header';
import Citations from './Citations';
import $ from 'jquery';


class Profile extends React.Component {
    constructor() {
        super();
        
        this.state = {
            user: {},
            username: '',
            email: '',
            auth: false,
            citations: [],
            created: ''
        };
    }
    
    getUser() {
        $.ajax({
        url: '/api/me',
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({
              user: data,
              username: data.local.username,
              email: data.local.email,
              auth: true
            });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/api/me', status, err.toString());
          browserHistory.push('/');
        }.bind(this)
      });
    }
    
    getUserCitations() {
        $.ajax({
        url: `/api/users/${this.props.params.user}` ,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({
              citations: data.citations,
              created: data.created
            });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(`/users/${this.props.params.user}`, status, err.toString());
        }.bind(this)
      });
    }
    
    componentDidMount() {
        this.getUser();
        this.getUserCitations();
    }
    
    render() {
        var date = new Date (this.state.created);
        date = date.toLocaleDateString('en-us');
        return (
            <div>
                <Header user={this.state.user}/>
                <h3 className="text-left">User: {this.state.username}</h3>
                <h3 className="text-left">Email: {this.state.email}</h3>
                <h3 className="text-left">Since: {date}</h3>
                <br/>
                <h3 className="text-left">Citations: {this.state.citations.length}</h3>
                <Citations data={this.state.citations} />
            </div>
        );
    }
}

export default Profile;