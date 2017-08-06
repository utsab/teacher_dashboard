import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addStudent, showModalFunc} from 'redux/modules/classForm';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

function mapStateToProps(state) {
  return {
    studentList: state.classForm.studentList,
    errors: state.classForm.error,
    showModal: state.classForm.showAddStudentModal
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    addStudent: addStudent,
    showModalFunc: showModalFunc
  }, dispatch);
}

@connect(mapStateToProps, matchDispatchToProps)

export default class ClassForm extends Component {
  static propTypes = {
    addStudent: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
    showModal: PropTypes.bool,
    close: PropTypes.func,
    showModalFunc: PropTypes.func,
    errors: PropTypes.array
  }

  onSubmitForm = (event) => {
    this.addNewStudent(event);
  }

  addNewStudent = (event) => {
    event.preventDefault();
    const studentEmail = this.refs.studentEmail;
    const github = this.refs.github;
    const firstname = this.refs.firstname;
    const lastname = this.refs.lastname;
    const notes = this.refs.notes;
    this.props.addStudent(studentEmail.value, github.value, firstname.value, lastname.value, notes.value);
  }

  close = () => {
    this.props.showModalFunc(false);
  }

  render() {
    const styles = require('containers/ManageClass/ManageClass.scss');
    return (
      <Modal show={this.props.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className={styles.backdropStyle}>
          <div className={styles.modalStyle}>
            <ul>
              {this.props.errors && this.props.errors.map(function test(error) {
                return <li>{error}</li>;
              })}
            </ul>
            <form>
              First name<br/>
              <input type="text" ref="firstname" className="form-control"/>
              <br/>
              Last name<br/>
              <input type="text" ref="lastname" className="form-control"/>
              <br/>
              Student Email<br/>
              <input type="text" ref="studentEmail" className="form-control"/>
              <br/>
              Github Username<br/>
              <input type="text" ref="github" className="form-control"/>
              <br/>
              Notes<br/>
              <input type="text" ref="notes" className="form-control"/>
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

