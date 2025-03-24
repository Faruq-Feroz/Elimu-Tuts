import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './FAQ.module.css';

const FAQ = () => {
  // State to track which FAQ item is open
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle function to handle open/close
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // FAQ data
  const faqItems = [
    {
      question: "What is Elimu Tuts?",
      answer: "Elimu Tuts is a Kenyan e-learning platform designed to democratize education by providing accessible, high-quality, CBC-aligned educational content. Our mission is to bridge educational gaps across Kenya through technology, making quality education available to all students regardless of location or socioeconomic status."
    },
    {
      question: "What subjects does Elimu Tuts cover?",
      answer: "Elimu Tuts covers a wide range of subjects including Mathematics, English, Kiswahili, Science, Social Studies, ICT, and more. All content is properly aligned with the Competency-Based Curriculum (CBC)."
    },
    {
      question: "Who can use Elimu Tuts?",
      answer: "Elimu Tuts is designed for: Students (primary and secondary school learners seeking supplemental education), Tutors (professional educators looking to reach more students and monetize content), Parents (guardians wanting to monitor and support their children's educational journey), and Schools (educational institutions seeking digital resources to complement in-person teaching)."
    },
    {
      question: "How do teachers benefit from Elimu Tuts?",
      answer: "Teachers can generate income by offering paid courses, live tutoring, and premium educational content. The platform enables experienced educators to find tutoring jobs, build a reputation, and grow their student base through our revenue sharing model."
    },
    {
      question: "What payment methods are supported?",
      answer: "Elimu Tuts has integrated M-Pesa, Kenya's popular mobile payment system. We offer various payment options including monthly and annual subscription plans with different access levels, as well as pay-per-course options for specific content."
    },
    {
      question: "What makes Elimu Tuts unique?",
      answer: "Our platform offers CBC-aligned content developed by certified Kenyan educators, interactive multimedia learning with videos and quizzes, role-based dashboards tailored to students, tutors, and parents, real-time communication, progress tracking, M-Pesa integration, and mobile-responsive design optimized for various devices and network conditions."
    },
    {
      question: "Can content be accessed offline?",
      answer: "Yes, Elimu Tuts provides download capabilities for limited connectivity scenarios, making it possible to access educational materials even when internet access is limited."
    },
    {
      question: "How does Elimu Tuts personalize learning?",
      answer: "We offer personalized learning paths with recommendations based on individual performance, progress tracking across subjects and topics, and performance analytics to help identify strengths and areas needing improvement."
    }
  ];

  return (
    <Container className={styles.faqContainer}>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqItems.map((item, index) => (
              <motion.div 
                key={index} 
                className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className={styles.faqQuestion} 
                  onClick={() => toggleFAQ(index)}
                >
                  <h3>{item.question}</h3>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.faqIcon}
                  >
                    <FontAwesomeIcon 
                      icon={activeIndex === index ? faChevronUp : faChevronDown} 
                      className={styles.icon}
                    />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      className={styles.faqAnswer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FAQ;
