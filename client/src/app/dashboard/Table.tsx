'use client';

import React from 'react';
import { UserTable } from '../../interface/User';


const Table: React.FC<UserTable> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Avatar</th>
        </tr>
      </thead>
      <tbody>
        {data.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>
              <img src={user.avatar} alt={user.first_name} width={50} height={50} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;