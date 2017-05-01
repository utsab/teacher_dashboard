import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as dashboardActions from 'redux/modules/classDashboard';

@connect(
  state => ({studentList: state.classDashboard.studentList}), dashboardActions)

export default class ClassDashboard extends Component {
  static propTypes = {
    studentList: PropTypes.array
  }
  render() {
    const styles = require('./ClassDashboard.scss');
    const getStudents = this.props.studentList.map(function returnArray(student) {
      return (
        <div className={styles.divTableRow}>
          <div className={styles.divTableCell}>{student.firstName}</div>
          <div className={styles.divTableCell}>{student.lastName}</div>
          <div className={styles.divTableCell}>{student.githubUsername}</div>
          <div className={styles.divTableCell}>{student.email}</div>
          <div className={styles.divTableCell}>{student.notes}</div>
        </div>
      );
    }, this);
    return (
      <div className={styles.classDashboard}>
        <div className={styles.divTable}>
            <div className={styles.divTableBody}>
              <div className={styles.divTableRow}>
                <div className={styles.divTableCellHeader}>First Name</div>
                <div className={styles.divTableCellHeader}>Last Name</div>
                <div className={styles.divTableCellHeader}>Free Code Camp Profile</div>
                <div className={styles.divTableCellHeader}>Submissions</div>
                <div className={styles.divTableCellHeader}>Days Inactive</div>
            </div>
          </div>
        </div>

        <div className={styles.divTable}>
          <div className={styles.divTableBody}>
              {getStudents}
          </div>
        </div>
      </div>
    );
  }
}

