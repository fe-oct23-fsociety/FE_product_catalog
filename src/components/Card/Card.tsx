import React from 'react';
import styles from './Card.module.scss';
import heartIcon from '../../images/icons/heart.svg';
import { BtnSquare } from '../BtnSquare';
import { Product } from '../../types/ProductEntity';
import iphoneImage from '../../images/iPhone.png';

type Props = {
  productData: Product;
};

export const Card: React.FC<Props> = ({ productData }) => {
  const {
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    // image,
  } = productData;

  return (
    <article className={styles.card}>
      {/* change src={image} */}
      <img className={styles.card__image} src={iphoneImage} alt={itemId} />

      <section className="card__description">
        <h3 className={styles.card__nametag}>
          {name}
        </h3>

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
        <button type="button" className={styles.card__btnAdd}>
          Add to cart
        </button>

        <BtnSquare srcValue={heartIcon} altValue="Heart icon" />
      </section>
    </article>
  );
};

export default Card;
