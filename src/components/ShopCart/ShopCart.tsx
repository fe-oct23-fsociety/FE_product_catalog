import React, { FC, useContext, useState } from 'react';
import './ShopCart.scss';
import '../../styles/base-theme.scss';
import { observer } from 'mobx-react-lite';
import { CartList } from '../CartList/CartList';
import { CartPay } from '../CartPay/CartPay';
import { shopCart } from '../../store/CartStorage';
import { CartContext } from '../CartContext/CartContext';
import { BtnBack } from '../BtnBack';

export const ShopCart: FC = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setCartCount } = useContext(CartContext);

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
      <div className="mb-24">
        <BtnBack isHidden={isModalOpen} />
      </div>

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
