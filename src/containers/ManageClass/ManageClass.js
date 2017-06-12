import React, {Component, PropTypes} from 'react';
import { ManageClassAddStudent, ClassForm } from 'components';
import {connect} from 'react-redux';
import * as classActions from 'redux/modules/classForm';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';

@connect(
  state => ({studentList: state.classForm.studentList, showModal: state.classForm.showModal}),
  classActions)

export default class ManageClass extends Component {
  static propTypes = {
    studentList: PropTypes.array,
    showModal: PropTypes.bool,
    showModalFunc: PropTypes.func,
  }

  open = () => {
    console.log('2343242342');
    this.props.showModalFunc(true);
  }

  render() {
    const styles = require('./ManageClass.scss');
    return (
      <div className={styles.manageClass}>
        <h1>Manage Students</h1>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Add to Class Roster
        </Button>
        <ClassForm />

        <Table responsive bordered condensed hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Contact Email</th>
              <th>Github</th>
              <th>Date Enrolled</th>
              <th>Note</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <ManageClassAddStudent arrayStudents={this.props.studentList} />
        </Table>
      </div>
    );
  }
}
