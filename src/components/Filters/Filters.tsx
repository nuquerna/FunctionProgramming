import { useState, FC } from 'react';
import Checkbox from '@mui/material/Checkbox';

import styles from './Filters.module.scss';
import { Row } from '../Table';

interface FiltersProps {
  store?: {};
  updateStore?: (val) => void;
}

const OPTIONS = [
  {
    title: 'Without posts',
  },
  {
    title: 'More than 100 posts',
  },
];

export const Filters: FC<FiltersProps> = ({
  store,
  updateStore,
}: FiltersProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const onChange = ({ title }) => {
    let updatedFilters;

    if (selectedFilter.find(filter => filter === title)) {
      updatedFilters = selectedFilter.filter(filter => filter !== title);
    } else {
      updatedFilters = [...selectedFilter, title];
    }

    setSelectedFilter(updatedFilters);

    updateStore(
      [...(store as Row[])].filter(r => {
        return (
          (updatedFilters.find(s => s === OPTIONS[0].title)
            ? r.posts === 0
            : true) &&
          (updatedFilters.find(s => s === OPTIONS[1].title)
            ? r.posts > 100
            : true)
        );
      })
    );
  };

  return (
    <div className={styles.group}>
      <div className={styles.title}>Filter by posts</div>
      <ul className={styles.list}>
        {OPTIONS.map(option => (
          <li
            value={option.title}
            key={option.title}
            onClick={() => onChange(option)}
          >
            <Checkbox
              checked={!!selectedFilter.find(filter => filter === option.title)}
              value={option.title}
              size="small"
              color="primary"
              onChange={() => onChange(option)}
            />{' '}
            {option.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
