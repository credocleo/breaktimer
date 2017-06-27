import React, { Component } from 'react';

class SearchForm extends Component{
	


	render(){
		return(
			<div>
				<form onSubmit={this.props.onSearch}>
					<input type='text' id="emp_search" placeholder='Search'/>
					<input type='submit' value='Search' /> 
				</form>
			</div>

		);

	}

}

export default SearchForm;