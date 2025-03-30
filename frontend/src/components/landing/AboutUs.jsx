import React, { useRef } from 'react';
import styles from './About.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// The linter falsely reports motion as unused, but it's used through JSX elements like motion.div
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faLaptop, 
  faBook, 
  faUsers, 
  faClock, 
  faCertificate, 
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const featuresRef = useRef(null);
  
  const textInView = useInView(textRef, { once: false, threshold: 0.1 });
  const imageInView = useInView(imageRef, { once: false, threshold: 0.1 });
  const featuresInView = useInView(featuresRef, { once: false, threshold: 0.1 });
  
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
      x: -50 
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

  // Feature item variants with staggered delay
  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.3
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
      <section className={styles.heroSection}>
        <Container>
          <Row className={styles.heroRow}>
            <Col lg={6} className={styles.contentCol}>
              <motion.div
                ref={textRef}
                initial="hidden"
                animate={textInView ? 'visible' : 'hidden'}
                variants={containerVariants}
                className={styles.textContainer}
              >
                <motion.h1 
                  className={styles.mainHeading}
                  variants={itemVariants}
                >
                  Welcome to Elimu Tuts
                </motion.h1>
                
                <motion.p 
                  className={styles.paragraph}
                  variants={itemVariants}
                >
                  At Elimu Tuts, we are committed to providing Kenyan students with easy 
                  access to quality learning materials across all levels. Whether you're in CBC, 
                  junior secondary, or high school, our platform is designed to support your 
                  educational journey with resources that cater to your needs.
                </motion.p>
                
                <motion.p 
                  className={styles.paragraph}
                  variants={itemVariants}
                >
                  Our mission is to bridge the gap in education by offering interactive and 
                  engaging learning content, taught by professional and qualified Kenyan 
                  tutors. With Elimu Tuts, you have the tools to unlock your full potential and 
                  succeed in your studies, all while learning at your own pace.
                </motion.p>
                
                <motion.div 
                  className={styles.featuresList}
                  ref={featuresRef}
                  initial="hidden"
                  animate={featuresInView ? 'visible' : 'hidden'}
                  variants={containerVariants}
                >
                  {[
                    { icon: faGraduationCap, text: "Qualified Kenyan Tutors" },
                    { icon: faLaptop, text: "Interactive Learning Materials" },
                    { icon: faBook, text: "Resource Library for All Levels" },
                    { icon: faUsers, text: "Collaborative Learning" },
                    { icon: faClock, text: "Flexible Learning Paths" },
                    { icon: faCertificate, text: "Earn Certificates on Completion" }
                  ].map((feature, i) => (
                    <motion.div 
                      key={i}
                      className={styles.featureItem}
                      custom={i}
                      variants={featureVariants}
                    >
                      <FontAwesomeIcon icon={feature.icon} className={styles.featureIcon} />
                      <span>{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.div
                  variants={buttonVariants}
                  initial="hidden"
                  animate={textInView ? 'visible' : 'hidden'}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link to="/register" className={styles.buttonLink}>
                    <motion.button 
                      className={styles.knowMoreBtn}
                    >
                      Know More <FontAwesomeIcon icon={faArrowRight} />
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </Col>
            
            <Col lg={6} className={styles.imageCol}>
              <motion.div
                ref={imageRef}
                initial="hidden"
                animate={imageInView ? 'visible' : 'hidden'}
                variants={imageVariants}
                className={styles.imageWrapper}
              >
                <motion.img 
                  src="https://seattlemedium.com/wp-content/uploads/2020/12/distance-learning-748X486.jpg" 
                  alt="Students learning with Elimu Tuts" 
                  className={styles.heroImage}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </AnimatePresence>
  );
};

export default About;