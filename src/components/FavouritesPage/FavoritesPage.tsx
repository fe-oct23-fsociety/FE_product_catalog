import React from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Favourites.module.scss';
import { favourites } from '../../store/FavouritesStorage';
import { Card } from '../Card';
import { BtnBack } from '../BtnBack';
import emptyFavourites from '../../images/favorites-not-found.svg';

export const FavouritesPage: React.FC = observer(() => {
  const { itemsInFavourites } = favourites;

  return (
    <>
      <div className="btn-back-wrapper">
        <BtnBack />
      </div>
      <div className={styles.favourites}>
        <h1 className={styles.title}>Favourites</h1>

        {itemsInFavourites > 0 && (
          <>
            <p className={styles.description}>{`${itemsInFavourites} items`}</p>
            <div className={styles.container}>
              {favourites.favourites.map((product) => (
                <Card productData={product} key={product.id} />
              ))}
            </div>
          </>
        )}

        {itemsInFavourites === 0 && (
          <div className={styles.emptyFavourites}>
            <div className={styles.emtyFavourites_content}>
              <img
                className={styles.emptyFavourites__img}
                src={emptyFavourites}
                alt="emptyFavourites"
              />
              <h2 className={styles.emptyFavourites__title}>Any items found</h2>
            </div>
          </div>
        )}

      </div>
    </>
  );
});
