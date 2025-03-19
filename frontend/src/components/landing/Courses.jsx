import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUsers, faClock, faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from './Courses.module.css';

const PopularCourses = () => {
  const courses = [
    {
      id: 'math7',
      title: 'Mathematics for Grade 7',
      image: '/api/placeholder/400/250',
      rating: 4.75,
      learners: '2.5K+ Learners',
      duration: '3.5 Hrs',
      price: 'Ksh 0'
    },
    {
      id: 'science8',
      title: 'Science for Grade 8',
      image: '/api/placeholder/400/250',
      rating: 4.75,
      learners: '3.8K+ Learners',
      duration: '4.0 Hrs',
      price: 'Ksh 0'
    },
    {
      id: 'art6',
      title: 'Art & Craft - Grade 6',
      image: '/api/placeholder/400/250',
      rating: 4.8,
      learners: '1200+ Students',
      duration: '3.0 Hrs',
      price: 'Ksh 0'
    },
    {
      id: 'history8',
      title: 'Kenyan History - Grade 8',
      image: '/api/placeholder/400/250',
      rating: 4.6,
      learners: '1000+ Students',
      duration: '4.0 Hrs',
      price: 'Ksh 0'
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };

  const courseVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Container className={styles.coursesSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleWrapper}>
          <span className={styles.coursesLabel}>POPULAR COURSES</span>
        </div>
        <h2 className={styles.sectionTitle}>Explore new and trending free online courses</h2>
      </div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className={styles.coursesContainer}
      >
        <Row className={styles.coursesRow}>
          {courses.map((course) => (
            <Col key={course.id} lg={3} md={6} sm={12} className={styles.courseColumn}>
              <motion.div variants={courseVariants}>
                <Card className={styles.courseCard}>
                  <div className={styles.imageContainer}>
                    <div className={styles.freeTag}>FREE</div>
                    <Card.Img variant="top" src={course.image} className={styles.courseImage} />
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
                    <div className={styles.courseFooter}>
                      <div className={styles.durationContainer}>
                        <FontAwesomeIcon icon={faClock} className={styles.clockIcon} />
                        <span className={styles.duration}>{course.duration}</span>
                      </div>
                      <div className={styles.priceContainer}>
                        <span className={styles.price}>{course.price}</span>
                      </div>
                      <Button className={styles.enrollButton}>
                        Enroll Now <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>

      <div className={styles.scrollButtonContainer}>
        <Button className={styles.scrollButton} aria-label="Scroll to top">
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
      </div>
    </Container>
  );
};

export default PopularCourses;