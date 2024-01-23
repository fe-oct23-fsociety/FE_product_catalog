import React, { FC } from 'react';
import { CartCard } from '../CartCard/CartCard';
import './CartList.scss';

export const CartList: FC = () => {
  return (
    <ul className="cartList">
      <CartCard />
      <CartCard />
      <CartCard />
      <CartCard />
      <CartCard />
      <CartCard />
    </ul>
  );
};
