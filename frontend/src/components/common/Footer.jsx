import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { 
  FiFacebook, 
  FiInstagram, 
  FiTwitter, 
  FiLinkedin, 
  FiYoutube, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiArrowRight, 
  FiBook, 
  FiAward, 
  FiUsers, 
  FiHelpCircle 
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="gy-4">
          <Col lg={3} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <h4 className={styles.title}>Elimu Tuts</h4>
              <p className={styles.motto}>"Democratizing Education Across Kenya"</p>
              <div className={styles.social}>
                <a href="https://facebook.com/elimututs" aria-label="Facebook" className={styles.socialLink}><FiFacebook /></a>
                <a href="https://instagram.com/elimututs" aria-label="Instagram" className={styles.socialLink}><FiInstagram /></a>
                <a href="https://twitter.com/elimututs" aria-label="Twitter" className={styles.socialLink}><FiTwitter /></a>
                <a href="https://youtube.com/elimututs" aria-label="YouTube" className={styles.socialLink}><FiYoutube /></a>
                <a href="https://linkedin.com/company/elimututs" aria-label="LinkedIn" className={styles.socialLink}><FiLinkedin /></a>
              </div>
            </motion.div>
          </Col>

          <Col lg={3} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h5 className={styles.subtitle}>
                <FiBook className={styles.titleIcon} /> Learning Resources
              </h5>
              <ul className={styles.linksList}>
                <li><Link to="/courses/primary">Primary School Courses</Link></li>
                <li><Link to="/courses/secondary">Secondary School Resources</Link></li>
                <li><Link to="/courses/cbc">CBC Aligned Content</Link></li>
                <li><Link to="/resources/free">Free Learning Materials</Link></li>
                <li><Link to="/resources/premium">Premium Study Packs</Link></li>
                <li><Link to="/resources/practice-tests">Practice Tests & Quizzes</Link></li>
              </ul>
            </motion.div>
          </Col>

          <Col lg={3} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h5 className={styles.subtitle}>
                <FiAward className={styles.titleIcon} /> Quick Links
              </h5>
              <ul className={styles.linksList}>
                <li><Link to="/tutors/become-tutor">Become a Tutor</Link></li>
                <li><Link to="/pricing">Subscription Plans</Link></li>
                <li><Link to="/about/success-stories">Success Stories</Link></li>
                <li><Link to="/events/webinars">Upcoming Webinars</Link></li>
                <li><Link to="/blog">Educational Blog</Link></li>
                <li><Link to="/scholarship-programs">Scholarship Programs</Link></li>
              </ul>
            </motion.div>
          </Col>

          <Col lg={3} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h5 className={styles.subtitle}>
                <FiMail className={styles.titleIcon} /> Stay Connected
              </h5>
              <p className={styles.newsletterText}>Subscribe for updates on new courses, features, and educational tips</p>
              <Form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.newsletterInput}
                  aria-label="Email for newsletter"
                />
                <Button type="submit" className={styles.newsletterButton} aria-label="Subscribe">
                  <FiArrowRight />
                </Button>
              </Form>
              <div className={styles.contactInfo}>
                <p><FiPhone className={styles.icon} /> +254 710 123 456</p>
                <p><FiMail className={styles.icon} /> <a href="mailto:support@elimututs.co.ke" className={styles.emailLink}>support@elimututs.co.ke</a></p>
                <p><FiMapPin className={styles.icon} /> Westlands, Nairobi, Kenya</p>
              </div>
            </motion.div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h5 className={styles.subtitle}>
                <FiHelpCircle className={styles.titleIcon} /> Support
              </h5>
              <div className={styles.supportLinks}>
                <Link to="/help/faq" className={styles.supportLink}>FAQs</Link>
                <Link to="/help/contact" className={styles.supportLink}>Contact Us</Link>
                <Link to="/help/technical-support" className={styles.supportLink}>Technical Support</Link>
                <Link to="/help/tutorials" className={styles.supportLink}>Platform Tutorials</Link>
              </div>
            </motion.div>
          </Col>
          
          <Col md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h5 className={styles.subtitle}>
                <FiUsers className={styles.titleIcon} /> Community
              </h5>
              <div className={styles.supportLinks}>
                <Link to="/community/forums" className={styles.supportLink}>Discussion Forums</Link>
                <Link to="/community/events" className={styles.supportLink}>Community Events</Link>
                <Link to="/community/student-spotlight" className={styles.supportLink}>Student Spotlight</Link>
                <Link to="/community/tutor-network" className={styles.supportLink}>Tutor Network</Link>
              </div>
            </motion.div>
          </Col>
        </Row>

        <div className={styles.bottom}>
          <Row>
            <Col md={6} className="text-md-start text-center">
              <p>&copy; {new Date().getFullYear()} Elimu Tuts. All rights reserved.</p>
            </Col>
            <Col md={6} className="text-md-end text-center">
              <div className={styles.legalLinks}>
                <Link to="/legal/terms">Terms of Service</Link>
                <Link to="/legal/privacy">Privacy Policy</Link>
                <Link to="/legal/cookies">Cookie Policy</Link>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;