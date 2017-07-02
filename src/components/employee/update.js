import React, { Component } from 'react';
import Modal from 'react-modal';
import $ from 'jquery';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  } 
};
 
class ModalUpdate extends Component {
  constructor(props){
    super(props);
    this.state = {
      update_success_msg : '',
      update_success_flag : false
    }
    
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed. 
    this.subtitle.style.color = '#f00';
  }


  updateEmployee(e){
    e.preventDefault();
    console.log('update employee test')
    let update_url = "http://localhost:4000/update";
    let proxy = "http://cors-anywhere.herokuapp.com/";
    $.ajax({
      type: 'POST',
      data: {
        name          : this.props.name_of_emp,
        employee_id   : this.props.id_of_emp
      },
      url: update_url,
      complete: function(data){
        console.log(JSON.stringify(data));
        this.props.changeToDone();
      }.bind(this)

     
    });
  }




  render() {
     let name_emp = this.props.name_of_emp;
     let num_emp  = this.props.id_of_emp;
     let catchInput = this.props.inputModal;
     var content = null;
     var success_content = <form><p>Employee info updated</p><button onClick={this.props.close}>close</button></form>
     var updateForm = <form onSubmit={(e)=>this.updateEmployee(e)}>
                        <label>ID: {num_emp}</label>
                        <br />
                        <label> Name of Employee </label>
                          <input type='text' value={name_emp} onChange={catchInput} />
                        <br />
                        <button type='submit' id="modalUpdateButton">update</button>
                        
                      </form>
      
      if(this.props.status == 'edit'){
        content = updateForm;
      }else{
        content = success_content;
      }
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onAfterOpen={()=>this.afterOpenModal()}
          onRequestClose={this.props.close}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}>Update Employee Details</h2>
          {content}
        </Modal>
      </div>
    );
  }
}

export default ModalUpdate;
