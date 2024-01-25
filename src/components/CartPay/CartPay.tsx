import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { observer } from 'mobx-react-lite';

import './CartPay.scss';
import styles from '../Card/Card.module.scss';
import successIcon from '../../images/icons/success-icon.png';
import { shopCart } from '../../store/CartStorage';

Modal.setAppElement('#root');

type Props = {
  isModalOpen: boolean;
  handleCheckout: () => void;
  closeModal: () => void;
};

export const CartPay: React.FC<Props> = observer(({
  isModalOpen,
  handleCheckout,
  closeModal,
}) => {
  const fullPrice = shopCart.totalPrice;
  const cartAmount = shopCart.cartItems.length;

  return (
    <div className="cartPay">
      <div className="cartPay__content">
        <h2 className="cartPay__content-total">{`$${fullPrice}`}</h2>
        <p
          className="cartPay__content-description"
        >
          {`total for ${cartAmount} items`}
        </p>
        <button
          type="button"
          className={styles.card__btnAdd}
          onClick={handleCheckout}
          disabled={fullPrice === 0}
        >
          Checkout
        </button>

        {isModalOpen && (
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
              <p className="cartPay__modal-price">{`$ ${fullPrice}`}</p>
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
        )}
      </div>
    </div>
  );
});
