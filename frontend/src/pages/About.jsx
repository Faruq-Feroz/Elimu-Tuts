import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      {/* Mission Section */}
      <section className={styles.mission}>
        <div className={styles.missionContent}>
          <h1>Our Mission</h1>
          <p>
            ElimuTuts is dedicated to providing quality education resources that align with the CBC curriculum,
            making learning accessible and engaging for all students in Kenya.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.story}>
        <div className={styles.storyContent}>
          <h2>Our Story</h2>
          <p>
            Founded by a team of passionate educators, ElimuTuts emerged from a vision to transform
            education in Kenya. We understand the challenges faced by students and teachers in adapting
            to the CBC curriculum, and we're here to support them every step of the way.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.values}>
        <h2>Our Values</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>🎯</div>
            <h3>Excellence</h3>
            <p>Committed to delivering the highest quality educational content</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>🤝</div>
            <h3>Collaboration</h3>
            <p>Working together with educators to create effective learning solutions</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>💡</div>
            <h3>Innovation</h3>
            <p>Embracing new technologies to enhance the learning experience</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>🌍</div>
            <h3>Accessibility</h3>
            <p>Making quality education available to all students</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.team}>
        <h2>Our Team</h2>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <div className={styles.memberImage}>👨‍🏫</div>
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberImage}>👩‍🏫</div>
            <h3>Jane Smith</h3>
            <p>Head of Content</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberImage}>👨‍💻</div>
            <h3>Mike Johnson</h3>
            <p>Technical Lead</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 