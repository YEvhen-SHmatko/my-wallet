import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import * as selectors from '../../redux/selectors';
import Styles from './index.module.css';
import { isDefault } from '../../services/mediaQuery';
import { thisDate, transformMoney } from '../../services/hendlers';

const BalanceReport = ({ balance }) => {
  const IsDefault = isDefault(useMediaQuery);
  return (
    <div className={IsDefault ? Styles.Default_section : Styles.section}>
      <div className={IsDefault ? Styles.Default_title : Styles.title}>
        <span className={Styles.title_text}>Баланс на</span>
        {thisDate().format('DD.MM.YYYY')}:
      </div>
      <span className={IsDefault ? Styles.Default_value : Styles.value}>
        {transformMoney(balance, null)}
      </span>
    </div>
  );
};

BalanceReport.defaultProps = {
  balance: 0,
};
BalanceReport.propTypes = {
  balance: PropTypes.number,
};
const MSTP = store => ({
  balance: selectors.getBalance(store),
});
export default connect(MSTP)(BalanceReport);
