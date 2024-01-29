import React from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Favourites.module.scss';
import { favourites } from '../../store/FavouritesStorage';
import { Card } from '../Card';

export const FavouritesPage:React.FC = observer(() => {
  const { itemsInFavourites } = favourites;

  return (
    <div
      className={styles.favourites}
    >
      <h1
        className={styles.title}
      >
        Favourites
      </h1>
      <p
        className={styles.description}
      >
        {`${itemsInFavourites} items`}
      </p>
      <div
        className={styles.container}
      >
        {favourites.favourites.map(product => (
          <Card
            productData={product}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
});
