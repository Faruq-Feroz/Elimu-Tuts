import React, { useRef } from 'react';
// The linter falsely reports motion as unused, but it's used through JSX elements like motion.div
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, AnimatePresence, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Learning.module.css';

const Learning = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  
  const textInView = useInView(textRef, { once: false, threshold: 0.1 });
  const imageInView = useInView(imageRef, { once: false, threshold: 0.1 });
  
  // Parent container variants for text section with staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  // Child variants for individual elements
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.1, 0.41, 0.28, 1.01] // custom easing function
      }
    }
  };

  // Animation variants for image section
  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      x: 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        delay: 0.1
      }
    }
  };

  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
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
      <Container fluid className={styles.container}>
        <Row className={styles.contentRow}>
          <Col md={6} className={styles.textColumn}>
            <motion.div
              ref={textRef}
              initial="hidden"
              animate={textInView ? 'visible' : 'hidden'}
              variants={containerVariants}
              className={styles.textContainer}
            >
              <motion.h1 
                className={styles.heading}
                variants={itemVariants}
              >
                Access Free Learning Materials
              </motion.h1>
              
              <motion.p 
                className={styles.description}
                variants={itemVariants}
              >
                Begin your educational journey with Elimu Tuts, where you can access a variety of 
                free resources designed to help you succeed in your studies, from CBC to 
                secondary level.
              </motion.p>
              
              <motion.div
                variants={itemVariants}
              >
                <Link to="/register" className={styles.buttonLink}>
                  <motion.button 
                    className={styles.actionButton}
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    Start Learning Now <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </Col>
          
          <Col md={6} className={styles.imageColumn}>
            <motion.div
              ref={imageRef}
              initial="hidden"
              animate={imageInView ? 'visible' : 'hidden'}
              variants={imageVariants}
              className={styles.imageWrapper}
            >
              <motion.img 
                src="https://media.gettyimages.com/id/1049281412/photo/cute-schoolgirl-smiling-balancing-stack-of-books-on-the-head-at-library.jpg?s=612x612&w=0&k=20&c=4o6J8LM7uwGb23tvSkuQba4Y49QdHmdsaqp9p5SxzdI=" 
                alt="Happy student with books in library" 
                className={styles.heroImage}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </AnimatePresence>
  );
};

export default Learning;