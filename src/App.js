import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : '',
      name : '',
      answers : {
        q1 : '',
        q2 : '',
        q3 : '',
        q4 : ''
      },
      submitted : false
    };
  }
  handleNameSubmit(event) {
    var name = this.refs.name.value;
    this.setState({name : name}, function() {
      console.log(this.state);
    });
    event.preventDefault();
  }
  render() {
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false) {
      user = <span>
        <h2>Welcome {this.state.name}</h2>
      </span>;
      questions = '';
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

    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Survey</h1>
        </header>
        {user}
      </div>
    );
  }
}

export default App;
