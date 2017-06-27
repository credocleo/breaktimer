import React, { Component } from 'react';

class AddEmployeeForm extends Component {

	render(){
		return (
			<div>
				<form onSubmit={this.props.onAdd}>
					Add Employee: <br/>
					<input type="text" id="employee_name" className="employee" placeholder="employee" onChange={this.props.onCatch} value={this.props.val}/>
					<br />
					<br />
					<input type="submit" value="Add Employee"/>

				</form>
			</div>
		);
	}
}

export default AddEmployeeForm;