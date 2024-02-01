import React, {
  FC,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
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
  const [hideInput, setHideInput] = useState(true);

  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearchQuery = debounce<string>((arg) => {
    setSearchQuery(arg);
  }, 1000);

  const handleOnClear = () => {
    setCurrentValue('');
    debouncedSearchQuery('');
  };

  useEffect(() => {
    handleOnClear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    handleSearch(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setCurrentValue(value);
    debouncedSearchQuery(value.toLocaleLowerCase());
  };

  const handleOnIconClick = () => {
    setHideInput(prevState => !prevState);
    if (hideInput) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <div className={cn(styles.search, {
      [styles['search--is-show']]: !hideInput,
    })}
    >
      <div className={styles['search__input-wrapp']}>
        <input
          type="text"
          placeholder="Search..."
          ref={inputRef}
          className={cn(styles.search__input, {
            [styles['search__input--show']]: hideInput,
            [styles['search__input--hide']]: !hideInput,
          })}
          value={currentValue}
          onChange={handleInputOnChange}
        />
      </div>

      {currentValue.length > 0 && (
        <button
          type="button"
          className={styles['search__icon-wrapp']}
          onClick={handleOnClear}
          aria-label="clear"
        >
          <Close />
        </button>
      )}

      {currentValue.length === 0 && (
        <button
          type="button"
          className={styles['search__icon-wrapp']}
          onClick={handleOnIconClick}
          aria-label="show/hide"
        >
          <SearchIcon />
        </button>
      )}
    </div>
  );
};
