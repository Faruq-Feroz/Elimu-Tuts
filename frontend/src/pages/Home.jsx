import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Transform Your Education Journey</h1>
          <p>Access quality education resources aligned with the CBC curriculum</p>
          <div className={styles.heroButtons}>
            <Link to="/courses" className={styles.primaryButton}>
              Explore Courses
            </Link>
            <Link to="/register" className={styles.secondaryButton}>
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2>Why Choose ElimuTuts?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📚</div>
            <h3>CBC Aligned</h3>
            <p>All content follows the Competency-Based Curriculum guidelines</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h3>Quality Content</h3>
            <p>Created by experienced educators and subject matter experts</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📱</div>
            <h3>Flexible Learning</h3>
            <p>Access content anytime, anywhere on any device</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎓</div>
            <h3>Progress Tracking</h3>
            <p>Monitor your learning journey and achievements</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of students already learning on ElimuTuts</p>
          <Link to="/register" className={styles.ctaButton}>
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 