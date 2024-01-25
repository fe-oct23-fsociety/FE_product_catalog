import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iphoneCart from '../../images/iphone-cart.png';
import './CartCard.scss';
import { observer } from 'mobx-react-lite';
import { Product } from '../../types/ProductEntity';
import { shopCart } from '../../store/CartStorage';

interface Props {
  cart: Product,
}

const PREF_TO_STATIC_SERVER
  = 'https://fsociety-be-product-catalog.onrender.com/static/';

export const CartCard: FC<Props> = observer(({ cart }) => {
  const { name, price, image } = cart;
  const normalisedImage = `${PREF_TO_STATIC_SERVER}${image}`;
  const [counter, setCounter] = useState(1);

  const handleIncrement = () => {
    setCounter(p => p + 1);
    shopCart.totalPrice += +price;
  };

  const handleDecrement = () => {
    setCounter((prevCounter) => {
      if (prevCounter === 1) {
        shopCart.deleteItem(cart);
      } else {
        shopCart.totalPrice -= +price;
      }

      return prevCounter > 0 ? prevCounter - 1 : 0;
    });
  };

  const deleteFromCart = () => {
    shopCart.deleteItem(cart);
  };

export const CartCard: FC = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      navigate('/');
    }
  };

  const handleRemoveCard = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <li className="cartItem">
      <div
        className="cartItem__container"
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
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

          <h3 className="cartItem__top-title">
            {name}
          </h3>
        </div>
        <div className="cartItem__bottom">
          <div className="cartItem__bottom-counter counter">
            <button
              type="button"
              aria-label="counter-btn"
              className="counter__decrement"
              onClick={handleDecrement}
            />

            <p className="counter__current">
              {counter}
            </p>

            <button
              type="button"
              aria-label="counter-btn"
              className="counter__increment"
              onClick={handleIncrement}
            />
          </div>

          <h3 className="cartItem__bottom-price">{`$${price}`}</h3>
        </div>
      </div>
    </li>
  );
});
