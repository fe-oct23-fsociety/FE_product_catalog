import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';

import { Card } from '../Card';
import { Product } from '../../types/ProductEntity';
import { BtnSquare } from '../BtnSquare';

import styles from './ProductsSlider.module.scss';
import { useWindowWidth } from '../../hooks/useWindowWidth';

import arrowLeftIcon from '../../images/icons/arrow-left.svg';
import arrowRightIcon from '../../images/icons/arrow-right.svg';

type Props = {
  sectionTitle: string;
  productsData?: Product[];
};

export const ProductsSlider: React.FC<Props> = ({
  productsData,
  sectionTitle,
}) => {
  const windowWidth = useWindowWidth();
  const swiperRef = useRef<SwiperCore | null>(null);
  const [isShowButton, setIsShowButton] = useState(true);

  useEffect(() => {
    if (productsData) {
      setIsShowButton(productsData?.length >= 5);
    }
  }, [productsData]);

  const getColumsCount = () => {
    if (windowWidth <= 639) {
      return 1;
    }

    if (windowWidth <= 1199) {
      return 2;
    }

    if (windowWidth > 1199) {
      return 4;
    }

    return 1;
  };

  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <section className={styles.productSlider}>
      <div className={styles.productSlider__topBar}>
        <h2 className={styles['productSlider__topBar-title']}>{sectionTitle}</h2>

        {isShowButton && (
          <div className={styles['productSlider__topBar-actions']}>
            <BtnSquare srcValue={arrowLeftIcon} onClick={goPrev} />
            <BtnSquare srcValue={arrowRightIcon} onClick={goNext} />
          </div>
        )}
      </div>

      <div className={styles.productSlider__swiperRoot}>
        <Swiper
          loop
          navigation
          spaceBetween={16}
          slidesPerView={Number(getColumsCount())}
          wrapperClass={styles.productSlider__swiperWrapper}
          onSwiper={(swiper: SwiperCore) => {
            swiperRef.current = swiper;
          }}
        >
          {productsData?.slice(0, 31).map((productData) => (
            <SwiperSlide
              key={crypto.randomUUID()}
              className={styles.productSlider__swiperSlide}
            >
              <div className={styles.productSlider__swiperCard}>
                <Card productData={productData} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};