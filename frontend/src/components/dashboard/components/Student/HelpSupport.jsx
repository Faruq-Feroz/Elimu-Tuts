// src/components/dashboard/student/HelpSupport.jsx
import React from 'react';
import styles from './HelpSupport.module.css';

const HelpSupport = () => {
  return (
    <div className={styles.helpSupport}>
      <h2>Help & Support</h2>
      <div className={styles.helpOptions}>
        <div className={styles.helpCard}>
          <h3>Chat with Tutor</h3>
          <p>Get real-time help from our qualified tutors</p>
          <button>Start Chat</button>
        </div>
        <div className={styles.helpCard}>
          <h3>FAQs</h3>
          <p>Find answers to commonly asked questions</p>
          <button>View FAQs</button>
        </div>
        <div className={styles.helpCard}>
          <h3>Contact Support</h3>
          <p>Email our support team for assistance</p>
          <button>Contact</button>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;