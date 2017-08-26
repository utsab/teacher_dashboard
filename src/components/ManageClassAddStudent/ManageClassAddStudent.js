import React, {Component, PropTypes} from 'react';
import {isEditClicked, showModalFuncEdit, deleteStudent} from 'redux/modules/classForm';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {EditStudent} from 'components';
import Button from 'react-bootstrap/lib/Button';


function mapStateToProps(state) {
  return {
    studentId: state.classForm.studentId,
    firstName: state.classForm.firstName,
    lastName: state.classForm.lastName,
    github: state.classForm.github,
    email: state.classForm.email,
    notes: state.classForm.notes
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({isEditClicked: isEditClicked, showModalFuncEdit: showModalFuncEdit, deleteStudent: deleteStudent}, dispatch);
}

@connect(mapStateToProps, matchDispatchToProps)


export default class ManageClassAddStudent extends Component {
  static propTypes = {
    arrayStudents: PropTypes.array,
    isEditClicked: PropTypes.func,
    handleClick: PropTypes.func,
    studentId: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    github: PropTypes.string,
    email: PropTypes.string,
    notes: PropTypes.string,
    showModalFuncEdit: PropTypes.func,
    deleteStudent: PropTypes.func
  }

  handleClick = (event) => {
    console.log("In handleClick A!!!!");
    event.preventDefault();
    const studentID = event.currentTarget.attributes['data-id'].value;
    const firstName = event.currentTarget.attributes['data-first-name'].value;
    const lastName = event.currentTarget.attributes['data-last-name'].value;
    const github = event.currentTarget.attributes['data-github'].value;
    const email = event.currentTarget.attributes['data-email'].value;
    const notes = event.currentTarget.attributes['data-notes'].value;

    console.log("in handleClick"); 
    this.open();
    this.props.isEditClicked(studentID, firstName, lastName, github, email, notes);
  };

  deleteClick = (event) => {
    event.preventDefault();
    const studentID = event.currentTarget.attributes['data-id'].value;
    this.props.deleteStudent(studentID);
  }

  open = () => {
    this.props.showModalFuncEdit(true);
  }

  render() {
    const overlay = this.props.studentId ? <EditStudent studentId={this.props.studentId} email={this.props.email} firstName={this.props.firstName} lastName={this.props.lastName} notes={this.props.notes} github={this.props.github}/> : null;
    const allStudents = this.props.arrayStudents.map(function returnArray(student) {
      return (
        <tr>
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td>{student.githubUsername}</td>
          <td>{student.email}</td>
          <td>{student.dateEnrolled}</td>
          <td>{student.notes}</td>
          <td><Button data-id={student._id}
                    data-email={student.email}
                    data-first-name={student.firstName}
                    data-github={student.githubUsername}
                    data-last-name={student.lastName}
                    data-notes={student.notes} 
                    onClick={this.handleClick} 
                    bsStyle="link">
              Edit
            </Button>
          </td>
          <td><i onClick={this.deleteClick} data-id={student._id} className="fa fa-minus-circle" aria-hidden="true"></i></td>
        </tr>
      );
    }, this);
    return (
      <tbody>
        {overlay}
        {allStudents}
      </tbody>
    );
  }
}
