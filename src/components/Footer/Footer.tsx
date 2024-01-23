import React from 'react';

import styles from './Footer.module.scss';
import logoImg from '../../images/logo/Logo.png';
import arrowTopIcon from '../../images/icons/arrow-top.svg';

import { BtnSquare } from '../BtnSquare';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a href="##" className={styles.footer__logo}>
        <img src={logoImg} alt="logo" />
      </a>

      <section className={styles.footer__links}>
        <a href="##" className={styles.footer__link}>
          GitHub
        </a>

        <a href="##" className={styles.footer__link}>
          Contacts
        </a>

        <a href="##" className={styles.footer__link}>
          Rights
        </a>
      </section>

      <label className={styles.footer__anchor}>
        <span>Back to top</span>

        <BtnSquare
          sizeValue={32}
          srcValue={arrowTopIcon}
          altValue="arror top icon"
        />
      </label>
    </footer>
  );
};
