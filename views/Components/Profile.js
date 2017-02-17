import React from 'react';
import {Link, browserHistory} from 'react-router';
import Header from './Header';
import Citations from './Citations';
import CitationUpdateForm from './CitationUpdateForm;'
import $ from 'jquery';


class Profile extends React.Component {
    constructor() {
        super();
        
        this.state = {
            _id: '',
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
              _id: data._id
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
              created: data.created,
              username: data.username,
              email: data.email
            });
            if(this.state._id === data.citations[0].creator){
                this.setState({
                    auth: true
                });
            }    
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(`/users/${this.props.params.user}`, status, err.toString());
        }.bind(this)
      });
    }
    
    editCite(cite) {
        $.ajax({
          url: `/api/update/${cite.ticket}`,
          type: 'post',
          dataType: 'json',
          data: cite,
          success: function(data) {
            this.getUserCitations();
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(`/api/update/${cite.ticket}`, status, err.toString());
          }.bind(this)
        });
    }
    
    componentDidMount() {
        this.getUser();
        this.getUserCitations();
    }
    
    render() {
        let date = new Date (this.state.created);
        date = date.toLocaleDateString('en-us');
        let CiteForms = this.state.citations.map((c, i) => {
            return (
                <CitationUpdateForm  key={i} {...c} update={this.editCite}/>
            );
        });
        return (
            <div>
                <Header user={this.state.user}/>
                <h3 className="text-left">User: {this.state.username}</h3>
                <h3 className="text-left">Email: {this.state.email}</h3>
                <h3 className="text-left">Since: {date}</h3>
                <br/>
                <h3 className="text-left">Citations: {this.state.citations.length}</h3>
                <Citations data={this.state.citations} auth={this.state.auth}/>
                {CiteForms}
            </div>
        );
    }
}

export default Profile;