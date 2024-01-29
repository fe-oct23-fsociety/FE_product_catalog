import React, { FC, useContext, useState } from 'react';
import cn from 'classnames';

import './ShopCart.scss';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { CartList } from '../CartList/CartList';
import { CartPay } from '../CartPay/CartPay';
import { shopCart } from '../../store/CartStorage';
import { CartContext } from '../CartContext/CartContext';

export const ShopCart: FC = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setCartCount } = useContext(CartContext);

  const history = useNavigate();
  const returnToPreviousPage = () => {
    history(-1);
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    shopCart.clearCart();
    setCartCount(0);
    localStorage.clear();
  };

  return (
    <div className="shopCart">
      <button
        className={cn('shopCart__back', {
          'shopCart__back--hidden': isModalOpen,
        })}
        type="button"
        aria-label="btn"
        onClick={returnToPreviousPage}
      >
        Back
      </button>

      <h1 className="shopCart__title">Cart</h1>

      <div className="shopCart__content">
        <CartList />
        <CartPay
          isModalOpen={isModalOpen}
          handleCheckout={handleCheckout}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
});
