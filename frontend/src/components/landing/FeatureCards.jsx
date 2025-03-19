import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from './FeatureCards.module.css';

const FeatureCards = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    })
  };

  return (
    <Container className={styles.featureSection}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={styles.sectionHeader}
      >
        <h2 className={styles.sectionTitle}>Why Choose Elimu Tuts?</h2>
        <p className={styles.sectionDescription}>
          Our platform offers comprehensive educational resources that cater to diverse learning needs,
          helping students excel in their academic journey with flexible, accessible content.
        </p>
      </motion.div>

      <Row className={styles.cardRow}>
        {/* Card 1 */}
        <Col lg={3} md={6} sm={12} className={styles.cardColumn}>
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={faGraduationCap} className={styles.cardIcon} style={{ color: '#5e35b1' }} />
              </div>
              <Card.Body>
                <Card.Title className={styles.cardTitle}>Empower Your Education</Card.Title>
                <Card.Text className={styles.cardText}>
                  Access CBC and secondary level materials to build a strong foundation, at your own pace
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* Card 2 */}
        <Col lg={3} md={6} sm={12} className={styles.cardColumn}>
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <div className={styles.handIcon}>
                  <div className={styles.coin}></div>
                </div>
              </div>
              <Card.Body>
                <Card.Title className={styles.cardTitle}>Free Learning, Unlimited Potential</Card.Title>
                <Card.Text className={styles.cardText}>
                  Access free courses and resources with flexible plans designed for every student.
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* Card 3 */}
        <Col lg={3} md={6} sm={12} className={styles.cardColumn}>
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <div className={styles.brainIcon}></div>
              </div>
              <Card.Body>
                <Card.Title className={styles.cardTitle}>Learn at Your Own Pace</Card.Title>
                <Card.Text className={styles.cardText}>
                  Study anytime, anywhere, and switch between subjects for a personalized experience
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* Card 4 */}
        <Col lg={3} md={6} sm={12} className={styles.cardColumn}>
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={faCertificate} className={styles.cardIcon} style={{ color: '#1976d2' }} />
              </div>
              <Card.Body>
                <Card.Title className={styles.cardTitle}>Earn Recognition for Achievements</Card.Title>
                <Card.Text className={styles.cardText}>
                  Get a certificate for every course you complete and showcase your progress
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={styles.scrollButtonWrapper}
      >

      </motion.div>
    </Container>
  );
};

export default FeatureCards;