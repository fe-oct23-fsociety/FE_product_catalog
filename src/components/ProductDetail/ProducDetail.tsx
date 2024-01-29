import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { apiRoutes } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { CartContext } from '../CartContext/CartContext';
import { ProductDetailItem } from '../../types/ProductDetailItem';
import { Loader } from '../Loader';
import styles from './ProductDetail.module.scss';
import { shopCart } from '../../store/CartStorage';
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

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { cartCount, setCartCount } = useContext(CartContext);
  const [isInCart, setIsInCart] = useState(() => {
    if (!id) {
      return false;
    }

    return shopCart.cartItems.some((item) => item.id === +id);
  });
  const [setAxios, loading, data, error] = useAxios<ProductDetailItem>(null);

  useEffect(() => {
    setAxios({
      method: 'get',
      url: `${apiRoutes.SHOW_PRODUCTS}/${id}`,
    });
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
            <ProductShowcase
              data={data}
              handleAddToCart={handleAddToCart}
              isInCart={isInCart}
              shortSpecTitles={shortSpecTitles}
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
    </section>
  );
};
