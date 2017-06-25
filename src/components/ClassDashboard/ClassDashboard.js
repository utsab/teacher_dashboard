import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as dashboardActions from 'redux/modules/classForm';
import Table from 'react-bootstrap/lib/Table';

@connect(
  state => ({studentList: state.classForm.studentList}), dashboardActions)

export default class ClassDashboard extends Component {
  static propTypes = {
    studentList: PropTypes.array
  }
  render() {
    const styles = require('./ClassDashboard.scss');
    const allStudents = this.props.studentList.map(function returnArray(student) {
      return (
        <tr className={styles.manageClass}>
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td><a target="_blank" href={'https://www.freecodecamp.com/' + student.githubUsername}>{student.githubUsername}</a></td>
          <td>{student.email}</td>
          <td>{student.daysInactive}</td>
          <td>{student.lastSubmittedAssignment}</td>
        </tr>
      );
    }, this);
    return (
      <div className={styles.classDashboard}>
        <Table responsive bordered>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Free Code Camp Profile</th>
                <th>Submissions</th>
                <th>Days Inactive</th>
                <th>Last Submitted</th>
              </tr>
            </thead>
            <tbody>
            {allStudents}
            </tbody>
        </Table>
      </div>
    );
  }
}

