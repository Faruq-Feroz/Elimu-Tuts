import React, { useRef } from 'react';
// The linter falsely reports motion as unused, but it's used through JSX elements like motion.div
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faCertificate, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './FeatureCards.module.css';

const FeatureCards = () => {
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: false, threshold: 0.1 });
  const cardsInView = useInView(cardsRef, { once: false, threshold: 0.1 });
  
  // Header animations
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const headerChildVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.1, 0.41, 0.28, 1.01]
      }
    }
  };

  // Card container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };
  
  // Individual card variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.1)",
      transition: { 
        duration: 0.3
      }
    }
  };

  const cards = [
    {
      id: 1,
      icon: faGraduationCap,
      iconColor: '#5e35b1',
      title: 'Empower Your Education',
      text: 'Access CBC and secondary level materials to build a strong foundation, at your own pace',
      customIcon: false
    },
    {
      id: 2,
      title: 'Free Learning, Unlimited Potential',
      text: 'Access free courses and resources with flexible plans designed for every student.',
      customIcon: true,
      iconType: 'hand'
    },
    {
      id: 3,
      title: 'Learn at Your Own Pace',
      text: 'Study anytime, anywhere, and switch between subjects for a personalized experience',
      customIcon: true,
      iconType: 'brain'
    },
    {
      id: 4,
      icon: faCertificate,
      iconColor: '#1976d2',
      title: 'Earn Recognition for Achievements',
      text: 'Get a certificate for every course you complete and showcase your progress',
      customIcon: false
    }
  ];

  return (
    <AnimatePresence>
      <Container className={styles.featureSection}>
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={headerVariants}
          className={styles.sectionHeader}
        >
          <motion.h2 
            className={styles.sectionTitle}
            variants={headerChildVariants}
          >
            Why Choose Elimu Tuts?
          </motion.h2>
          <motion.p 
            className={styles.sectionDescription}
            variants={headerChildVariants}
          >
            Our platform offers comprehensive educational resources that cater to diverse learning needs,
            helping students excel in their academic journey with flexible, accessible content.
          </motion.p>
        </motion.div>

        <motion.div
          ref={cardsRef}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <Row className={styles.cardRow}>
            {cards.map((card, index) => (
              <Col key={card.id} lg={3} md={6} sm={12} className={styles.cardColumn}>
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Card className={styles.featureCard}>
                    <div className={styles.iconWrapper}>
                      {card.customIcon ? (
                        card.iconType === 'hand' ? (
                          <div className={styles.handIcon}>
                            <div className={styles.coin}></div>
                          </div>
                        ) : (
                          <div className={styles.brainIcon}></div>
                        )
                      ) : (
                        <FontAwesomeIcon 
                          icon={card.icon} 
                          className={styles.cardIcon} 
                          style={{ color: card.iconColor }} 
                        />
                      )}
                    </div>
                    <Card.Body>
                      <Card.Title className={styles.cardTitle}>{card.title}</Card.Title>
                      <Card.Text className={styles.cardText}>
                        {card.text}
                      </Card.Text>
                      <motion.div 
                        className={styles.cardLinkContainer}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <Link to="/register" className={styles.cardLink}>
                          Learn More <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
                        </Link>
                      </motion.div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </AnimatePresence>
  );
};

export default FeatureCards;