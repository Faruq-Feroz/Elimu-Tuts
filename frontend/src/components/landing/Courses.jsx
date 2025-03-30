import React, { useRef } from 'react';
// The linter falsely reports motion as unused, but it's used through JSX elements like motion.div
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUsers, faClock, faArrowRight, faBookOpen, faLaptop, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Courses.module.css';

const PopularCourses = () => {
  const headerRef = useRef(null);
  const coursesRef = useRef(null);
  const buttonRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: false, threshold: 0.1 });
  const coursesInView = useInView(coursesRef, { once: false, threshold: 0.1 });
  const buttonInView = useInView(buttonRef, { once: false, threshold: 0.1 });

  const courses = [
    {
      id: 'math7',
      title: 'Mathematics for Grade 7',
      image: 'https://img.freepik.com/free-vector/hand-drawn-mathematics-background_23-2148158461.jpg',
      rating: 4.75,
      learners: '2.5K+ Learners',
      duration: '3.5 Hrs',
      price: 'Ksh 0',
      color: '#FF5252'
    },
    {
      id: 'science8',
      title: 'Science for Grade 8',
      image: 'https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148499325.jpg',
      rating: 4.75,
      learners: '3.8K+ Learners',
      duration: '4.0 Hrs',
      price: 'Ksh 0',
      color: '#2196F3'
    },
    {
      id: 'art6',
      title: 'Art & Craft - Grade 6',
      image: 'https://img.freepik.com/free-photo/top-view-colorful-paints-with-copy-space_23-2148860852.jpg',
      rating: 4.8,
      learners: '1200+ Students',
      duration: '3.0 Hrs',
      price: 'Ksh 0',
      color: '#9C27B0'
    },
    {
      id: 'history8',
      title: 'Kenyan History - Grade 8',
      image: 'https://img.freepik.com/free-vector/africa-outline-map-country-silhouette-black-illustration_53562-8215.jpg',
      rating: 4.6,
      learners: '1000+ Students',
      duration: '4.0 Hrs',
      price: 'Ksh 0',
      color: '#FF9800'
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
      y: -10,
      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.15)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  // Button variants
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 8px 15px rgba(255, 87, 34, 0.3)",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <AnimatePresence>
      <Container className={styles.coursesSection}>
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={headerVariants}
          className={styles.sectionHeader}
        >
          <div className={styles.titleWrapper}>
            <span className={styles.coursesLabel}>POPULAR COURSES</span>
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
            Explore new and trending free online courses
          </motion.h2>
          
          <motion.div className={styles.filterContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.filterPill}>
              <FontAwesomeIcon icon={faFilter} className={styles.filterIcon} />
              <span>All</span>
            </div>
            <div className={styles.filterPill}>
              <FontAwesomeIcon icon={faBookOpen} className={styles.filterIcon} />
              <span>CBC-Aligned</span>
            </div>
            <div className={styles.filterPill}>
              <FontAwesomeIcon icon={faLaptop} className={styles.filterIcon} />
              <span>Interactive</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          ref={coursesRef}
          initial="hidden"
          animate={coursesInView ? "visible" : "hidden"}
          variants={containerVariants}
          className={styles.coursesContainer}
        >
          <Row className={styles.coursesRow}>
            {courses.map((course, index) => (
              <Col key={course.id} lg={3} md={6} sm={12} className={styles.courseColumn}>
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Card className={styles.courseCard}>
                    <div className={styles.imageContainer}>
                      <div className={styles.freeTag} style={{ backgroundColor: course.color }}>FREE</div>
                      <Card.Img variant="top" src={course.image} className={styles.courseImage} />
                      <div className={styles.imageOverlay}></div>
                    </div>
                    <Card.Body className={styles.cardBody}>
                      <Card.Title className={styles.courseTitle}>{course.title}</Card.Title>
                      <div className={styles.courseDetails}>
                        <div className={styles.ratingContainer}>
                          <FontAwesomeIcon icon={faStar} className={styles.starIcon} />
                          <span className={styles.rating}>{course.rating}</span>
                        </div>
                        <div className={styles.learnersContainer}>
                          <FontAwesomeIcon icon={faUsers} className={styles.usersIcon} />
                          <span className={styles.learners}>{course.learners}</span>
                        </div>
                      </div>
                      <div className={styles.courseFooter} style={{ borderTopColor: `${course.color}20` }}>
                        <div className={styles.durationContainer}>
                          <FontAwesomeIcon icon={faClock} className={styles.clockIcon} />
                          <span className={styles.duration}>{course.duration}</span>
                        </div>
                        <div className={styles.priceContainer}>
                          <span className={styles.price}>{course.price}</span>
                        </div>
                        <Link to="/register" className={styles.buttonLink}>
                          <Button 
                            className={styles.enrollButton}
                            style={{ color: course.color }}
                          >
                            Enroll Now <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
                          </Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        <motion.div 
          ref={buttonRef}
          className={styles.viewMoreContainer}
          initial="hidden"
          animate={buttonInView ? "visible" : "hidden"}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Link to="/register" className={styles.viewMoreLink}>
            <Button className={styles.viewMoreButton}>
              View More Courses <FontAwesomeIcon icon={faArrowRight} className={styles.viewMoreArrow} />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </AnimatePresence>
  );
};

export default PopularCourses;