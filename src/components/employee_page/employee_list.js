import React, { Component } from 'react';

class Employee_list extends Component {
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
		return(
				<div>
					<table>
						{listOfemployees}
					</table>
				</div>
			);
	}
}

export default Employee_list;