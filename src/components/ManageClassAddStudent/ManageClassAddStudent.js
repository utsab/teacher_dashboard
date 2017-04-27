import React, {Component} from 'react';

export default class ManageClassAddStudent extends Component {
  render() {
    const styles = require('containers/ManageClass/ManageClass.scss');
    return (
      <div className={styles.divTable}>
        <div className={styles.divTableBody}>
          <div className={styles.divTableRow}>
            <div className={styles.divTableCell}>Blah</div>
            <div className={styles.divTableCell}>Blah</div>
            <div className={styles.divTableCell}>Blah</div>
            <div className={styles.divTableCell}>Blah</div>
            <div className={styles.divTableCell}>Blah</div>
          </div>
        </div>
      </div>
    );
  }
}

