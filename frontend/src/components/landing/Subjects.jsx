import React from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from './Subject.module.css';

const PopularSubjects = () => {
  const subjectsList = [
    { name: 'Mathematics', id: 'math' },
    { name: 'Sciences', id: 'sciences1' },
    { name: 'English', id: 'english' },
    { name: 'Kiswahili', id: 'kiswahili' },
    { name: 'Art & Craft', id: 'art' },
    { name: 'Religion', id: 'religion' },
    { name: 'Sciences', id: 'sciences2' },
    { name: 'Geography', id: 'geography' }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4
      }
    })
  };

  return (
    <Container className={styles.subjectsSection}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.sectionHeader}
      >
        <div className={styles.titleWrapper}>
          <span className={styles.subjectsLabel}>SUBJECTS</span>
        </div>
        <h2 className={styles.sectionTitle}>Popular Subjects to Explore</h2>
      </motion.div>

      <Row className={styles.subjectsRow}>
        {subjectsList.map((subject, index) => (
          <Col key={subject.id} lg={3} md={6} sm={12} className={styles.subjectColumn}>
            <motion.div
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className={styles.subjectCard}>
                <Card.Body className={styles.cardBody}>
                  <Card.Title className={styles.subjectTitle}>{subject.name}</Card.Title>
                  <a href={`#${subject.id}`} className={styles.viewLink}>View Subjects</a>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PopularSubjects;