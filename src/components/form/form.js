import React, { Component } from 'react';
import $ from 'jquery';

class Form extends Component {

	constructor(props) {
		super(props);
		this.state = {
			employee_name : ' '
		};

		this.showAlert = this.showAlert.bind(this);
		this.getInputValue = this.getInputValue.bind(this);
		this.toInsertValue = this.toInsertValue.bind(this);
	}

	showAlert(e){
		e.preventDefault();
		var emp_name = this.state.employee_name;
		alert(emp_name);	
	}

	getInputValue(event){
		this.setState({
			employee_name : event.target.value
		});
		console.log(event.target.value);
	}

	toInsertValue(e){
		e.preventDefault();
		console.log('test insertvalue');
		$.ajax({
			type: 'POST',
			data: {name : this.state.employee_name},
			url: 'http://localhost:4000/insert',
			success: function(data){
				alert(JSON.stringify(data));
			}
		});
	}


	render(){
		return (
			<div>
				<form onSubmit={this.toInsertValue}>
					Add Employee: <br/>
					<input type="text" id="employeeName" className="employee" placeholder="employee" value={this.state.employee_name} onChange={this.getInputValue}/>
					<br />
					<br />
					<input type="submit" value="Add Employee"/>

				</form>
			</div>
		);
	}
}

export default Form;