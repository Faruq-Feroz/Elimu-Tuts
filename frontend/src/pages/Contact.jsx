import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.contact}>
      <div className={styles.contactHeader}>
        <h1>Contact Us</h1>
        <p>Have questions? We'd love to hear from you.</p>
      </div>

      <div className={styles.contactContainer}>
        {/* Contact Information */}
        <div className={styles.contactInfo}>
          <h2>Get in Touch</h2>
          <div className={styles.infoItem}>
            <div className={styles.icon}>📍</div>
            <div className={styles.info}>
              <h3>Address</h3>
              <p>123 Education Street</p>
              <p>Nairobi, Kenya</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.icon}>📧</div>
            <div className={styles.info}>
              <h3>Email</h3>
              <p>info@elimituts.com</p>
              <p>support@elimituts.com</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.icon}>📱</div>
            <div className={styles.info}>
              <h3>Phone</h3>
              <p>+254 123 456 789</p>
              <p>+254 987 654 321</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={styles.contactForm}>
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 