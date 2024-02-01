/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';

import { useNavigate } from 'react-router-dom';

import { Pagination, Autoplay } from 'swiper/modules';
import arrowLeftIcon from '../../images/icons/arrow-left.svg';
import arrowRightIcon from '../../images/icons/arrow-right.svg';
import placeHolderBannerImg from '../../images/Banner.png';
import placeHolderBannerImg2 from '../../images/banner-2.png';
import placeHolderBannerImg3 from '../../images/banner-3.png';
import placeHolderMobBannerImg from '../../images/Banner-mobile.png';
import placeHolderMobBannerImg2 from '../../images/banner-mobile-2.png';
import placeHolderMobBannerImg3 from '../../images/banner-mobil-3.png';
import styles from './PromoSlider.module.scss';
import '../../styles/paginationBullets.scss';
import { useWindowWidth } from '../../hooks/useWindowWidth';

export const PromoSlider: React.FC = () => {
  const isMob = useWindowWidth() <= 639;
  const swiperRef = useRef<SwiperCore | null>(null);

  const slidesPlaceholder = [
    placeHolderBannerImg,
    placeHolderBannerImg2,
    placeHolderBannerImg3,
  ];

  const slidesPlaceholderMob = [
    placeHolderMobBannerImg,
    placeHolderMobBannerImg2,
    placeHolderMobBannerImg3,
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

  const navigate = useNavigate();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === 'Enter') {
      switch (index) {
        case 0:
          navigate('/phones/81');
          break;
        case 1:
          navigate('/tablets/155');
          break;
        case 2:
          navigate('/accessories/142');
          break;
        default:
      }
    }
  };

  const handleCardClick = (index: number) => {
    switch (index) {
      case 0:
        navigate('/phones/81');
        break;
      case 1:
        navigate('/tablets/155');
        break;
      case 2:
        navigate('/accessories/142');
        break;
      default:
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
          {!isMob && slidesPlaceholder.map((slidePlaceholder, index) => (
            <SwiperSlide
              key={crypto.randomUUID()}
              className={styles.promoSlider__swiperSlide}
            >
              <img
                src={slidePlaceholder}
                alt="1"
                onClick={() => handleCardClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            </SwiperSlide>
          ))}

          {isMob && slidesPlaceholderMob.map((slidePlaceholderMob, index) => (
            <SwiperSlide
              className={styles.promoSlider__swiperSlide}
              key={crypto.randomUUID()}
            >
              <img
                src={slidePlaceholderMob}
                alt="1"
                onClick={() => handleCardClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
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
