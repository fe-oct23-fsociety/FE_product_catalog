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
import { BtnAdd } from '../BtnAdd';
import heartIcon from '../../images/icons/heart.svg';
import heartIconActive from '../../images/icons/heart-active.svg';
import { BtnSquare } from '../BtnSquare';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { Loader } from '../Loader';
import iphoneImage from '../../images/iPhone.png';
import styles from './ProductDetail.module.scss';
import { shopCart } from '../../store/CartStorage';
import { favourites } from '../../store/FavouritesStorage';
import { Product } from '../../types/ProductEntity';
import { Card } from '../Card';

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
  const isNotMob = useWindowWidth() >= 768;
  const { cartCount, setCartCount } = useContext(CartContext);
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
      const response = await axios
        .get('https://fsociety-be-product-catalog.onrender.com/products');
      const { products } = response.data;

      setProductsArray(products);
    } catch (err) {
      console.error(err);
    }
  };

  const getRecomendedProducts = async () => {
    try {
      const response = await axios.get(`${apiRoutes.SHOW_PRODUCTS}/${id}/recommended`);

      setRecommendedProducts(response.data);
    } catch (err) {
      console.log(err);
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

    if (isInCart) {
      setCartCount(cartCount - 1);
    } else {
      setCartCount(cartCount + 1);
    }

    setIsInCart(!isInCart);
  };

  const handleAddToFav = () => {
    const productToAdd = productsArray.find(el => el.itemId === data?.id);

    console.log(productToAdd);

    if (productToAdd) {
      favourites.toggleAddToFavourites(productToAdd);
    }
  };

  const isCurrent = (a: string, b: string) => {
    return parseInt(a, 10) === parseInt(b, 10);
  };

  const isInFavourites = favourites.favourites.some(el => el.itemId === data?.id);

  return (
    <section>
      {loading && !error && (
        <div className={styles['container-loading']}>
          <Loader />
        </div>
      )}

      {data && (
        <>
          <h2 className={styles['product__main-title']}>{data.name}</h2>
          <div className={styles.product__wrapp}>
            <div
              className={cn(
                styles.product__container,
                styles['product__container--top'],
              )}
            >
              <div className={styles['product__container--part-50']}>
                {/* add photos here */}
                <img src={iphoneImage} alt={data.name} />
              </div>

              <div
                className={cn(
                  styles.product__container,
                  styles['product__container--part-50'],
                )}
              >
                <div className={styles['product__container--part-60']}>
                  <div className={styles.product__line}>
                    <div className={cn(styles['product__title-container-mob'])}>
                      <p
                        className={cn(
                          styles['product__small-title'],
                          styles['product__small-title--ligth'],
                        )}
                      >
                        Available colors
                      </p>
                      {!isNotMob && (
                        <p
                          className={cn(
                            styles['product__small-title'],
                            styles['product__small-title--ligth'],
                          )}
                        >
                          {`ID: ${data.namespaceId}`}
                        </p>
                      )}
                    </div>

                    <div className={styles.product__specific}>
                      {data.colorsAvailable.map((color) => (
                        <div
                          style={{ background: color }}
                          className={cn(styles['product__color-round'], {
                            [styles['product__color-round--current']]:
                              color === data.color,
                          })}
                        />
                      ))}
                    </div>
                  </div>

                  <div className={styles.product__line}>
                    <p
                      className={cn(
                        styles['product__small-title'],
                        styles['product__small-title--ligth'],
                      )}
                    >
                      Select capacity
                    </p>
                    <div className={styles.product__specific}>
                      {data.capacityAvailable.map((capacity) => (
                        <p
                          className={cn(styles.product__capacity, {
                            [styles['product__capacity--active']]: isCurrent(
                              capacity,
                              data.capacity,
                            ),
                          })}
                        >
                          {capacity}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className={styles.product__price}>
                      <p className={styles['product__price-discount']}>
                        {`$${data.priceDiscount}`}
                      </p>
                      <p className={styles['product__price-regular']}>
                        {`$${data.priceRegular}`}
                      </p>
                    </div>
                    <div className={styles.product__cta}>
                      <BtnAdd
                        onclick={(e) => handleAddToCart(e)}
                        isInCart={isInCart}
                      />

                      <BtnSquare
                        srcValue={isInFavourites ? heartIconActive : heartIcon}
                        altValue="Heart icon"
                        onClick={handleAddToFav}
                      />
                    </div>

                    <div>
                      {shortSpecTitles.map((title) => {
                        const key
                          = title.toLocaleLowerCase() as keyof ProductDetailItem;

                        return (
                          <div
                            className={styles['product__spec-wrapp']}
                            key={key}
                          >
                            <p
                              className={cn(
                                styles['product__small-title'],
                                styles['product__small-title--ligth'],
                              )}
                            >
                              {title}
                            </p>
                            <p className={styles['product__small-title']}>
                              {`${data[key]}`}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {isNotMob && (
                  <div>
                    <p
                      className={cn(
                        styles['product__small-title'],
                        styles['product__small-title--ligth'],
                      )}
                    >
                      {`ID: ${data.namespaceId}`}
                    </p>
                  </div>
                )}
              </div>
            </div>

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
        <h2
          className={styles.recomended__title}
        >
          You May also like
        </h2>
        <div className="recommended__container">
          {recommendedProducts.map(product => (
            <Card productData={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
});
