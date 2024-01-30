/* eslint-disable no-console */
import React from 'react';
import cn from 'classnames';
import styles from './BtnRound.module.scss';

type Props = {
  color?: string;
  selectedColor: string | undefined;
  handleChangeColor: (color: string) => void;
};

export const BtnRount: React.FC<Props> = ({
  selectedColor,
  color = 'white',
  handleChangeColor,
}) => {
  const btnBackgroundColor = {
    backgroundColor: color,
  };

  const isSelected = selectedColor === color.replace(' ', '-');

  return (
    <button
      type="button"
      className={cn(styles.btnRound, { [styles.selected]: isSelected })}
      aria-label="Choose color"
      style={btnBackgroundColor}
      onClick={() => handleChangeColor(color)}
    />
  );
};
