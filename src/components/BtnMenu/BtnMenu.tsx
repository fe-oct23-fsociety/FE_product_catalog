import React, { FC, useState, useEffect } from 'react';
import cn from 'classnames';
import styles from './BtnMenu.module.scss';

type Props = {
  onclick: (arg: boolean) => void;
  onClose: boolean;
};

export const BtnMenu: FC<Props> = ({ onclick, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (onClose && isOpen) {
      setIsOpen(false);
    }
  }, [onClose, isOpen]);

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    setIsOpen((isOpenPrev) => !isOpenPrev);
    onclick(!isOpen);
  };

  return (
    <button
      type="button"
      aria-label="menu open/close"
      className={styles['btn-menu']}
      onClick={handleOnClick}
    >
      <span
        className={cn(styles['btn-menu__icon'], {
          [styles['btn-menu__icon--close']]: isOpen,
        })}
      />
    </button>
  );
};
