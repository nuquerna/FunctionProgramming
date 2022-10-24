import { FC, useContext } from 'react';
import { useState, useEffect } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import { Image, User, Account } from '../types';
import { Table, Filters, Sort, Search, Row } from './components';
import { getImages, getUsers, getAccounts } from './mocks/api';
import rows from './mocks/rows.json';

import styles from './App.module.scss';

// mockedData has to be replaced with parsed Promises’ data
const mockedData: Row[] = rows.data;
let initialState = [];

export const App: FC = () => {
  const [data, setData] = useState<Row[]>(undefined);

  const dataConverter = (
    users: User[],
    accounts: Account[],
    images: Image[]
  ): Row[] => {
    const rows = users.map(u => {
      const img = images.find(i => i.userID === u.userID);
      const acc = accounts.find(a => a.userID === u.userID);

      return {
        avatar: img.url,
        username: u.username,
        country: u.country,
        name: u.name,
        lastPayments: acc.payments.length,
        posts: acc.posts,
      };
    });

    return rows;
  };

  useEffect(() => {
    // fetching data from API
    Promise.all([getImages(), getUsers(), getAccounts()]).then(
      ([images, users, accounts]: [Image[], User[], Account[]]) => {
        const convertedData = dataConverter(users, accounts, images);
        initialState = convertedData;
        setData(convertedData);
      }
    );
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters store={initialState} updateStore={setData} />
            <Sort store={initialState} updateStore={setData} />
          </div>
          <Search store={initialState} updateStore={setData} />
        </div>
        <Table rows={data || mockedData} />
      </div>
    </StyledEngineProvider>
  );
};
