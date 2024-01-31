import React, { FC, useContext, useState } from 'react';
import './CartCard.scss';
import { observer } from 'mobx-react-lite';
import { Product } from '../../types/ProductEntity';
import { shopCart } from '../../store/CartStorage';
import { CartContext } from '../CartContext/CartContext';

interface Props {
  cart: Product;
}

const PREF_TO_STATIC_SERVER
  = 'https://fsociety-be-product-catalog.onrender.com/static/';

export const CartCard: FC<Props> = observer(({ cart }) => {
  const {
    name, price, image, counter,
  } = cart;
  const normalisedImage = `${PREF_TO_STATIC_SERVER}${image}`;
  const [count, setCount] = useState(cart.counter);
  const { cartCount, setCartCount } = useContext(CartContext);

  const handleIncrement = () => {
    setCount((p) => p + 1);
    // eslint-disable-next-line no-param-reassign
    cart.counter += 1;
    shopCart.totalPrice += +price;
  };

  const deleteFromCart = () => {
    shopCart.totalPrice -= price * counter;
    shopCart.deleteItem(cart);
    setCartCount(cartCount - 1);
  };

  const handleDecrement = () => {
    setCount((prevCounter) => {
      if (prevCounter === 1) {
        deleteFromCart();
      } else {
        shopCart.totalPrice -= +price;
      }

      return prevCounter > 0 ? prevCounter - 1 : 0;
    });
  };

  return (
    <li className="cartItem">
      <div className="cartItem__container">
        <div className="cartItem__top">
          <button
            aria-label="close-btn"
            type="button"
            className="cartItem__top-closeBtn"
            onClick={deleteFromCart}
          />

          <img
            className="cartItem__top-productImg"
            src={normalisedImage}
            alt="product"
          />

          <h3 className="cartItem__top-title">{name}</h3>
        </div>
        <div className="cartItem__bottom">
          <div className="cartItem__bottom-counter counter">
            <button
              type="button"
              aria-label="counter-btn"
              className="counter__decrement"
              onClick={handleDecrement}
            />

            <p className="counter__current">{count}</p>

            <button
              type="button"
              aria-label="counter-btn"
              className="counter__increment"
              onClick={handleIncrement}
            />
          </div>

          <h3 className="cartItem__bottom-price">{`$${price * counter}`}</h3>
        </div>
      </div>
    </li>
  );
});
