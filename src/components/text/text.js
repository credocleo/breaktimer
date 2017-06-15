import React, { Component } from 'react';

class Text extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      second: 0,
      name: '',
      employees : []
    };
    setInterval(() => this.myTime(),1000);
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
          employees: responseJson
        });
      })
      .catch((error) => {
        console.error(error);
      });

    }catch(error){
      console.error(error);
    }
    
    setInterval(() => this.myTime(),1000);
  }

  myTime(){
    let time = this.state.second +1;
    this.setState({
      second : time}
      );
  }

  render() {
    var employees = this.state.employees.map((data)=>{
      return <tr><td>Name:</td><td>{data.name}</td></tr>
    })
    return (
      <div>
        <h1>Name: {this.state.name}</h1>
        <table>
        {employees}
        </table>
        <h1>Time: {this.state.second}</h1>
      </div>
    );
  }

}

export default Text;  
