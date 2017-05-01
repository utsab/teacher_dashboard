import React, {Component, PropTypes} from 'react';
import { ManageClassAddStudent, ClassForm } from 'components';
import {connect} from 'react-redux';
import * as classActions from 'redux/modules/classForm';


@connect(
  state => ({studentList: state.classForm.studentList}), classActions)

export default class ManageClass extends Component {
  static propTypes = {
    studentList: PropTypes.array
  }

  state = {
    isOpen: false
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const styles = require('./ManageClass.scss');
    return (
      <div className={styles.manageClass}>
        <h1>Manage Students</h1>
        <button onClick={this.toggleModal}>
          Add A New Student
        </button>
        <ClassForm show={this.state.isOpen}
          onClose={this.toggleModal} />
        <div className={styles.divTable}>
          <div className={styles.divTableBody}>
            <div className={styles.divTableRow}>
              <div className={styles.divTableCellHeader}>First Name</div>
              <div className={styles.divTableCellHeader}>Last Name</div>
              <div className={styles.divTableCellHeader}>Github</div>
              <div className={styles.divTableCellHeader}>Email</div>
              <div className={styles.divTableCellHeader}>Notes</div>
            </div>
          </div>
        </div>
        <ManageClassAddStudent arrayStudents={this.props.studentList} />
      </div>

    );
  }
}

