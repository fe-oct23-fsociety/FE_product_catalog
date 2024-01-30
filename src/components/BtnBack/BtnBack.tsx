import React, { FC } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowBack } from '../../images/icons/arrow-left.svg';
import styles from './BtnBack.module.scss';

type Props = {
  isHidden?: boolean;
};

export const BtnBack: FC<Props> = ({ isHidden }) => {
  const history = useNavigate();
  const returnToPreviousPage = () => {
    history(-1);
  };

  return (
    <button
      className={cn(styles['btn-back'], {
        [styles['btn-back--hidden']]: isHidden,
      })}
      type="button"
      aria-label="btn"
      onClick={returnToPreviousPage}
    >
      <ArrowBack />
      Back
    </button>
  );
};
