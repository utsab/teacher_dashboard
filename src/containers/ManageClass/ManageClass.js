import React, {Component} from 'react';
import { ManageClassAddStudent, ClassForm } from 'components';

export default class ManageClass extends Component {
  render() {
    const styles = require('./ManageClass.scss');
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

