'use client';

import React from 'react';
import { UserTable } from '../../interface/User';
import styles from './Table.module.css';


const Table: React.FC<UserTable> = ({ data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>ID</th>
          <th className={styles.th}>Email</th>
          <th className={styles.th}>First Name</th>
          <th className={styles.th}>Last Name</th>
          <th className={styles.th}>Avatar</th>
        </tr>
      </thead>
      <tbody>
        {data.map(user => (
          <tr key={user.id}>
            <td className={styles.td}>{user.id}</td>
            <td className={styles.td}>{user.email}</td>
            <td className={styles.td}>{user.first_name}</td>
            <td className={styles.td}>{user.last_name}</td>
            <td className={styles.td}>
              <img className={styles.img} src={user.avatar} alt={user.first_name} width={50} height={50} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;