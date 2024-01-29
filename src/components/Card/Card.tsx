import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Card.module.scss';
import heartIcon from '../../images/icons/heart.svg';
import heartIconActive from '../../images/icons/heart-active.svg';
import { BtnSquare } from '../BtnSquare';
import { Product } from '../../types/ProductEntity';
import { CartContext } from '../CartContext/CartContext';
import { BtnAdd } from '../BtnAdd';
import { shopCart } from '../../store/CartStorage';
import { favourites } from '../../store/FavouritesStorage';

type Props = {
  productData: Product;
};

const PREF_TO_STATIC_SERVER
  = 'https://fsociety-be-product-catalog.onrender.com/static/';

export const Card: React.FC<Props> = observer(({ productData }) => {
  const {
    id, itemId, name, fullPrice, price, screen, capacity, ram, image, category,
  }
    = productData;

  const [isInCart, setIsInCart] = useState(
    shopCart.cartItems.some((item) => item.id === id),
  );
  const { setCartCount } = useContext(CartContext);

  const isInFavourites = favourites.favourites.some(el => el.id === productData.id);

  const normalisedImage = `${PREF_TO_STATIC_SERVER}${image}`;
  const navigate = useNavigate();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      navigate(`${id}`);
    }
  };

  const handleCardClick = () => {
    navigate(`/${category}/${id}`);
  };

  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();

    if (isInCart) {
      shopCart.deleteItem(productData);
      setCartCount(shopCart.cartItems.length);
    } else {
      shopCart.addItem(productData);
      setCartCount(shopCart.cartItems.length);
    }

    setIsInCart(!isInCart);
  };

  const handleToggleAddTofavourites = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    favourites.toggleAddToFavourites(productData);
  };

  return (
    <div
      className={styles.card}
      onClick={() => handleCardClick()}
      onKeyDown={(e) => handleKeyDown(e)}
      role="button"
      tabIndex={0}
    >
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
        <BtnAdd
          onclick={handleAddToCart}
          isInCart={isInCart}
        />
        <BtnSquare
          srcValue={isInFavourites ? heartIconActive : heartIcon}
          altValue="Heart icon"
          onClick={handleToggleAddTofavourites}
        />
      </section>
    </div>
  );
});
export default Card;
