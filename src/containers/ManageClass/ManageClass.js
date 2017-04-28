import React, {Component, PropTypes} from 'react';
import { ManageClassAddStudent, ClassForm } from 'components';
import {connect} from 'react-redux';
import * as classActions from 'redux/modules/classForm';


@connect(
  state => ({studentList: state.classForm.studentList}), classActions)

export default class ManageClass extends Component {
  static propTypes = {
    studentList: PropTypes.object
  }
  render() {
    const styles = require('./ManageClass.scss');
    const {studentList} = this.props;
    if (studentList) {
      console.log(studentList);
    }
    return (
      <div className={styles.manageClass}>
        <h1>Manage Students</h1>
        <ClassForm />
        <div className={styles.divTable}>
          <div className={styles.divTableBody}>
            <div className={styles.divTableRow}>
              <div className={styles.divTableCell}>First Name</div>
              <div className={styles.divTableCell}>Last Name</div>
              <div className={styles.divTableCell}>Contact Email</div>
              <div className={styles.divTableCell}>Date Enrolled</div>
              <div className={styles.divTableCell}>Note</div>
            </div>
          </div>
        </div>
        <ManageClassAddStudent />
      </div>

    );
  }
}

