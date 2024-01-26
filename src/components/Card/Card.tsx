import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import styles from './Card.module.scss';
import heartIcon from '../../images/icons/heart.svg';
import { BtnSquare } from '../BtnSquare';
import { Product } from '../../types/ProductEntity';
import { shopCart } from '../../store/CartStorage';
import { CartContext } from '../CartContext/CartContext';
import { BtnAdd } from '../BtnAdd';

type Props = {
  productData: Product;
};

const PREF_TO_STATIC_SERVER
  = 'https://fsociety-be-product-catalog.onrender.com/static/';

export const Card: React.FC<Props> = ({ productData }) => {
  const {
    id, itemId, name, fullPrice, price, screen, capacity, ram, image,
  }
    = productData;

  const [isInCart, setIsInCart] = useState(false);
  const { cartCount, setCartCount } = useContext(CartContext);

  const normalisedImage = `${PREF_TO_STATIC_SERVER}${image}`;
  const navigate = useNavigate();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      navigate(`${id}`);
    }
  };

  const handleCardClick = () => {
    navigate(`${id}`);
  };

  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();

  const handleClick = () => {
    if (isInCart) {
      shopCart.deleteItem(productData);
      setCartCount(cartCount - 1);
    } else {
      setCartCount(cartCount + 1);
      shopCart.addItem(productData);
    }

    setIsInCart(!isInCart);

    // eslint-disable-next-line no-console
    console.log(cartCount);
  };

  return (
    <article className={styles.card}>
      <img className={styles.card__image} src={normalisedImage} alt={itemId} />

      <section className="card__description">
        <h3 className={styles.card__nametag}>{name}</h3>

        <section className={styles.card__price}>
          <span className={styles.card__newPrice}>{`$${price}`}</span>
          <span className={styles.card__oldPrice}>{`$${fullPrice}`}</span>
        </section>

        <section className={styles.card__about}>
          <div className={styles.card__spec}>
            <span className={styles.card__specName}>Screen</span>

            <span className={styles.card__specValue}>{screen}</span>
          </div>

          <div className={styles.card__spec}>
            <span className={styles.card__specName}>Capacity</span>

            <span className={styles.card__specValue}>{capacity}</span>
          </div>

          <div className={styles.card__spec}>
            <span className={styles.card__specName}>RAM</span>

            <span className={styles.card__specValue}>{ram}</span>
          </div>
        </section>
      </section>

      <section className={styles.card__actions}>

        <button
          type="button"
          className={classNames({
            [styles.card__btnAdd]: !isInCart,
            [styles.card__btnAdd__active]: isInCart,
          })}
          onClick={handleClick}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <BtnSquare srcValue={heartIcon} altValue="Heart icon" />
      </section>
    </article>
  );
};

export default Card;
