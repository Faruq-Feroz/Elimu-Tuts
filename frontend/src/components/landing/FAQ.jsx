import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown, 
  faChevronUp, 
  faSearch, 
  faQuestionCircle,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './FAQ.module.css';

const FAQ = () => {
  // FAQ data
  const faqItems = [
    {
      question: "What is Elimu Tuts?",
      answer: "Elimu Tuts is a Kenyan e-learning platform designed to democratize education by providing accessible, high-quality, CBC-aligned educational content. Our mission is to bridge educational gaps across Kenya through technology, making quality education available to all students regardless of location or socioeconomic status.",
      category: "General",
      icon: "🏫"
    },
    {
      question: "What subjects does Elimu Tuts cover?",
      answer: "Elimu Tuts covers a wide range of subjects including Mathematics, English, Kiswahili, Science, Social Studies, ICT, and more. All content is properly aligned with the Competency-Based Curriculum (CBC).",
      category: "Content",
      icon: "📚"
    },
    {
      question: "Who can use Elimu Tuts?",
      answer: "Elimu Tuts is designed for: Students (primary and secondary school learners seeking supplemental education), Tutors (professional educators looking to reach more students and monetize content), Parents (guardians wanting to monitor and support their children's educational journey), and Schools (educational institutions seeking digital resources to complement in-person teaching).",
      category: "Users",
      icon: "👥"
    },
    {
      question: "How do teachers benefit from Elimu Tuts?",
      answer: "Teachers can generate income by offering paid courses, live tutoring, and premium educational content. The platform enables experienced educators to find tutoring jobs, build a reputation, and grow their student base through our revenue sharing model.",
      category: "Teachers",
      icon: "👨‍🏫"
    },
    {
      question: "What payment methods are supported?",
      answer: "Elimu Tuts has integrated M-Pesa, Kenya's popular mobile payment system. We offer various payment options including monthly and annual subscription plans with different access levels, as well as pay-per-course options for specific content.",
      category: "Pricing",
      icon: "💳"
    },
    {
      question: "What makes Elimu Tuts unique?",
      answer: "Our platform offers CBC-aligned content developed by certified Kenyan educators, interactive multimedia learning with videos and quizzes, role-based dashboards tailored to students, tutors, and parents, real-time communication, progress tracking, M-Pesa integration, and mobile-responsive design optimized for various devices and network conditions.",
      category: "Features",
      icon: "✨"
    },
    {
      question: "Can content be accessed offline?",
      answer: "Yes, Elimu Tuts provides download capabilities for limited connectivity scenarios, making it possible to access educational materials even when internet access is limited.",
      category: "Features",
      icon: "📱"
    },
    {
      question: "How does Elimu Tuts personalize learning?",
      answer: "We offer personalized learning paths with recommendations based on individual performance, progress tracking across subjects and topics, and performance analytics to help identify strengths and areas needing improvement.",
      category: "Features",
      icon: "📊"
    }
  ];
  
  // State to track which FAQ item is open
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  
  const headerRef = useRef(null);
  const faqListRef = useRef(null);
  const contactRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: false, threshold: 0.1 });
  const faqListInView = useInView(faqListRef, { once: false, threshold: 0.1 });
  const contactInView = useInView(contactRef, { once: false, threshold: 0.1 });

  // Toggle function to handle open/close
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Function to handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle email submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Submitted email:', email);
    setEmail('');
    // Show a confirmation message
  };

  // Filtered FAQ items based on search
  const filteredFAQItems = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Container fluid className={styles.faqSection}>
      <Container className={styles.faqContainer}>
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={headerVariants}
          className={styles.faqHeader}
        >
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faQuestionCircle} className={styles.headerIcon} />
          </div>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <p className={styles.faqSubtitle}>Find answers to common questions about Elimu Tuts</p>
          
          <div className={styles.searchContainer}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
            />
          </div>
        </motion.div>

        <motion.div 
          ref={faqListRef}
          initial="hidden"
          animate={faqListInView ? "visible" : "hidden"}
          variants={containerVariants}
          className={styles.faqContent}
        >
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <div className={styles.faqList}>
                {filteredFAQItems.length > 0 ? (
                  filteredFAQItems.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div 
                        className={styles.faqQuestion} 
                        onClick={() => toggleFAQ(index)}
                      >
                        <div className={styles.questionContent}>
                          <span className={styles.categoryIcon}>{item.icon}</span>
                          <h3>{item.question}</h3>
                        </div>
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
                            animate={{ 
                              height: "auto", 
                              opacity: 1,
                              transition: {
                                height: { duration: 0.3 },
                                opacity: { duration: 0.3, delay: 0.1 }
                              }
                            }}
                            exit={{ 
                              height: 0, 
                              opacity: 0,
                              transition: {
                                height: { duration: 0.3 },
                                opacity: { duration: 0.1 }
                              }
                            }}
                          >
                            <div className={styles.answerContent}>
                              <p>{item.answer}</p>
                              <div className={styles.categoryTag}>{item.category}</div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                ) : (
                  <div className={styles.noResults}>
                    <p>No matching questions found. Try a different search term or ask us directly!</p>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </motion.div>
        
        <motion.div
          ref={contactRef}
          initial="hidden"
          animate={contactInView ? "visible" : "hidden"}
          variants={itemVariants}
          className={styles.contactSection}
        >
          <div className={styles.contactCard}>
            <h3>Still have questions?</h3>
            <p>If you couldn't find the answer to your question, feel free to reach out to us directly.</p>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  required
                  className={styles.emailInput}
                />
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.submitButton}
                >
                  <FontAwesomeIcon icon={faPaperPlane} className={styles.submitIcon} />
                  <span>Ask Us</span>
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </Container>
    </Container>
  );
};

export default FAQ;