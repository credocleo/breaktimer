import React, { Component } from 'react';

class DeleteButton extends Component{
	render(){
		return(
			<button onClick={this.props.onDelete}>Delete</button>
			);
	}
} 

export default DeleteButton;