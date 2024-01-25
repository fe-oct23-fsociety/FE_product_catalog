import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import iphoneCart from '../../images/iphone-cart.png';
import './CartCard.scss';

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
            onClick={handleRemoveCard}
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
              onClick={handleRemoveCard}
            />

            <p className="counter__current"> 1</p>

            <button
              type="button"
              aria-label="counter-btn"
              className="counter__increment"
              onClick={handleRemoveCard}
            />
          </div>

          <h3 className="cartItem__bottom-price">$333</h3>
        </div>
      </div>
    </li>
  );
};
