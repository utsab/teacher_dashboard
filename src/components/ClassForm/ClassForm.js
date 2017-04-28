import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addStudent} from 'redux/modules/classForm';
console.log(addStudent);

function mapStateToProps(state) {
  return {
    studentList: state.classForm.studentList
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({addStudent: addStudent}, dispatch);
}

@connect(mapStateToProps, matchDispatchToProps)

export default class ClassForm extends Component {
  static propTypes = {
    addStudent: PropTypes.func.isRequired,
    dispatch: PropTypes.func
  }

  addNewStudent = (event) => {
    console.log('in add new student');
    console.log(this.props);
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

