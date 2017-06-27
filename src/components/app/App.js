import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Text from '../text/text.js';
import AddEmployeeForm from '../employee/add_employee_form.js';
import Employee_page from '../employee/index.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
       
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and saveu to reload.
        </p>
        <Text />
        <Employee_page />
      </div>
    );
  }
}

export default App;
