'use client';

import { signIn } from 'next-auth/react';
import styles from './SignInButton.module.css';

const SignInButton = () => {
  return (
    <button className={styles.signInButton} onClick={() => signIn('google')}>
      <img
          src="./google.png"
          alt="Google Icon"
          width={20}
          height={20}
          className={styles.icon}
        />
      <span className={styles.buttonText}>Sign in with Google</span>
    </button>
  );
};

export default SignInButton;