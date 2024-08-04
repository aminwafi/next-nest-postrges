import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You need to be authenticated to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>You have successfully logged in!</p>
    </div>
  );
};

export default Dashboard;