import React from 'react';

import styles from './Footer.module.scss';
import logoImg from '../../images/logo/Logo.png';
import arrowTopIcon from '../../images/icons/arrow-top.svg';

import { BtnSquare } from '../BtnSquare';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className={styles.footer}>
      <a href="##" className={styles.footer__logo}>
        <img src={logoImg} alt="logo" />
      </a>

      <section className={styles.footer__links}>
        <a
          href="https://github.com/fe-oct23-fsociety"
          className={styles.footer__link}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>

        <a
          href="https://github.com/fe-oct23-fsociety"
          className={styles.footer__link}
          target="_blank"
          rel="noreferrer"
        >
          Contacts
        </a>

        <a
          href="https://github.com/fe-oct23-fsociety"
          className={styles.footer__link}
          target="_blank"
          rel="noreferrer"
        >
          Rights
        </a>
      </section>

      <label className={styles.footer__anchor}>
        <span>Back to top</span>

        <BtnSquare
          sizeValue={32}
          srcValue={arrowTopIcon}
          altValue="arror top icon"
          onClick={scrollToTop}
        />
      </label>
    </footer>
  );
};
