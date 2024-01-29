import React, { useRef, useState } from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import cn from 'classnames';

import { ProductDetailItem } from '../../types/ProductDetailItem';
import { useWindowWidth } from '../../hooks/useWindowWidth';

import heartIcon from '../../images/icons/heart.svg';
import styles from './ProductShowcase.module.scss';

import { BtnSquare } from '../BtnSquare';
import { BtnRount } from '../BtnRound';
import { BtnAdd } from '../BtnAdd';

type Props = {
  data: ProductDetailItem;
  handleAddToCart: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isInCart: boolean;
  shortSpecTitles: string[];
};

const PREF_TO_STATIC_SERVER
  = 'https://fsociety-be-product-catalog.onrender.com/static/';

export const ProductShowcase: React.FC<Props> = ({
  data,
  handleAddToCart,
  isInCart,
  shortSpecTitles,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);
  const isNotMob = useWindowWidth() >= 768;

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
      setActiveSlide(index);
    }
  };

  const windowWidth = useWindowWidth();

  const getSizeValue = () => {
    if (windowWidth < 640) {
      return 50;
    }

    if (windowWidth < 1200) {
      return 35;
    }

    return 80;
  };

  return (
    <div className={styles.productShowcase}>
      <div className={styles.productSlider}>
        <div className={styles.productSlider__nav}>
          {data.images.map((img, index) => (
            <BtnSquare
              onClick={() => goToSlide(index)}
              sizeValue={Number(getSizeValue())}
              srcValue={PREF_TO_STATIC_SERVER + img}
              classNameValue={cn(styles.productSlider__navItem, {
                [styles['productSlider__navItem--active']]: activeSlide === index,
              })}
            />
          ))}
        </div>

        <div className={styles.productSlider__swiperRoot}>
          <Swiper
            direction="vertical"
            slidesPerView={1}
            wrapperClass={styles.productSlider__swiperWrapper}
            onSwiper={(swiper: SwiperCore) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper: SwiperCore) => setActiveSlide(swiper.activeIndex)}
          >
            {data.images.map((img, index) => (
              <SwiperSlide
                key={crypto.randomUUID()}
                className={styles.productSlider__swiperSlide}
              >
                <img
                  src={PREF_TO_STATIC_SERVER + img}
                  alt={`${data.name} img ${index}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className={styles.productSelection}>
        <div className={styles.colorSelector}>
          <div className={styles.colorSelector__label}>
            <p className={styles['colorSelector__label-title']}>
              Available colors
            </p>

            {!isNotMob && (
              <p className={styles['colorSelector__label-id']}>
                {`ID: ${data.namespaceId}`}
              </p>
            )}
          </div>

          <div className={styles.colorSelector__colors}>
            {data.colorsAvailable.map(color => (
              <BtnRount key={crypto.randomUUID()} color={color} />
            ))}
          </div>
        </div>

        <div className={styles.capacitySelector}>
          <p className={styles.capacitySelector__title}>
            Select capacity
          </p>

          <div className={styles.capacitySelector__capacityes}>
            {data.capacityAvailable.map(capacity => (
              <button
                type="button"
                className={styles.capacitySelector__capacity}
                key={crypto.randomUUID()}
              >
                {capacity}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.productPrice}>
          <p className={styles.productPrice__discount}>
            {`$${data.priceDiscount}`}
          </p>

          <p className={styles.productPrice__regular}>
            {`$${data.priceRegular}`}
          </p>
        </div>

        <div className={styles.productActions}>
          <div className={styles.productActions__firstBtn}>
            <BtnAdd
              isInCart={isInCart}
              onclick={e => handleAddToCart(e)}
            />
          </div>

          <BtnSquare srcValue={heartIcon} />
        </div>

        <div className={styles.productSpecs}>
          {shortSpecTitles.map(title => {
            const key
            = title.toLocaleLowerCase() as keyof ProductDetailItem;

            return (
              <div
                key={crypto.randomUUID()}
                className={styles.productSpecs__params}
              >
                <p className={styles.productSpecs__title}>
                  {title}
                </p>

                <p className={styles.productSpecs__subtitle}>
                  {`${data[key]}`}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {isNotMob && (
        <div className={styles.productId}>
          <p>{`ID: ${data.namespaceId}`}</p>
        </div>
      )}
    </div>
  );
};
