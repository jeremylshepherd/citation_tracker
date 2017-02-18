import React from 'react';
import {Link, browserHistory} from 'react-router';
import Header from './Header';
import Citations from './Citations';
import CitationUpdateForm from './CitationUpdateForm';
import $ from 'jquery';


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            _id: '',
            user: {},
            username: '',
            email: '',
            auth: false,
            edit: false,
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
              _id: data._id,
              auth: true
            });
            console.log('User got!');
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/api/me', status, err.toString());
          browserHistory.push('/');
        }.bind(this)
      });
    }
    
    getUserCitations() {
        let user = this.props.params.user || this.state.username;
        $.ajax({
        url: `/api/users/${user}` ,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({
              citations: data.citations,
              created: data.created,
              username: data.username,
              email: data.email,
              edit: data.edit
            });   
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(`/users/${user}`, status, err.toString());
        }.bind(this)
      });
    }
    
    editCite(obj) {
        $.ajax({
          url: `/api/update/${obj.ticket}`,
          dataType: 'json',
          type: 'POST',
          data: obj,
          success: (res) => {
              console.log(res.message);
          },
          error: (xhr, status, err) => {
            console.error(`/api/update/${obj.ticket}`, status, err.toString());
          }
        });
    }
    
    componentDidMount() {
        this.getUser();
        this.timer = setInterval(this.getUserCitations.bind(this), 2000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    
    render() {
        let date = new Date (this.state.created);
        date = date.toLocaleDateString('en-us');
        let CiteForms = this.state.citations.map((c, i) => {
            return (
                <CitationUpdateForm  key={i} {...c} update={this.editCite} id={`citation${i}`}/>
            );
        });
        return (
            <div>
                <Header user={this.state.user}/>
                <h3 className="text-left" >User: {this.state.username}</h3>
                <h3 className="text-left">Email: {this.state.email}</h3>
                <h3 className="text-left">Since: {date}</h3>
                <br/>
                <h3 className="text-left">Citations: {this.state.citations.length}</h3>
                <Citations data={this.state.citations} auth={this.state.edit}/>
                {CiteForms}
            </div>
        );
    }
}