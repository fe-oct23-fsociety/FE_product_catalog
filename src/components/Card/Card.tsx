import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.scss';
import heartIcon from '../../images/icons/heart.svg';
import { BtnSquare } from '../BtnSquare';
import { Product } from '../../types/ProductEntity';
// import iphoneImage from '../../images/iPhone.png';

type Props = {
  productData: Product;
};

const PREF_TO_STATIC_SERVER = 'https://fsociety-be-product-catalog.onrender.com/static/';

export const Card: React.FC<Props> = ({ productData }) => {
  const {
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = productData;

  const normalisedImage = `${PREF_TO_STATIC_SERVER}${image}`;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      navigate('/');
    }
  };

  const handleAddToCart = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <div
      className={styles.card}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <img
        className={styles.card__image}
        src={normalisedImage}
        alt={itemId}
      />

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
          className={styles.card__btnAdd}
          onClick={handleAddToCart}
        >
          Add to cart
        </button>

        <BtnSquare srcValue={heartIcon} altValue="Heart icon" />
      </section>
    </div>
  );
};

export default Card;
