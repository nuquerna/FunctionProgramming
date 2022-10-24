import { FC } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import styles from './Sort.module.scss';
import { Row } from '../Table';

interface SortProps {
  store?: {};
  updateStore?: (val) => void;
}

export const Sort: FC<SortProps> = ({ store, updateStore }: SortProps) => {
  const handleChange = value => {
    if (!store || !updateStore) return;

    updateStore(
      [...(store as Row[])].sort((a, b) => {
        if (value === 'asc') return a.lastPayments - b.lastPayments;
        return b.lastPayments - a.lastPayments;
      })
    );
  };

  return (
    <FormControl className={styles.control} component="fieldset">
      <FormLabel className={styles.label}>Sort by payments</FormLabel>
      <RadioGroup
        className={styles.group}
        aria-label="sorting"
        name="radio-buttons-group"
        onChange={e => handleChange(e.target.value)}
      >
        <FormControlLabel value="desc" control={<Radio />} label="desc" />
        <FormControlLabel value="asc" control={<Radio />} label="asc" />
      </RadioGroup>
    </FormControl>
  );
};
