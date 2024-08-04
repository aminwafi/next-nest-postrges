import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

import Layout from '../components/Layout';
import ClientComponent from './ClientComponent';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/error');
    // return (
    //   <Layout>
    //     <div>
    //       <h1>Access Denied</h1>
    //       <p>You need to be authenticated to view this page.</p>
    //     </div>
    //   </Layout>
    // );
  } else {
    return (
      <ClientComponent></ClientComponent>
    );
  }
};

export default Dashboard;