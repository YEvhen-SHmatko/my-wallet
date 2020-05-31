import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import routes from '../../routes';
import { Mobile, Default } from '../../services/mediaQuery';
import test from './MOCK_DATA.json';
import Styles from './index.module.css';
import Trash from '../Trash';
import Cost from '../Cost';
import Date from '../MyDate';
import Category from '../Category';
import Name from '../Name';
import Button from '../Button';
import Modal from '../Modal';

const TableMobile = () => {
  const [isModal, setIsModal] = useState(false);
  const [isExpenses, setIsExpenses] = useState(false);

  const openModal = e => {
    if (e.target.textContent === 'Pасход') {
      setIsExpenses(true);
    }
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
    setIsExpenses(false);
  };

  const height =
    window.innerHeight - 364 < 180 ? 180 : window.innerHeight - 364;
  return (
    <>
      <Mobile>
        {isModal ? (
          <div
            className={Styles.modal}
            style={{
              width: window.innerWidth,
              left: `-${(window.innerWidth - 320) / 2}px`,
            }}
          >
            <Modal onClick={closeModal} isExpenses={isExpenses} />
          </div>
        ) : (
          <>
            <section
              className={Styles.section}
              style={{ height: `${height}px` }}
            >
              <ul className={Styles.list}>
                {test.map(item => (
                  <li key={item.id} className={Styles.item}>
                    <div className={Styles.first}>
                      <Name name={item.name} />
                      <div className={Styles.info}>
                        <Date date={item.date} />
                        <Category category={item.category} />
                      </div>
                    </div>
                    <div className={Styles.second}>
                      <Cost cost={item.cost} />
                      <Trash id={item.id} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <section className={Styles.btn}>
              <Button title="Pасход" onClick={openModal} />
              <Button title="Доход" onClick={openModal} />
            </section>
          </>
        )}
      </Mobile>
      <Default>
        <Redirect to={routes.Expenses.path} />
      </Default>
    </>
  );
};

export default TableMobile;
