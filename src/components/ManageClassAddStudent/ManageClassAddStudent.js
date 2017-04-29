import React, {Component, PropTypes} from 'react';

export default class ManageClassAddStudent extends Component {
  static propTypes = {
    arrayStudents: PropTypes.array
  }
  render() {
    console.log(this.props.arrayStudents);
    const styles = require('containers/ManageClass/ManageClass.scss');
    const blah = this.props.arrayStudents.map(function returnArray(student) {
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
      <div className={styles.divTable}>
        <div className={styles.divTableBody}>
            {blah}
        </div>
      </div>
    );
  }
}
