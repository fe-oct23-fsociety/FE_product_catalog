import React, { FC } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import './NotFoundPage.scss';
import { BtnBack } from '../BtnBack';
// import notFound from '../../images/wasted.png';

export const NotFoundPage: FC = () => {
  return (
    <>
      <Header />
      <div className="go-back-btn">
        <BtnBack />
      </div>
      <div className="img">
        <img
          // eslint-disable-next-line max-len
          src="https://t3.ftcdn.net/jpg/02/88/21/52/360_F_288215231_BQhjdUFPPOCMCM3BGhuYhOixcpPm3E85.webp"
          className="notFound"
          alt="card"
        />
      </div>
      <Footer />
    </>
  );
};
