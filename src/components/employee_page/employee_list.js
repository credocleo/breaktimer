import React, { Component } from 'react';
import $ from 'jquery';
import loadingGif from './loading.gif';

class Employee_list extends Component {
	constructor(props){
		super(props);
		this.state ={
			employees : [],
			loadComplete : null
		};

		this.searchEmployee = this.searchEmployee.bind(this);
	}

	successFunction(data){
		console.log('nasulod dre');
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
				console.log('success searchEmployee');
			}.bind(this)
		});
	}

	render(){
		var names_employees = this.props.employees;
		var listOfemployees = names_employees.map((data,i)=>{
			return	<tbody key={data.empIdNum}>
						<tr>
							<td >Employee Id:</td>
							<td>{data.empIdNum}</td>
							<td>Name:</td>
							<td>{data.name}</td>
							<td>
								<button>Update</button>
							</td>
							<td>
								<button>Delete</button>
							</td>
						</tr>
					</tbody>
			
		});

		if(this.state.loadComplete == false){
			return <img id="loading-image" alt="Loading" src={loadingGif} />
		} else {
			var listOfemployees = this.state.employees
			return(
					<div>
						<form onSubmit={this.searchEmployee}>
							<label htmlFor="emp_search">Search for employee:   </label>
							<input type="search" id="emp_search" placeholder="Search for Employee" />
							<input type="submit" value="Submit" />
						</form>
							<table>
							{listOfemployees}
							</table>
						
					</div>
			);
		}
	}
}

export default Employee_list;