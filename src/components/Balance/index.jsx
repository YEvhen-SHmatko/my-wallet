import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { isDefault } from '../../services/mediaQuery';
import Styles from './index.module.css';
import * as operations from '../../redux/operations/balance';
import * as selectors from '../../redux/selectors';
import { transformMoney } from '../../services/hendlers';

const Balance = ({ postBalance, balance }) => {
  const IsDefault = isDefault(useMediaQuery);
  const [input, setInput] = useState(transformMoney(+balance, null));
  const [newBalance, setNewBalance] = useState(balance);
  useEffect(() => {
    setInput(transformMoney(+balance, null));
    setNewBalance(balance);
  }, [balance]);
  const handleChange = e => {
    const { value } = e.target;
    if (!+value) return;
    if (value < 99999.99) {
      setInput(value);
    }
  };
  const handleFocus = () => {
    setInput(newBalance);
  };
  const handleBlur = () => {
    setNewBalance(+input);
    setInput(transformMoney(+input, null));
  };
  const handleClick = () => {
    if (balance === 0) {
      postBalance(newBalance);
    }
  };
  const disabled = balance !== 0;
  return (
    <div className={IsDefault ? Styles.Default_section : Styles.section}>
      <div className={IsDefault ? Styles.Default_title : Styles.title}>
        Баланс:
      </div>
      <div className={Styles.form}>
        <input
          disabled={disabled}
          className={IsDefault ? Styles.Default_input : Styles.input}
          type="text"
          value={input}
          autoComplete="off"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          disabled={disabled}
          className={IsDefault ? Styles.Default_btn : Styles.btn}
          type="button"
          onClick={handleClick}
        >
          Подтвердить
        </button>
      </div>
    </div>
  );
};
Balance.defaultProps = {
  balance: 0,
  postBalance: e => console.log(e),
};
Balance.propTypes = {
  balance: PropTypes.number,
  postBalance: PropTypes.func,
};
const MSTP = store => ({
  balance: selectors.getBalance(store),
});
export default connect(MSTP, {
  postBalance: operations.postApiBalance,
})(Balance);
