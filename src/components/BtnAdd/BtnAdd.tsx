import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './BtnAdd.module.scss';

type Props = {
  onclick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isInCart: boolean;
};

export const BtnAdd: FC<Props> = ({ onclick, isInCart }) => {
  return (
    <button
      type="button"
      className={classNames({
        [styles['btn-add']]: !isInCart,
        [styles['btn-add--active']]: isInCart,
      })}
      onClick={onclick}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
