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
    showModalFuncEdit: PropTypes.func
  }

  handleClick = (event) => {
    console.log('IN HANDLE Click EDIT');
    event.preventDefault();
    const studentID = event.currentTarget.attributes['data-id'].value;
    this.open();
    this.props.isEditClicked(studentID);
  };

  open = () => {
    console.log('in open func');
    this.props.showModalFuncEdit(true);
  }

  render() {
    const overlay = this.props.studentId ? <EditStudent studentId={this.props.studentId} /> : null;
    const styles = require('containers/ManageClass/ManageClass.scss');

    const allStudents = this.props.arrayStudents.map(function returnArray(student) {
      return (
        <div className={styles.divTableRow}>
          <div className={styles.divTableCell}>{student.firstName}</div>
          <div className={styles.divTableCell}>{student.lastName}</div>
          <div className={styles.divTableCell}>{student.githubUsername}</div>
          <div className={styles.divTableCell}>{student.email}</div>
          <div className={styles.divTableCell}>{student.notes}</div>
          <div className={styles.divTableCellHeader}><Button data-id={student._id} onClick={this.handleClick}>Edit</Button></div>
        </div>
      );
    }, this);
    return (
      <div className={styles.divTable}>
      {overlay}
        <div className={styles.divTableBody}>
            {allStudents}
        </div>
      </div>
    );
  }
}
