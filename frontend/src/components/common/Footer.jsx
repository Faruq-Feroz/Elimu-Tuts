import { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
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
  FiHelpCircle,
  FiChevronUp,
  FiSend,
  FiUser,
  FiMessageSquare
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted:', contactForm);
    
    // Reset form and close modal
    setContactForm({ name: '', email: '', message: '' });
    setShowContactForm(false);
    
    // You would typically send this data to your backend
  };

  return (
    <footer className={styles.footer}>
      {/* Fixed Action Buttons Group - only mail and whatsapp */}
      <div className={styles.fixedButtonsGroup}>
        {/* Fixed Mail Button */}
        <motion.button
          className={styles.mailButton}
          onClick={() => setShowContactForm(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Contact us via email"
        >
          <FiMail />
        </motion.button>
        
        {/* Fixed WhatsApp Button */}
        <motion.a
          href="https://wa.me/254742186963"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Contact us via WhatsApp"
        >
          <FaWhatsapp />
        </motion.a>
      </div>
      
      {/* Contact Form Modal */}
      <Modal 
        show={showContactForm} 
        onHide={() => setShowContactForm(false)}
        centered
        className={styles.contactModal}
      >
        <Modal.Header closeButton className={styles.contactModalHeader}>
          <Modal.Title>Get In Touch</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.contactModalBody}>
          <Form onSubmit={handleContactSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                <FiUser className={styles.formIcon} /> Name
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={contactForm.name}
                onChange={handleContactFormChange}
                placeholder="Your name"
                required
                className={styles.contactInput}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>
                <FiMail className={styles.formIcon} /> Email
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleContactFormChange}
                placeholder="Your email address"
                required
                className={styles.contactInput}
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label>
                <FiMessageSquare className={styles.formIcon} /> Message
              </Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={contactForm.message}
                onChange={handleContactFormChange}
                placeholder="How can we help you?"
                required
                rows={4}
                className={styles.contactTextarea}
              />
            </Form.Group>
            
            <Button 
              type="submit" 
              className={styles.contactSubmitButton}
              variant="primary"
            >
              <FiSend className="me-2" /> Send Message
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      
      <div className={styles.footerPattern}></div>
      
      <Container>
        <Row className="gy-4">
          <Col lg={3} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
              className={styles.logoContainer}
            >
              <motion.div 
                className={styles.logoWrapper}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className={styles.title}>Elimu Tuts</h4>
              </motion.div>
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
                {!isSubmitted ? (
                  <>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.newsletterInput}
                      aria-label="Email for newsletter"
                      required
                    />
                    <Button 
                      type="submit" 
                      className={styles.newsletterButton} 
                      aria-label="Subscribe"
                    >
                      <FiArrowRight />
                    </Button>
                  </>
                ) : (
                  <div className={styles.submitSuccess}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      Thank you for subscribing!
                    </motion.div>
                  </div>
                )}
              </Form>
              <div className={styles.contactInfo}>
                <p><FiPhone className={styles.icon} /> +254 742 186 963</p>
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
              <p>&copy; {currentYear} Elimu Tuts. All rights reserved.</p>
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
        
        {/* Scroll to top button - placed at the bottom of the footer */}
        <div className={styles.scrollTopContainer}>
          <motion.button 
            className={styles.scrollTopButton}
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <FiChevronUp />
          </motion.button>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;