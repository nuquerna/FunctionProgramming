import { useState, FC } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import styles from './Search.module.scss';
import { Row } from '../Table';

interface SearchProps {
  store?: {};
  updateStore?: (val) => void;
}

export const Search: FC<SearchProps> = ({
  store,
  updateStore,
}: SearchProps) => {
  const [searchedValue, setSearchedValue] = useState('');

  const onChange = value => {
    setSearchedValue(value);

    if (!value.trim().length) updateStore(store);
    updateStore(
      [...(store as Row[])].filter(
        s =>
          s.username.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
          s.country.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
          s.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      )
    );
  };

  return (
    <OutlinedInput
      className={styles.input}
      placeholder="Search by country/name/username"
      value={searchedValue}
      type="search"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      onChange={e => onChange(e.target.value)}
    />
  );
};
