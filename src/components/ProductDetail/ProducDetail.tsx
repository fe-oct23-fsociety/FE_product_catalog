/* eslint-disable no-console */
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import { apiRoutes } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { CartContext } from '../CartContext/CartContext';
import { ProductDetailItem } from '../../types/ProductDetailItem';
import { Loader } from '../Loader';
import styles from './ProductDetail.module.scss';
import { shopCart } from '../../store/CartStorage';
import { favourites } from '../../store/FavouritesStorage';
import { Product } from '../../types/ProductEntity';
import { Card } from '../Card';
import { ProductShowcase } from '../ProductShowcase';

const shortSpecTitles = ['Screen', 'Resolution', 'Processor', 'RAM'];
const specTitles = [
  'Screen',
  'Resolution',
  'Processor',
  'RAM',
  'Capacity',
  'Camera',
  'Zoom',
  'Cell',
];

export const ProductDetail: React.FC = observer(() => {
  const { id } = useParams();
  const { setCartCount } = useContext(CartContext);
  const [isInCart, setIsInCart] = useState(() => {
    if (!id) {
      return false;
    }

    return shopCart.cartItems.some((item) => item.id === +id);
  });
  const [setAxios, loading, data, error] = useAxios<ProductDetailItem>(null);
  const [productsArray, setProductsArray] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  const getProductsFromServer = async () => {
    try {
      const response = await axios.get(
        'https://fsociety-be-product-catalog.onrender.com/products',
      );
      const { products } = response.data;

      setProductsArray(products);
    } catch (err) {
      console.error(err);
    }
  };

  const getRecomendedProducts = async () => {
    try {
      const response = await axios.get(
        `${apiRoutes.SHOW_PRODUCTS}/${id}/recommended`,
      );

      setRecommendedProducts(response.data);
    } catch (err) {
      // eslint-disable-next-line no-useless-return
      return;
    }
  };

  useEffect(() => {
    setAxios({
      method: 'get',
      url: `${apiRoutes.SHOW_PRODUCTS}/${id}`,
    });
    getProductsFromServer();
    getRecomendedProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();

    const productToAdd = productsArray.find((el) => el.itemId === data?.id);

    if (productToAdd) {
      if (isInCart) {
        shopCart.deleteItem(productToAdd);
        setCartCount(shopCart.cartItems.length);
      } else {
        shopCart.addItem(productToAdd);
        setCartCount(shopCart.cartItems.length);
      }
    }

    setIsInCart(!isInCart);
  };

  const handleAddToFav = () => {
    const productToAdd = productsArray.find((el) => el.itemId === data?.id);

    if (productToAdd) {
      favourites.toggleAddToFavourites(productToAdd);
    }
  };

  const isInFavourites = favourites.favourites.some(
    (el) => el.itemId === data?.id,
  );

  return (
    <section className={styles.product}>
      {loading && !error && (
        <div className={styles['container-loading']}>
          <Loader />
        </div>
      )}

      {data && (
        <>
          <h2 className={styles['product__main-title']}>{data.name}</h2>
          <div className={styles.product__wrapp}>
            <ProductShowcase
              data={data}
              handleAddToCart={handleAddToCart}
              isInCart={isInCart}
              shortSpecTitles={shortSpecTitles}
              handleAddToFav={handleAddToFav}
              isInFavourites={isInFavourites}
            />

            <div
              className={cn(
                styles.product__container,
                styles['product__container--bottom'],
              )}
            >
              <div className={styles['product__container--part-50']}>
                <h3 className={cn(styles.product__title, styles.product__line)}>
                  About
                </h3>
                {data.description.map(({ title, text }) => (
                  <div
                    className={styles['about-content']}
                    key={title}
                  >
                    <p
                      className={styles['about-content__title']}
                    >
                      {title}
                    </p>
                    {text.map(content => (
                      <p className={cn(
                        styles['product__body-text'],
                        styles['product__body-text--ligth'],
                        styles['about-content__text'],
                      )}
                      >
                        {content}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              <div className={styles['product__container--part-50']}>
                <h3 className={cn(styles.product__title, styles.product__line)}>
                  Tech specs
                </h3>

                <div>
                  {specTitles.map((item) => {
                    const key
                      = item.toLocaleLowerCase() as keyof ProductDetailItem;

                    return (
                      <div className={styles['product__spec-wrapp']} key={key}>
                        <p
                          className={cn(
                            styles['product__body-text'],
                            styles['product__body-text--ligth'],
                          )}
                        >
                          {item}
                        </p>
                        <p className={styles['product__body-text']}>
                          {`${data[key]}`}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div>
        <h2 className={styles.recomended__title}>You May also like</h2>
        <div className="recommended__container">
          {recommendedProducts.map((product) => (
            <Card productData={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
});
