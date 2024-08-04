import Layout from '../components/Layout';

const ErrorPage = () => {
    return (
      <Layout>
        <div>
          <h1>Authentication Failed</h1>
          <p>There was an error with your login attempt. Please try again.</p>
        </div>
      </Layout>
    );
};
  
export default ErrorPage;