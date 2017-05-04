import React, {Component, PropTypes} from 'react';
import { ManageClassAddStudent, ClassForm } from 'components';
import {connect} from 'react-redux';
import * as classActions from 'redux/modules/classForm';
import Button from 'react-bootstrap/lib/Button';

@connect(
  state => ({studentList: state.classForm.studentList, showModal: state.classForm.showModal}),
  classActions)

export default class ManageClass extends Component {
  static propTypes = {
    studentList: PropTypes.array,
    showModal: PropTypes.bool,
    showModalFunc: PropTypes.func
  }

  open = () => {
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
          Add A New Student
        </Button>
        <ClassForm />
        <div className={styles.divTable}>
          <div className={styles.divTableBody}>
            <div className={styles.divTableRow}>
              <div className={styles.divTableCellHeader}>First Name</div>
              <div className={styles.divTableCellHeader}>Last Name</div>
              <div className={styles.divTableCellHeader}>Github</div>
              <div className={styles.divTableCellHeader}>Email</div>
              <div className={styles.divTableCellHeader}>Notes</div>
              <div className={styles.divTableCellHeader}></div>
            </div>
          </div>
        </div>
        <ManageClassAddStudent arrayStudents={this.props.studentList} />
      </div>

    );
  }
}

