import React, { FC, useState, useEffect } from 'react';
import { debounce } from '../../helpers/debounce';
import { ReactComponent as SearchIcon } from '../../images/icons/search.svg';
import { ReactComponent as Close } from '../../images/icons/close-btn.svg';
import styles from './Search.module.scss';

type Props = {
  handleSearch: (querye: string) => void;
};

export const Search: FC<Props> = ({ handleSearch }) => {
  const [currentValue, setCurrentValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    handleSearch(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const debouncedSearchQuery = debounce<string>((arg) => {
    setSearchQuery(arg);
  }, 1000);

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setCurrentValue(value);
    debouncedSearchQuery(value);
  };

  return (
    <div className={styles.search}>
      <div className={styles['search__input-wrapp']}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.search__input}
          value={currentValue}
          onChange={handleInputOnChange}
        />
      </div>

      <div className={styles['search__icon-wrapp']}>
        <SearchIcon />
        <Close />
      </div>
    </div>
  );
};
