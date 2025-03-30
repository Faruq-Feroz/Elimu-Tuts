// src/components/dashboard/student/HelpSupport.jsx
import React, { useState } from 'react';
import styles from './HelpSupport.module.css';
import { FaBook, FaHeadset, FaQuestion, FaChevronDown, FaPhone, FaEnvelope, FaVideo, FaFileAlt, FaTools, FaGraduationCap } from 'react-icons/fa';

const HelpSupport = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: 'How do I schedule a tutoring session?',
      answer: 'You can schedule a tutoring session by navigating to the "Tutors" tab, selecting your preferred tutor, and clicking the "Schedule Session" button. You can then select an available time slot that works for you.'
    },
    {
      id: 2, 
      question: 'How can I track my academic progress?',
      answer: 'Your academic progress is available in the "Progress" section of your dashboard. Here you can view your grades, completed assignments, and performance metrics across all subjects.'
    },
    {
      id: 3,
      question: 'What happens if I miss a scheduled class?',
      answer: 'If you miss a scheduled class, you will receive a notification. Most classes are recorded and available for you to watch later in the "Recorded Sessions" section. However, we recommend attending all live sessions for the best learning experience.'
    },
    {
      id: 4,
      question: 'How do I submit assignments?',
      answer: 'Assignments can be submitted through the "Assignments" section. Click on the specific assignment, upload your work, and click "Submit". You can also check the status of previously submitted assignments here.'
    },
    {
      id: 5,
      question: 'Can I change my password or update my profile?',
      answer: 'Yes, you can change your password or update your profile information by clicking on your profile picture in the top right corner and selecting "Settings". From there, you can update your personal information, change your password, or modify your notification preferences.'
    }
  ];

  // Support resources data
  const supportResources = [
    {
      id: 1,
      icon: <FaGraduationCap />,
      title: 'Learning Resources',
      description: 'Access guides, tutorials, and educational materials',
      action: 'Browse Resources'
    },
    {
      id: 2,
      icon: <FaVideo />,
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides for common tasks',
      action: 'Watch Videos'
    },
    {
      id: 3,
      icon: <FaFileAlt />,
      title: 'Documentation',
      description: 'Read detailed documentation about platform features',
      action: 'Read Docs'
    },
    {
      id: 4,
      icon: <FaTools />,
      title: 'Troubleshooting',
      description: 'Common solutions to technical problems',
      action: 'View Solutions'
    }
  ];

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Your support request has been submitted. We will get back to you soon!');
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className={styles.helpContainer}>
      <div className={styles.helpHeader}>
        <h1 className={styles.helpTitle}>Help & Support</h1>
        <p className={styles.helpSubtitle}>
          Need assistance? We're here to help you with any questions or issues you may have.
        </p>
      </div>

      {/* Quick Help Options */}
      <div className={styles.quickHelp}>
        <div className={styles.helpCard}>
          <div className={styles.helpCardIcon}>
            <FaHeadset />
          </div>
          <h3 className={styles.helpCardTitle}>Chat with Support</h3>
          <p className={styles.helpCardDescription}>
            Connect with our support team for immediate assistance with any issues or questions.
          </p>
          <button className={styles.helpButton}>Start Chat</button>
        </div>

        <div className={styles.helpCard}>
          <div className={styles.helpCardIcon}>
            <FaQuestion />
          </div>
          <h3 className={styles.helpCardTitle}>FAQs</h3>
          <p className={styles.helpCardDescription}>
            Find answers to commonly asked questions about courses, assignments, and platform features.
          </p>
          <button className={`${styles.helpButton} ${styles.outlineButton}`}>View FAQs</button>
        </div>

        <div className={styles.helpCard}>
          <div className={styles.helpCardIcon}>
            <FaBook />
          </div>
          <h3 className={styles.helpCardTitle}>Tutorials</h3>
          <p className={styles.helpCardDescription}>
            Access step-by-step guides and video tutorials to help you navigate the learning platform.
          </p>
          <button className={`${styles.helpButton} ${styles.outlineButton}`}>Explore Tutorials</button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <div key={faq.id} className={styles.faqItem}>
              <div 
                className={styles.faqQuestion} 
                onClick={() => toggleAccordion(faq.id)}
              >
                <span>{faq.question}</span>
                <span className={`${styles.faqIcon} ${activeAccordion === faq.id ? styles.faqIconActive : ''}`}>
                  <FaChevronDown />
                </span>
              </div>
              <div className={`${styles.faqAnswer} ${activeAccordion === faq.id ? styles.faqAnswerActive : ''}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className={styles.contactSection}>
        <h2 className={styles.sectionTitle}>Contact Support</h2>
        <form className={styles.contactForm} onSubmit={handleFormSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleFormChange}
              className={styles.formInput} 
              placeholder="Enter your full name" 
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleFormChange}
              className={styles.formInput} 
              placeholder="Enter your email address" 
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="subject">Subject</label>
            <input 
              type="text" 
              id="subject" 
              name="subject" 
              value={formData.subject}
              onChange={handleFormChange}
              className={styles.formInput} 
              placeholder="What is this regarding?" 
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleFormChange}
              className={styles.formTextarea} 
              placeholder="Please describe your issue or question in detail" 
              required 
            />
          </div>
          <button type="submit" className={styles.submitButton}>Submit Request</button>
        </form>
      </div>

      {/* Support Resources */}
      <div className={styles.supportLinks}>
        <h2 className={styles.sectionTitle}>Additional Resources</h2>
        <div className={styles.linksList}>
          {supportResources.map(resource => (
            <div key={resource.id} className={styles.linkItem}>
              <div className={styles.linkIcon}>{resource.icon}</div>
              <div className={styles.linkContent}>
                <h3 className={styles.linkTitle}>{resource.title}</h3>
                <p className={styles.linkDescription}>{resource.description}</p>
              </div>
              <button className={styles.linkButton}>{resource.action}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;