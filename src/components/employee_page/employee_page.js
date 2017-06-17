import React, { Component } from 'react';
import Employee_list from './employee_list.js';

class Employee_page extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      employees : [],
      empIdNum : 0
    };
  }

  componentDidMount(){
    let url = "http://localhost:4000/employees"
    let proxy = "http://cors-anywhere.herokuapp.com/"
    try{
      // let response = fetch('http://localhost:4000/name/kent');
      // let responseJson = response.json();
      // console.log('componentDidMount test');
      // console.log(responseJson);

      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        this.setState({
          name : "testing",
          employees: responseJson,
          empIdNum: responseJson
        });
      })
      .catch((error) => {
        console.error(error);
      });

    }catch(error){
      console.error(error);
    }
    
  }

  render() {
    return (
      <div>
        <Employee_list employees={this.state.employees} />
      </div>
    );
  }

}

export default Employee_page;  
