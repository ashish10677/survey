import React, { Component } from 'react';
import './App.css';
var firebase = require('firebase');
var uuid = require('uuid');

var config = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "simple-survey-69e60.firebaseapp.com",
  databaseURL: "https://simple-survey-69e60.firebaseio.com",
  projectId: "simple-survey-69e60",
  storageBucket: "simple-survey-69e60.appspot.com",
  messagingSenderId: "537266377007"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : uuid.v1(),
      name : '',
      answers : {
        q1 : '',
        q2 : '',
        q3 : '',
        q4 : ''
      },
      submitted : false
    };
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }
  handleNameSubmit(event) {
    var name = this.refs.name.value;
    this.setState({name : name});
    event.preventDefault();
  }
  handleQuestionSubmit(event) {
    firebase.database().ref('surveys/'+this.state.id).set({
      name : this.state.name,
      answers : this.state.answers
    });
    this.setState({submitted:true}, function() {
      console.log("Questions submitted..........!!");
    })
    event.preventDefault();
  }
  handleQuestionChange(event) {
    var answers = this.state.answers;
    if(event.target.name === 'q1') {
      answers.q1 = event.target.value;
    }
    else if(event.target.name === 'q2') {
      answers.q2 = event.target.value;
    }
    else if(event.target.name === 'q3') {
      answers.q3 = event.target.value;
    }
    else if(event.target.name === 'q4') {
      answers.q4 = event.target.value;
    }

    this.setState({answers:answers}, function() {
      console.log(this.state);
    });
  }
  render() {
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false) {
      user = <span>
        <h2>Welcome {this.state.name}</h2>
      </span>;
      questions = <span>
        <h3>Survey question</h3>
        <form onSubmit={this.handleQuestionSubmit.bind(this)}>
          <div>
            <label>What is your favourite operating system?</label>
            <br />
            <input type="radio" name="q1" value="Windows" onChange={this.handleQuestionChange} />Windows<br/>
            <input type="radio" name="q1" value="Ubuntu" onChange={this.handleQuestionChange} />Ubuntu<br/>
            <input type="radio" name="q1" value="Fedora" onChange={this.handleQuestionChange} />Fedora<br/>
            <input type="radio" name="q1" value="Mac OS" onChange={this.handleQuestionChange} />Mac OS<br/>
          </div>
          <div>
            <label>What is your favorite brand of TV?</label><br />
            <input type="radio" name="q2" value="Sony" onChange={this.handleQuestionChange} />Sony<br />
            <input type="radio" name="q2" value="Samsung" onChange={this.handleQuestionChange} />Samsung<br />
            <input type="radio" name="q2" value="Panasonic" onChange={this.handleQuestionChange} />Green<br />
            <input type="radio" name="q2" value="Vizio" onChange={this.handleQuestionChange} />Vizio<br />
            <input type="radio" name="q2" value="Other" onChange={this.handleQuestionChange} />Other<br />
          </div>
          <div>
            <label>What is your favorite Smartphone Brand?</label><br />
            <input type="radio" name="q3" value="Apple" onChange={this.handleQuestionChange} />Apple<br />
            <input type="radio" name="q3" value="Samsung" onChange={this.handleQuestionChange} />Samsung<br />
            <input type="radio" name="q3" value="Nexus" onChange={this.handleQuestionChange} />Nexus<br />
            <input type="radio" name="q3" value="Blackberry" onChange={this.handleQuestionChange} />Blackberry<br />
            <input type="radio" name="q3" value="Other" onChange={this.handleQuestionChange} />Other<br />
          </div>
          <div>
            <label>What is your favorite CPU Brand?</label><br />
            <input type="radio" name="q4" value="Intel" onChange={this.handleQuestionChange} />Intel<br />
            <input type="radio" name="q4" value="AMD" onChange={this.handleQuestionChange} />AMD<br />
            <input type="radio" name="q4" value="Nvidia" onChange={this.handleQuestionChange} />Nvidia<br />
            <input type="radio" name="q4" value="ARM" onChange={this.handleQuestionChange} />ARM<br />
            <input type="radio" name="q4" value="Other" onChange={this.handleQuestionChange} />Other<br />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </span>;
    }
    else if(!this.state.name && this.state.submitted === false) {
      user = <span>
        <h2>Enter your name to begin with</h2>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <input type="text" placeholder="Enter your name" ref="name" />
          <br /><br />
          <input type="submit" value="Submit"/>
        </form>
      </span>;
      questions = '';
    }
    else if(this.state.submitted === true) {
      user = <h2>Thank you {this.state.name}</h2>
    }
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title" className="main">Survey</h1>
        </header>
        <div className="main">
          {user}
        </div>
        <div className="container">
          {questions}
        </div>
      </div>
    );
  }
}

export default App;
