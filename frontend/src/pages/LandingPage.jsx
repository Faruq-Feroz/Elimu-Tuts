import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <Navbar />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage; 