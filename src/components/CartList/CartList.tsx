import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { CartCard } from '../CartCard/CartCard';
import './CartList.scss';
import { shopCart } from '../../store/CartStorage';

export const CartList: FC = observer(() => {
  const cartList = shopCart.cartItems;

  return (
    <ul className="cartList">
      {cartList.map(cart => (
        <CartCard
          cart={cart}
          key={cart.id}
        />
      ))}
    </ul>
  );
});
