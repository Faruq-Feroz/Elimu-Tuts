import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>ElimuTuts</h3>
            <p>Empowering education through technology</p>
          </div>
          <div className={styles.section}>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/courses">Courses</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className={styles.section}>
            <h4>Contact Us</h4>
            <p>Email: info@elimituts.com</p>
            <p>Phone: +254 123 456 789</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} ElimuTuts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  ); 
};

export default Footer; 