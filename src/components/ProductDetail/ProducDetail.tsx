/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import React, { useContext, useState, useEffect } from 'react';
import '../../styles/base-theme.scss';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import axios from 'axios';
import { observer } from 'mobx-react-lite';

import { apiRoutes } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { CartContext } from '../CartContext/CartContext';
import { ProductDetailItem } from '../../types/ProductDetailItem';
import { Loader } from '../Loader';
import styles from './ProductDetail.module.scss';
import { shopCart } from '../../store/CartStorage';
import { favourites } from '../../store/FavouritesStorage';
import { Product } from '../../types/ProductEntity';
import { ProductShowcase } from '../ProductShowcase';
import { BtnBack } from '../BtnBack';
import { preperedColor } from '../../utils/helpers';
import { ProductsSlider } from '../ProductsSlider';
import { PageSection } from '../PageSection';

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
  const navigate = useNavigate();
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
  const [selectedColor, setSelectedColor] = useState<string | undefined>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string | undefined>('');

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
      console.log(err);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, [id]);

  useEffect(() => {
    setAxios({
      method: 'get',
      url: `${apiRoutes.SHOW_PRODUCTS}/${id}`,
    });
    getProductsFromServer();
    getRecomendedProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (data && data.color) {
      setSelectedColor(preperedColor(data.color));
    }

    if (data && data.capacity) {
      setSelectedCapacity(data.capacity.toLowerCase());
    }
  }, [data]);

  const handleChangeId = () => {
    if (data && selectedCapacity && selectedColor) {
      const newId
        = `${data?.namespaceId}-${selectedCapacity.toLowerCase()}-${selectedColor}`;
      const changedId = productsArray.find((el) => el.itemId === newId);

      if (changedId) {
        navigate(
          `/${changedId.category}/${changedId.id}`,
          {
            replace: true,
          },
        );
      }
    }
  };

  useEffect(() => {
    handleChangeId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCapacity, selectedColor]);

  const handleChangeColor = (color: string) => {
    setSelectedColor(preperedColor(color));
  };

  const handleChangeCapacity = (capacity: string) => {
    setSelectedCapacity(capacity);
  };

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
      <PageSection>
        <div className="mb-24">
          <BtnBack />
        </div>

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
                selectedColor={selectedColor}
                selectedCapacity={selectedCapacity}
                handleChangeColor={handleChangeColor}
                handleChangeCapacity={handleChangeCapacity}
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
                        <p
                          className={cn(
                            styles['product__body-text'],
                            styles['product__body-text--ligth'],
                            styles['about-content__text'],
                          )}
                          key={crypto.randomUUID()}
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

                      if (data[key] !== null) {
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
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </PageSection>

      <section className={styles.recommendedProducts}>
        {recommendedProducts && recommendedProducts.length > 0 && (
          <ProductsSlider
            sectionTitle="You may also like"
            productsData={recommendedProducts}
          />
        )}
      </section>
    </section>
  );
});
