import React, { useRef } from 'react';
// The linter falsely reports motion as unused, but it's used through JSX elements like motion.div
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalculator, 
  faFlask, 
  faBook, 
  faGlobe, 
  faPaintBrush, 
  faPray, 
  faMicroscope, 
  faMapMarked 
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './Subject.module.css';

const PopularSubjects = () => {
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: false, threshold: 0.1 });
  const cardsInView = useInView(cardsRef, { once: false, threshold: 0.1 });

  const subjectsList = [
    { 
      name: 'Mathematics', 
      id: 'math', 
      icon: faCalculator,
      color: '#FF5252', // Red
      bgColor: 'rgba(255, 82, 82, 0.1)',
      description: 'Algebra, Geometry, Calculus and more'
    },
    { 
      name: 'Sciences', 
      id: 'sciences1', 
      icon: faFlask,
      color: '#2196F3', // Blue
      bgColor: 'rgba(33, 150, 243, 0.1)',
      description: 'Physics, Chemistry and Biology'
    },
    { 
      name: 'English', 
      id: 'english', 
      icon: faBook,
      color: '#4CAF50', // Green
      bgColor: 'rgba(76, 175, 80, 0.1)',
      description: 'Grammar, Literature and Composition'
    },
    { 
      name: 'Kiswahili', 
      id: 'kiswahili', 
      icon: faGlobe,
      color: '#FF9800', // Orange
      bgColor: 'rgba(255, 152, 0, 0.1)',
      description: 'Sarufi, Fasihi na Insha'
    },
    { 
      name: 'Art & Craft', 
      id: 'art', 
      icon: faPaintBrush,
      color: '#9C27B0', // Purple
      bgColor: 'rgba(156, 39, 176, 0.1)',
      description: 'Drawing, Sculpture and Design'
    },
    { 
      name: 'Religion', 
      id: 'religion', 
      icon: faPray,
      color: '#009688', // Teal
      bgColor: 'rgba(0, 150, 136, 0.1)',
      description: 'CRE, IRE and Social Ethics'
    },
    { 
      name: 'Physical Sciences', 
      id: 'sciences2', 
      icon: faMicroscope,
      color: '#F44336', // Red
      bgColor: 'rgba(244, 67, 54, 0.1)',
      description: 'Physics and Chemistry'
    },
    { 
      name: 'Geography', 
      id: 'geography', 
      icon: faMapMarked,
      color: '#3F51B5', // Indigo
      bgColor: 'rgba(63, 81, 181, 0.1)',
      description: 'Maps, Climate and Landforms'
    }
  ];

  // Header animations
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Card variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: i => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: i * 0.1,
        duration: 0.5
      }
    }),
    hover: {
      y: -15,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  // Icon animation variants
  const iconVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1
      }
    },
    hover: { 
      scale: 1.2,
      rotate: 5,
      transition: { type: "spring", stiffness: 500 }
    }
  };

  return (
    <AnimatePresence>
      <Container className={styles.subjectsSection}>
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={headerVariants}
          className={styles.sectionHeader}
        >
          <div className={styles.titleWrapper}>
            <span className={styles.subjectsLabel}>SUBJECTS</span>
          </div>
          <motion.h2 
            className={styles.sectionTitle}
            animate={{ 
              textShadow: [
                "0 0 5px rgba(255, 87, 34, 0)",
                "0 0 15px rgba(255, 87, 34, 0.3)",
                "0 0 5px rgba(255, 87, 34, 0)"
              ],
              transition: { 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            Popular Subjects to Explore
          </motion.h2>
        </motion.div>

        <motion.div
          ref={cardsRef}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <Row className={styles.subjectsRow}>
            {subjectsList.map((subject, index) => (
              <Col key={subject.id} lg={3} md={6} sm={12} className={styles.subjectColumn}>
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link to="/register" className={styles.subjectLink}>
                    <Card 
                      className={styles.subjectCard}
                      style={{ 
                        borderColor: subject.color,
                        background: `linear-gradient(135deg, ${subject.bgColor} 0%, white 100%)`
                      }}
                    >
                      <Card.Body className={styles.cardBody}>
                        <div className={styles.iconContainer} style={{ backgroundColor: subject.color }}>
                          <motion.div variants={iconVariants}>
                            <FontAwesomeIcon 
                              icon={subject.icon} 
                              className={styles.subjectIcon} 
                            />
                          </motion.div>
                        </div>
                        <Card.Title className={styles.subjectTitle} style={{ color: subject.color }}>
                          {subject.name}
                        </Card.Title>
                        <p className={styles.subjectDescription}>{subject.description}</p>
                        <span className={styles.viewLink}>Explore Subject</span>
                      </Card.Body>
                    </Card>
                  </Link>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </AnimatePresence>
  );
};

export default PopularSubjects;