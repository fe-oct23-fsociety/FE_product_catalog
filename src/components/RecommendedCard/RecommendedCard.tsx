import React from 'react';

import styles from './RecommendedCard.module.scss';

import iphoneImage from '../../images/00.jpg';
import heartIcon from '../../images/icons/heart.svg';
import { BtnSquare } from '../BtnSquare';

export const RecommendedCard: React.FC = () => {
  return (
    <article className={styles.card}>
      <img className={styles.card__image} src={iphoneImage} alt="Phone img" />

      <section className="card__description">
        <h3 className={styles.card__nametag}>
          Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
        </h3>

        <section className={styles.card__price}>
          <span className={styles.card__newPrice}>$799</span>
          <span className={styles.card__oldPrice}>$899</span>
        </section>

        <section className={styles.card__about}>
          <div className={styles.card__spec}>
            <span className={styles.card__specName}>Screen</span>

            <span className={styles.card__specValue}>5.8” OLED</span>
          </div>

          <div className={styles.card__spec}>
            <span className={styles.card__specName}>Capacity</span>

            <span className={styles.card__specValue}>64 GB</span>
          </div>

          <div className={styles.card__spec}>
            <span className={styles.card__specName}>RAM</span>

            <span className={styles.card__specValue}>4 GB</span>
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

export default RecommendedCard;
