import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          ElimuTuts
        </Link>
        
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/about" className={styles.navLink}>About</Link>
          <Link to="/courses" className={styles.navLink}>Courses</Link>
          <Link to="/contact" className={styles.navLink}>Contact</Link>
        </nav>

        <div className={styles.auth}>
          {currentUser ? (
            <Link to="/dashboard" className={styles.button}>
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className={styles.button}>
                Login
              </Link>
              <Link to="/register" className={`${styles.button} ${styles.primary}`}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
