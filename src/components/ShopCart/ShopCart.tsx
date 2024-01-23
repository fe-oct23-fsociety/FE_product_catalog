import React, { FC } from 'react';
import './ShopCart.scss';
import { useNavigate } from 'react-router-dom';
import { CartList } from '../CartList/CartList';
import { CartPay } from '../CartPay/CartPay';

export const ShopCart: FC = () => {
  const history = useNavigate();
  const returnToPreviousPage = () => {
    history(-1);
  };

  return (
    <div className="shopCart">
      <button
        className="shopCart__back"
        type="button"
        aria-label="btn"
        onClick={returnToPreviousPage}
      >
        Back
      </button>

      <h1 className="shopCart__title">Cart</h1>

      <div className="shopCart__content">
        <CartList />
        <CartPay />
      </div>
    </div>
  );
};
