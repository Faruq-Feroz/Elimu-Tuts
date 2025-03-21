import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ElimuTutsBanner.module.css';

const ElimuTutsBanner = () => {
  return (
    <div className={styles.bannerWrapper}>
      <Container fluid className={styles.banner}>
        <Row className={styles.bannerRow}>
          {/* Image column */}
          <Col md={6} className={styles.imageCol}>
            <div className={styles.teacherImageContainer}>
              <img 
                src="https://elimu-tuts-2024.vercel.app/img/banner-2.jpg" 
                alt="Teacher in classroom" 
                className={styles.teacherImage} 
              />
            </div>
          </Col>
          
          {/* Content column */}
          <Col md={6} className={styles.contentCol}>
            <h1 className={styles.title}>Become a Tutor at Elimu Tuts</h1>
            <p className={styles.description}>
              Join Elimu Tuts and empower learners by sharing your knowledge. We provide 
              the tools and support to help you teach what you love and make a positive 
              impact.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className={styles.actionButton}>
                Start Teaching Today
              </Button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ElimuTutsBanner;