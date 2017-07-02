import React, { Component } from 'react';
import loadingGif from './loading.gif';
import $ from 'jquery';
import DeleteButton from './delete.js';
import ModalUpdate from './update.js';

class Employee_list extends Component {
	constructor(props){
		super(props);
		this.state ={
			id_emp : 0,
			employees : [],
			loadComplete : null,
			modalIsOpen : false,
			name: ' ',
			modalStatus: ''
		};
		this.deleteEmployee = this.deleteEmployee.bind(this);
		//this.getValueForUpdate = this.getValueForUpdate.bind(this);
	}

	deleteEmployee(employee){
		let delete_url = "http://localhost:4000/delete";
		let proxy = "http://cors-anywhere.herokuapp.com/";
		var empIdNum = employee.empIdNum;
		$.ajax({
			type: 'POST',
			data: {employee_id : empIdNum},
			url: delete_url,
			complete: function(data){

			}
		});
	}

	openModal(id,empname){
		this.setState({
			modalIsOpen : true,
			id_emp : id,
			name: empname,
			modalStatus : 'edit'
		});
	}

	statusToDone(){
		this.setState({
			modalStatus :  'done'
		});
	}

	closeModal(){
		this.setState({modalIsOpen : false});
	}

	getValueForUpdate(event){
    this.setState({
      name : event.target.value
    });
  }

	render(){
		var names_employees = this.props.employees;
		var listOfemployees = names_employees.map((data,i)=>{
			return	<tbody key={data.empIdNum}>
						<tr>
							<td>{data.empIdNum}</td>
							<td>{data.name}</td>
							<td>
								<button onClick = {()=>this.openModal(data.empIdNum, data.name)} >
									Update
								</button>
								<DeleteButton onDelete={()=>this.deleteEmployee(data)} />
							</td>
						</tr>
					</tbody>			
		});
		return(
			<div>
				<table>
					<thead>
						<tr>
							<th> ID </th>
							<th> Name of Employee </th>
							<th> Actions </th>
						</tr>
					</thead>
					{listOfemployees}
				</table>
				<ModalUpdate changeToDone={()=>this.statusToDone()} inputModal={(e)=>this.getValueForUpdate(e)} name_of_emp={this.state.name} status={this.state.modalStatus} id_of_emp={this.state.id_emp} isOpen={this.state.modalIsOpen} onOpen={this.openModal} close={()=>this.closeModal()} />
			</div>
		);
		
	}
}

export default Employee_list;