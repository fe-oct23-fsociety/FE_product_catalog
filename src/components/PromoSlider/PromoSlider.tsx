import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';

import { Pagination, Autoplay } from 'swiper/modules';
import arrowLeftIcon from '../../images/icons/arrow-left.svg';
import arrowRightIcon from '../../images/icons/arrow-right.svg';
import placeHolderBannerImg from '../../images/Banner.png';
import placeHolderMobBannerImg from '../../images/Banner-mobile.png';

import styles from './PromoSlider.module.scss';
import '../../styles/paginationBullets.scss';

import { useWindowWidth } from '../../hooks/useWindowWidth';

export const PromoSlider: React.FC = () => {
  const isMob = useWindowWidth() <= 640;
  const swiperRef = useRef<SwiperCore | null>(null);

  const slidesPlaceholder = [
    placeHolderBannerImg,
    placeHolderBannerImg,
    placeHolderBannerImg,
  ];

  const slidesPlaceholderMob = [
    placeHolderMobBannerImg,
    placeHolderMobBannerImg,
    placeHolderMobBannerImg,
  ];

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
    <section className={styles.promoSlider}>
      <button
        type="button"
        onClick={goPrev}
        className={styles.promoSlider__btnBack}
      >
        <img src={arrowLeftIcon} alt="arrow left icon" />
      </button>
      <div className={styles.promoSlider__swiperRoot}>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          wrapperClass={styles.promoSlider__swiperWrapper}
          onSwiper={(swiper: SwiperCore) => {
            swiperRef.current = swiper;
          }}
          modules={[Pagination, Autoplay]}
          rewind
          autoplay={{
            delay: 2400,
            disableOnInteraction: false,
          }}
          pagination={{
            el: `.${styles.promoSlider__swiperPagination}`,
            clickable: true,
            renderBullet: (index: number, className: string) => {
              return `<div class="${className}">\
                <div class="${className}__element"></div>\
                </div>`;
            },
          }}
          speed={1300}
        >
          {!isMob && slidesPlaceholder.map(slidePlaceholder => (
            <SwiperSlide
              key={crypto.randomUUID()}
              className={styles.promoSlider__swiperSlide}
            >
              <img
                src={slidePlaceholder}
                alt="1"
              />
            </SwiperSlide>
          ))}

          {isMob && slidesPlaceholderMob.map(slidePlaceholderMob => (
            <SwiperSlide
              className={styles.promoSlider__swiperSlide}
              key={crypto.randomUUID()}
            >
              <img
                src={slidePlaceholderMob}
                alt="1"
              />
            </SwiperSlide>
          ))}
          <div className={styles.promoSlider__swiperPagination} />
        </Swiper>
      </div>
      <button
        type="button"
        onClick={goNext}
        className={styles.promoSlider__btnForward}
      >
        <img src={arrowRightIcon} alt="arrow right icon" />
      </button>
    </section>
  );
};
