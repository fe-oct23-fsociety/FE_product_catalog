import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.scss';
import { useAxios } from '../../hooks/useAxios';
import { ItemsFromServer } from '../../types/ItemsFromServer';
import { apiRoutes } from '../../const/routes';
import { Loader } from '../Loader';
import { Card } from '../Card';
import phoneCategoryImg from '../../images/phone-category.png';
import tabletsCategoryImg from '../../images/tablets-category.png';
import accessoriesCategoryImg from '../../images/accessories-category.png';
import { Product } from '../../types/ProductEntity';

export const HomePage: React.FC = () => {
  const [setAxios, loading, data, error] = useAxios<ItemsFromServer>(null);
  const [setHotPrices, loadingHotPrices, dataHotPrices, errorHotPrices]
    = useAxios<Product[]>(null);

  useEffect(() => {
    setAxios({
      method: 'get',
      url:
        `${apiRoutes.SHOW_PRODUCTS}`
        + `?${apiRoutes.CATEGORY('phones')}&${apiRoutes.PAGINATION(4, 0)}`,
    });

    setHotPrices({
      method: 'get',
      url:
        `${apiRoutes.SHOW_PRODUCTS}`
        + `${apiRoutes.DISCOUNT}?${apiRoutes.PAGINATION(4, 0)}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productsData = data?.products;

  const navigate = useNavigate();

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    category: string,
  ) => {
    if (event.key === 'Enter') {
      navigate(`${category}`);
    }
  };

  const handleCardClick = (category: string) => {
    navigate(`${category}`);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <section className={styles.banner} />

      <section className={styles.productsContainer}>
        <h2 className={styles.subTitle}>Brand new models</h2>

        {loading && !error && (
          <div className={styles['container-loading']}>
            <Loader />
          </div>
        )}

        {data && data.count > 0 && (
          <div className={styles.cardContainer}>
            {productsData?.map((product) => (
              <Card productData={product} key={product.id} />
            ))}
          </div>
        )}
      </section>

      <section className={styles.productsContainer}>
        <h2 className={styles.subTitle}>Shop by category</h2>
        <div className={styles.categoriesContainer}>
          <div
            className={styles.category}
            onClick={() => handleCardClick('phones')}
            onKeyDown={(e) => handleKeyDown(e, 'phones')}
            role="button"
            tabIndex={0}
          >
            <img
              src={phoneCategoryImg}
              alt="Mobile phones"
              className={styles.categoryImg}
            />
            <h4 className={styles.categoryTitle}>Mobile phones</h4>
            <p className={styles.categoryCount}>95 models</p>
          </div>
          <div
            className={styles.category}
            onClick={() => handleCardClick('tablets')}
            onKeyDown={(e) => handleKeyDown(e, 'tablets')}
            role="button"
            tabIndex={0}
          >
            <img
              src={tabletsCategoryImg}
              alt="Tablets"
              className={styles.categoryImg}
            />
            <h4 className={styles.categoryTitle}>Tablets</h4>
            <p className={styles.categoryCount}>24 models</p>
          </div>
          <div
            className={styles.category}
            onClick={() => handleCardClick('accessories')}
            onKeyDown={(e) => handleKeyDown(e, 'accessories')}
            role="button"
            tabIndex={0}
          >
            <img
              src={accessoriesCategoryImg}
              alt="Accessories"
              className={styles.categoryImg}
            />
            <h4 className={styles.categoryTitle}>Accessories</h4>
            <p className={styles.categoryCount}>100 models</p>
          </div>
        </div>
      </section>

      <section className={styles.productsContainer}>
        <h2 className={styles.subTitle}>Hot prices</h2>

        {loadingHotPrices && !errorHotPrices && (
          <div className={styles['container-loading']}>
            <Loader />
          </div>
        )}

        {dataHotPrices && dataHotPrices.length > 0 && (
          <div className={styles.cardContainer}>
            {dataHotPrices.map((product) => (
              <Card productData={product} key={product.id} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
