import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addStudent} from 'redux/modules/ClassForm';

@connect(
    // state => ({studentList: state.studentList.data}),
    dispatch => bindActionCreators({addStudent}, dispatch))

export default class ClassForm extends Component {
  static propTypes = {
    studentList: PropTypes.object,
    addStudent: PropTypes.func.isRequired
  }

  addNewStudent = (event) => {
    event.preventDefault();
    const studentEmail = this.refs.studentEmail;
    const github = this.refs.github;
    const firstname = this.refs.firstname;
    const lastname = this.refs.lastname;
    const notes = this.refs.notes;
    this.props.addStudent(studentEmail.value, github.value, firstname.value, lastname.value, notes.value);
    studentEmail.value = '';
    github.value = '';
    firstname.value = '';
    lastname.value = '';
    notes.value = '';
  }

  render() {
    return (
      <form>
        <h1>Add New Student</h1>
        Student Email<br/>
        <input type="text" ref="studentEmail" className="form-control"/>
        <br/>
        Github Username<br/>
        <input type="text" ref="github" className="form-control"/>
        <br/>
        First name<br/>
        <input type="text" ref="firstname" className="form-control"/>
        <br/>
        Last name<br/>
        <input type="text" ref="lastname" className="form-control"/>
        <br/>
        Notes<br/>
        <input type="text" ref="notes" className="form-control"/>
        <br/>
        <br/>
        <input onClick={this.addNewStudent} type="submit" value="Submit"/>
        <br/>
        <br/>
      </form>
    );
  }
}

