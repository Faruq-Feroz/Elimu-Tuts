import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './Learning.module.css';

const Learning = () => {
  return (
    <Container fluid className={styles.container}>
      <Row className={styles.contentRow}>
        <Col md={6} className={styles.textColumn}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heading}>
              Access Free Learning Materials
            </h1>
            
            <p className={styles.description}>
              Begin your educational journey with Elimu Tuts, where you can access a variety of 
              free resources designed to help you succeed in your studies, from CBC to 
              secondary level.
            </p>
            
            <Button className={styles.actionButton}>
              Start Learning Now
            </Button>
          </motion.div>
        </Col>
        
        <Col md={6} className={styles.imageColumn}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img 
              src="https://media.gettyimages.com/id/1049281412/photo/cute-schoolgirl-smiling-balancing-stack-of-books-on-the-head-at-library.jpg?s=612x612&w=0&k=20&c=4o6J8LM7uwGb23tvSkuQba4Y49QdHmdsaqp9p5SxzdI=" 
              alt="Happy student with books in library" 
              className={styles.heroImage}
            />
          </motion.div>
        </Col>
      </Row>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={styles.scrollButton}
      >
        
      </motion.div>
    </Container>
  );
};

export default Learning;