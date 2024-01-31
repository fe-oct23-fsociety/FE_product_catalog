import React, { FC, useState, useEffect } from 'react';
import { debounce } from '../../helpers/debounce';

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
    <div className="dropdown is-active">
      <div className="dropdown-trigger">
        <input
          type="search"
          placeholder="Enter the name"
          className="input"
          value={currentValue}
          onChange={handleInputOnChange}
        />
      </div>
    </div>
  );
};