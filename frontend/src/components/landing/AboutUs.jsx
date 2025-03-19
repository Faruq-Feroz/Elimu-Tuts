import React from 'react';
import styles from './About.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
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
  return (
    <section className={styles.heroSection}>
      <Container>
        <Row className={styles.heroRow}>
          <Col lg={6} className={styles.contentCol}>
            <h1 className={styles.mainHeading}>Welcome to Elimu Tuts</h1>
            
            <p className={styles.paragraph}>
              At Elimu Tuts, we are committed to providing Kenyan students with easy 
              access to quality learning materials across all levels. Whether you're in CBC, 
              junior secondary, or high school, our platform is designed to support your 
              educational journey with resources that cater to your needs.
            </p>
            
            <p className={styles.paragraph}>
              Our mission is to bridge the gap in education by offering interactive and 
              engaging learning content, taught by professional and qualified Kenyan 
              tutors. With Elimu Tuts, you have the tools to unlock your full potential and 
              succeed in your studies, all while learning at your own pace.
            </p>
            
            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <FontAwesomeIcon icon={faGraduationCap} className={styles.featureIcon} />
                <span>Qualified Kenyan Tutors</span>
              </div>
              
              <div className={styles.featureItem}>
                <FontAwesomeIcon icon={faLaptop} className={styles.featureIcon} />
                <span>Interactive Learning Materials</span>
              </div>
              
              <div className={styles.featureItem}>
                <FontAwesomeIcon icon={faBook} className={styles.featureIcon} />
                <span>Resource Library for All Levels</span>
              </div>
              
              <div className={styles.featureItem}>
                <FontAwesomeIcon icon={faUsers} className={styles.featureIcon} />
                <span>Collaborative Learning</span>
              </div>
              
              <div className={styles.featureItem}>
                <FontAwesomeIcon icon={faClock} className={styles.featureIcon} />
                <span>Flexible Learning Paths</span>
              </div>
              
              <div className={styles.featureItem}>
                <FontAwesomeIcon icon={faCertificate} className={styles.featureIcon} />
                <span>Earn Certificates on Completion</span>
              </div>
            </div>
            
            <Button className={styles.knowMoreBtn}>
              Know More <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </Col>
          
          <Col lg={6} className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <img 
                src="https://seattlemedium.com/wp-content/uploads/2020/12/distance-learning-748X486.jpg" 
                alt="Students learning with Elimu Tuts" 
                className={styles.heroImage}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;