import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import './CartPay.scss';
import styles from '../Card/Card.module.scss';
import successIcon from '../../images/icons/success-icon.png';

Modal.setAppElement('#root');

type Props = {
  isModalOpen: boolean;
  handleCheckout: () => void;
  closeModal: () => void;
};

export const CartPay: React.FC<Props> = ({
  isModalOpen,
  handleCheckout,
  closeModal,
}) => {
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
          className="cartPay__modal"
          overlayClassName="cartPay__modal-overlay"
        >
          <div className="cartPay__modal-content">
            <img
              src={successIcon}
              alt="success icon"
              className="cartPay__modal-successIcon"
            />
            <p className="cartPay__modal-message">Checkout Success!</p>
            <p className="cartPay__modal-price">UAH 58</p>
            <Link to="/">
              <button
                type="button"
                onClick={closeModal}
                className="cartPay__modal-button"
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
