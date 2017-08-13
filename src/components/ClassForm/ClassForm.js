import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addStudent, showModalFunc} from 'redux/modules/classForm';
import * as ReactBootstrap from 'react-bootstrap';

function mapStateToProps(state) {
  return {
    studentList: state.classForm.studentList,
    showModal: state.classForm.showModal
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({addStudent: addStudent, showModalFunc: showModalFunc}, dispatch);
}

@connect(mapStateToProps, matchDispatchToProps)

export default class ClassForm extends Component {
  static propTypes = {
    addStudent: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
    showModal: PropTypes.bool,
    close: PropTypes.func,
    showModalFunc: PropTypes.func
  }

  onSubmitForm = (event) => {
    this.close();
    this.addNewStudent(event);
  }

  addNewStudent = (event) => {
    event.preventDefault();
    const studentEmail = this.studentEmail.value;
    const github = this.github.value;
    const firstname = this.firstname.value;
    const lastname = this.lastname.value;
    const notes = this.notes.value;
    this.props.addStudent(studentEmail, github, firstname, lastname, notes);
  }

  close = () => {
    this.props.showModalFunc(false);
  }

  render() {
    const styles = require('./ClassForm.scss');
    return (
      <ReactBootstrap.Modal show={this.props.showModal} onHide={this.close} className={styles.appForm}>
        <ReactBootstrap.Modal.Header closeButton className={styles.modalHeader}>
          <ReactBootstrap.Modal.Title className={styles.modalTitle}>Add Student</ReactBootstrap.Modal.Title>
        </ReactBootstrap.Modal.Header>
        <ReactBootstrap.Modal.Body>
        <div className={styles.backdropStyle}>
          <div className={styles.modalStyle}>
            <ReactBootstrap.Form horizontal>
               <ReactBootstrap.FormGroup controlId="formHorizontalEmail">
                <ReactBootstrap.Col componentClass={ReactBootstrap.ControlLabel} sm={4}>
                  Student's Email
                </ReactBootstrap.Col>
                <ReactBootstrap.Col sm={6}>
                  <ReactBootstrap.FormControl type="text" inputRef={(ref) => {this.studentEmail = ref;}} />
                </ReactBootstrap.Col>
              </ReactBootstrap.FormGroup>

              <ReactBootstrap.FormGroup controlId="formHorizontalGithub">
                <ReactBootstrap.Col componentClass={ReactBootstrap.ControlLabel} sm={4}>
                  Github Username
                </ReactBootstrap.Col>
                <ReactBootstrap.Col sm={6}>
                  <ReactBootstrap.FormControl type="text" inputRef={(ref) => {this.github = ref;}} />
                </ReactBootstrap.Col>
              </ReactBootstrap.FormGroup>

              <ReactBootstrap.FormGroup controlId="formHorizontalFirstName">
                <ReactBootstrap.Col componentClass={ReactBootstrap.ControlLabel} sm={4}>
                  First Name
                </ReactBootstrap.Col>
                <ReactBootstrap.Col sm={6}>
                  <ReactBootstrap.FormControl type="text" inputRef={(ref) => {this.firstname = ref;}} />
                </ReactBootstrap.Col>
              </ReactBootstrap.FormGroup>
              <ReactBootstrap.FormGroup controlId="formHorizontalLastName">
                <ReactBootstrap.Col componentClass={ReactBootstrap.ControlLabel} sm={4}>
                  Last Name
                </ReactBootstrap.Col>
                <ReactBootstrap.Col sm={6}>
                  <ReactBootstrap.FormControl type="text" inputRef={(ref) => {this.lastname = ref;}} />
                </ReactBootstrap.Col>
              </ReactBootstrap.FormGroup>

              <ReactBootstrap.FormGroup controlId="formHorizontalNotes">
                <ReactBootstrap.Col componentClass={ReactBootstrap.ControlLabel} sm={4}>
                  Notes
                </ReactBootstrap.Col>
                <ReactBootstrap.Col sm={6}>
                  <ReactBootstrap.FormControl type="text" inputRef={(ref) => {this.notes = ref;}} />
                </ReactBootstrap.Col>
              </ReactBootstrap.FormGroup>

              <ReactBootstrap.FormGroup>
                <ReactBootstrap.Col smOffset={3} sm={6}>
                  <ReactBootstrap.Button className={styles.cancelButton} onClick={this.close}>Cancel</ReactBootstrap.Button>
                  <ReactBootstrap.Button className={styles.submitButton} type="submit" onClick={this.onSubmitForm}>Add Student</ReactBootstrap.Button>
                </ReactBootstrap.Col>
              </ReactBootstrap.FormGroup>
            </ReactBootstrap.Form>
          </div>
        </div>
        </ReactBootstrap.Modal.Body>
      </ReactBootstrap.Modal>
    );
  }
}
