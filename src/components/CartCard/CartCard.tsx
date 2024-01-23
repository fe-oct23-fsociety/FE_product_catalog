import React, { FC } from 'react';
import iphoneCart from '../../images/iphone-cart.png';
import './CartCard.scss';

export const CartCard: FC = () => {
  return (
    <li className="cartItem">
      <div className="cartItem__container">
        <div className="cartItem__top">
          <button
            aria-label="close-btn"
            type="button"
            className="cartItem__top-closeBtn"
          />

          <img
            className="cartItem__top-productImg"
            src={iphoneCart}
            alt="product"
          />

          <h3 className="cartItem__top-title">
            Apple iPhone 14 Pro 128GB Silver (MQ023)
          </h3>
        </div>
        <div className="cartItem__bottom">
          <div className="cartItem__bottom-counter counter">
            <button
              type="button"
              aria-label="counter-btn"
              className="counter__decrement"
            />

            <p className="counter__current"> 1</p>

            <button
              type="button"
              aria-label="counter-btn"
              className="counter__increment"
            />
          </div>

          <h3 className="cartItem__botom-pirce">$333</h3>
        </div>
      </div>
    </li>
  );
};
