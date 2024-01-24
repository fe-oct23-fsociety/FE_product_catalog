import React, { FC } from 'react';
import './CartPay.scss';
import styles from '../Card/Card.module.scss';

export const CartPay: FC = () => {
  return (
    <div className="cartPay">
      <div className="cartPay__content">
        <h2 className="cartPay__content-total">$28000</h2>
        <p className="cartPay__content-description">Total for 11 items</p>
        <button type="button" className={styles.card__btnAdd}>
          Checkout
        </button>
      </div>
    </div>
  );
};
