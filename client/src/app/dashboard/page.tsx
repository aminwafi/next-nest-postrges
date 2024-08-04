'use client';

import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../store/store';
// import { fetchUsers } from '../../store/userSlice';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

import Layout from '../components/Layout';
import Table from './Table';

const Dashboard = async () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const { filteredUsers } = useSelector((state: RootState) => state.users);

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [dispatch]);

  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <Layout>
        <div>
          <h1>Access Denied</h1>
          <p>You need to be authenticated to view this page.</p>
        </div>
      </Layout>
    );
  }

  // return (
  //   <Layout>
  //     <div>
  //       {filteredUsers.length > 0 ? (
  //         <Table data={filteredUsers} />
  //       ) : (
  //         <p>No users found with the specified criteria.</p>
  //       )}
  //       {/* <h1>Welcome to the Dashboard</h1>
  //       <p>You have successfully logged in!</p> */}
  //     </div>
  //   </Layout>
  // );
};

export default Dashboard;