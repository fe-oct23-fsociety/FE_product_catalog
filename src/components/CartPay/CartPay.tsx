import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import './CartPay.scss';
import styles from '../Card/Card.module.scss';
import successIcon from '../../images/icons/success-icon.png';

Modal.setAppElement('#root');

export const CartPay: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cartPay">
      <div className="cartPay__content">
        <h2 className="cartPay__content-total">$28000</h2>
        <p className="cartPay__content-description">Total for 11 items</p>
        <button
          type="button"
          className={styles.card__btnAdd}
          onClick={handleCheckout}
        >
          Checkout
        </button>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Checkout Modal"
          className="modal"
        >
          <div className="modal__content">
            <img
              src={successIcon}
              alt="success icon"
              className="modal__successIcon"
            />
            <p className="modal__message">Checkout Success!</p>
            <p className="modal__price">UAH 58</p>
            <Link to="/">
              <button
                type="button"
                onClick={closeModal}
                className="modal__button"
              >
                Back Home
              </button>
            </Link>
          </div>
        </Modal>
      </div>
    </div>
  );
};
