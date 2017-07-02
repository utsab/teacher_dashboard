import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {editAStudent, showModalFuncEdit} from 'redux/modules/classForm';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

function mapStateToProps(state) {
  return {
    showModal: state.classForm.showModal,
    studentList: state.classForm.studentList,
    firstName: state.classForm.firstName,
    lastName: state.classForm.lastName,
    github: state.classForm.github,
    email: state.classForm.email,
    notes: state.classForm.notes,
    errors: state.classForm.error,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({editAStudent: editAStudent, showModalFuncEdit: showModalFuncEdit}, dispatch);
}

@connect(mapStateToProps, matchDispatchToProps)

export default class EditStudent extends Component {
  static propTypes = {
    editAStudent: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
    showModal: PropTypes.bool,
    close: PropTypes.func,
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    github: PropTypes.string,
    email: PropTypes.string,
    notes: PropTypes.string,
    showModalFuncEdit: PropTypes.func,
    studentId: PropTypes.string,
    errors: PropTypes.array
  }

  onSubmitForm = (event) => {
    this.close();
    this.editStudent(event);
  }

  editStudent = (event) => {
    event.preventDefault();
    const studentEmail = this.refs.studentEmail;
    const github = this.refs.github;
    const firstname = this.refs.firstname;
    const lastname = this.refs.lastname;
    const notes = this.refs.notes;
    this.props.editAStudent(studentEmail.value, github.value, firstname.value, lastname.value, notes.value, this.props.studentId);
    studentEmail.value = '';
    github.value = '';
    firstname.value = '';
    lastname.value = '';
    notes.value = '';
  }

  close = () => {
    this.props.showModalFuncEdit(false);
  }

  handleChangeFirstName(event) {
    debugger;
    this.props.firstName = event.target.value;
  }

  render() {
    const styles = require('containers/ManageClass/ManageClass.scss');

    return (
      <Modal show={this.props.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className={styles.backdropStyle}>
          <div className={styles.modalStyle}>
            <ul>
              {this.props.errors && this.props.errors.map(function test(error) {
                return <li>{error}</li>;
              })}
            </ul>

            <form >
              First name<br/>
              <input type="text" ref="firstname" className="form-control" defaultValue={this.props.firstName} onChange={this.handleChangeFirstName.bind(this)}/>
              <br/>
              Last name<br/>
              <input type="text" ref="lastname" className="form-control" defaultValue={this.props.lastName} />
              <br/>
              Student Email<br/>
              <input type="text" ref="studentEmail" className="form-control" defaultValue={this.props.email} />
              <br/>
              Github Username<br/>
              <input type="text" ref="github" className="form-control" defaultValue={this.props.github} />
              <br/>
              Notes<br/>
              <input type="text" ref="notes" className="form-control" defaultValue={this.props.notes} />
              <br/>
              <br/>
              <input onClick={this.onSubmitForm} type="submit" value="Submit"/>
              <br/>
              <br/>
            </form>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

