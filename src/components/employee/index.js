import React, { Component } from 'react';
import Employee_list from './list.js';
import SearchForm from './search_form.js';
import $ from 'jquery';
import AddEmployeeForm from './add_employee_form';

class Employee_page extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      employees : [],
      empIdNum : 0
    };
    this.searchEmployee = this.searchEmployee.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
    this.toInsertValue = this.toInsertValue.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  successFunction(data){
    this.setState({
      employees: data,
      loadComplete : true
    });
  }

  searchEmployee(e){
    e.preventDefault();
    var Murl = 'http://localhost:4000/searchemployee/name/'+$('#emp_search').val()
    console.log(Murl);
    this.setState({
      loadComplete : false
    });
    $.ajax({
      type:'GET',
      url: Murl,
      cache: false,
      success: function(data){
        var objecttoText = JSON.parse(data);
        this.successFunction(objecttoText);
      }.bind(this)
    });
  }

  getInputValue(event){
    this.setState({
      name : event.target.value
    });

    console.log(event.target.value);
  }

  toInsertValue(e){
    e.preventDefault();
    this.setState({
          name: ''
        });
    $.ajax({
      type: 'POST',
      data: {name : this.state.name},
      url: 'http://localhost:4000/insert',
      complete: function(data){

        this.fetchData;
      }.bind(this)
    });
  }

  componentDidMount(){
    this.fetchData();
    
  }

  fetchData(){
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
      
        <SearchForm onSearch={this.searchEmployee} />
        <Employee_list employees={this.state.employees} />
        <AddEmployeeForm onAdd={this.toInsertValue} onCatch={this.getInputValue} val={this.state.name}/>
        
      </div>
    );
  }

}

export default Employee_page;  
