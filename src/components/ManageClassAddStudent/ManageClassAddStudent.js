import React, {Component, PropTypes} from 'react';
import {isEditClicked, showModalFuncEdit} from 'redux/modules/classForm';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {EditStudent} from 'components';
import Button from 'react-bootstrap/lib/Button';


function mapStateToProps(state) {
  return {
    studentId: state.classForm.studentId,
    showModal: state.classForm.showModal,
    showEditModal: state.classForm.showEditModal,
    studentList: state.classForm.studentList
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({isEditClicked: isEditClicked, showModalFuncEdit: showModalFuncEdit}, dispatch);
}

@connect(mapStateToProps, matchDispatchToProps)


export default class ManageClassAddStudent extends Component {
  static propTypes = {
    arrayStudents: PropTypes.array,
    isEditClicked: PropTypes.func,
    handleClick: PropTypes.func,
    studentId: PropTypes.string,
    showModal: PropTypes.bool,
    showEditModal: PropTypes.bool,
    showModalFuncEdit: PropTypes.func
  }

  handleClick = (event) => {
    console.log('IN HANDLE Click EDIT');
    event.preventDefault();
    const studentID = event.currentTarget.attributes['data-id'].value;
    console.log(studentID);
    this.open();
    this.props.isEditClicked(studentID);
  };

  open = () => {
    console.log('in open func');
    this.props.showModalFuncEdit(true);
  }

  render() {
    const overlay = this.props.studentId ? <EditStudent studentId={this.props.studentId} /> : null;

    const allStudents = this.props.arrayStudents.map(function returnArray(student) {
      return (
        <tr>
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td>{student.githubUsername}</td>
          <td>{student.email}</td>
          <td>{student.notes} <Button data-id={student._id} onClick={this.handleClick}>Edit</Button><i className="fa fa-minus-circle" aria-hidden="true"></i></td>
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
