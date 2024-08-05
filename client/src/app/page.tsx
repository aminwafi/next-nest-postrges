import SignInButton from './components/SignInButton';
import Layout from './components/Layout';
import styles from './page.module.css';

const HomePage = () => {
  return (
    <Layout>
    <div className={styles.container}>
      <div className={styles.signInContainer}>
        <SignInButton />
      </div>
    </div>
  </Layout>
  );
};

export default HomePage;
