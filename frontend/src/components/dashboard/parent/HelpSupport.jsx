import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiMessageCircle, FiPhone, FiMail, FiExternalLink, FiSearch, FiAlertCircle } from 'react-icons/fi';
import styles from './HelpSupport.module.css';

const HelpSupport = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('general');
  const [activeFaqId, setActiveFaqId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    contactMethod: 'email'
  });

  // Categories for FAQs
  const categories = [
    { id: 'general', name: 'General' },
    { id: 'curriculum', name: 'Curriculum' },
    { id: 'payments', name: 'Payments' },
    { id: 'technical', name: 'Technical' },
    { id: 'tutors', name: 'Tutors & Classes' }
  ];

  // Mock FAQs with Kenyan educational context
  const faqs = [
    {
      id: 'faq1',
      category: 'general',
      question: 'What is the difference between CBC and 8-4-4 curriculum on Elimu-Tuts?',
      answer: 'Elimu-Tuts supports both the Competency-Based Curriculum (CBC) and the 8-4-4 system to accommodate Kenya\'s educational transition. CBC resources focus on practical skills and competencies, while 8-4-4 resources maintain the traditional subject-based approach. Parents can select their preferred curriculum in account settings, and our platform will customize learning resources accordingly. We provide clear indicators for each resource to show which curriculum it supports.'
    },
    {
      id: 'faq2',
      category: 'general',
      question: 'How often is content updated to match the latest curriculum changes?',
      answer: 'We update our content quarterly to ensure alignment with the Ministry of Education\'s curriculum guidelines. Additionally, we conduct immediate updates whenever major curriculum changes are announced by KICD (Kenya Institute of Curriculum Development). Each learning resource displays its last update date, and parents can subscribe to curriculum update notifications through their dashboard.'
    },
    {
      id: 'faq3',
      category: 'curriculum',
      question: 'How do I track my child\'s progress across different subjects?',
      answer: 'The Progress Reports section offers comprehensive insights into your child\'s academic journey. View performance by subject, track completion rates for assigned materials, and monitor assessment scores. The system highlights strengths and areas needing improvement, with color-coded indicators for quick reference. You can also compare performance against learning objectives and track progress over time with our visual graphs.'
    },
    {
      id: 'faq4',
      category: 'curriculum',
      question: 'Are the learning materials aligned with KCPE and KCSE examinations?',
      answer: 'Yes, our learning materials are carefully aligned with both KCPE (Kenya Certificate of Primary Education) and KCSE (Kenya Certificate of Secondary Education) examination requirements. We work with experienced Kenyan teachers and examiners to ensure content coverage and format familiarity. Special revision modules for candidates are available, including past papers with detailed solutions and examiner insights.'
    },
    {
      id: 'faq5',
      category: 'payments',
      question: 'What payment methods are accepted for subscriptions?',
      answer: 'We accept multiple payment methods to accommodate Kenyan families: M-Pesa (our primary payment method), credit/debit cards (Visa, Mastercard), bank transfers to our Equity and KCB accounts, and PayPal for international users. For M-Pesa payments, use Paybill Number 123456 with your account ID as the reference. Subscriptions can be monthly, termly, or yearly, with discounts for longer commitments.'
    },
    {
      id: 'faq6',
      category: 'payments',
      question: 'How do I obtain a receipt for school fee records?',
      answer: 'All payments automatically generate digital receipts that are sent to your registered email and available in your payment history. For official school records, you can download a stamped PDF receipt from the Payments section that includes our business number and tax details. If your school requires a specific format, contact our support team using the form in this section, and we will provide a customized receipt within 24 hours.'
    },
    {
      id: 'faq7',
      category: 'technical',
      question: 'What devices and internet requirements are needed to use Elimu-Tuts effectively?',
      answer: 'Elimu-Tuts is optimized for various devices: computers (Windows, Mac, Linux), tablets, and smartphones (Android 5.0+ and iOS 11+). We recommend a stable internet connection of at least 1 Mbps, though many resources can be downloaded for offline use. Our data-saving mode reduces bandwidth usage by up to 60%. For optimal experience on smartphones, download our free app from Google Play or App Store, which consumes less data than browser access.'
    },
    {
      id: 'faq8',
      category: 'technical',
      question: 'How can I resolve video streaming issues during live classes?',
      answer: 'If experiencing video issues, try: 1) Refresh your browser or restart the app, 2) Lower the video quality in settings (360p uses less data), 3) Connect to a more stable WiFi network if possible, 4) Close other applications using your internet connection, 5) Download class materials beforehand if your connection is unreliable. We also record all live sessions, which are available within 2 hours after class for students who face technical difficulties.'
    },
    {
      id: 'faq9',
      category: 'tutors',
      question: 'How are tutors vetted and what are their qualifications?',
      answer: 'All Elimu-Tuts tutors undergo a rigorous selection process. They must have: a minimum of a Bachelor\'s degree in education or their specialized subject, at least 3 years of teaching experience, TSC (Teachers Service Commission) registration where applicable, and clean background checks. Our tutors are interviewed, must pass subject proficiency tests, and conduct demonstration lessons. Many have experience with both CBC and 8-4-4 curricula. You can view detailed tutor profiles, including qualifications, teaching philosophy, and student ratings.'
    },
    {
      id: 'faq10',
      category: 'tutors',
      question: 'Can I request a specific tutor for my child?',
      answer: 'Yes, parents can request specific tutors based on subject specialization, teaching style, or previous experience with the tutor. Navigate to the Tutors section, view profiles, and use the "Request This Tutor" button. Your request will be processed within 48 hours, subject to tutor availability. If your preferred tutor is unavailable, we provide alternatives with similar qualifications and teaching approaches. Parents can also schedule a complimentary 15-minute meeting with potential tutors before committing.'
    }
  ];

  // Contact options
  const contactOptions = [
    {
      id: 'phone',
      title: 'Call Us',
      description: 'Speak directly with our support team',
      icon: <FiPhone />,
      contact: '+254 712 345 678',
      hours: 'Mon-Fri, 8am-5pm EAT',
      action: 'Call now'
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: <FiMail />,
      contact: 'support@elimu-tuts.co.ke',
      hours: 'Response within 24 hours',
      action: 'Email us'
    },
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Chat with our team in real-time',
      icon: <FiMessageCircle />,
      contact: 'Available on website',
      hours: 'Mon-Fri, 9am-4pm EAT',
      action: 'Start chat'
    }
  ];

  // Support resources
  const supportResources = [
    {
      id: 'resource1',
      title: 'Video Tutorials',
      description: 'Learn how to navigate the platform and use all features',
      link: '#'
    },
    {
      id: 'resource2',
      title: 'Parent\'s Guide to CBC',
      description: 'Understand the Competency-Based Curriculum and how to support your child',
      link: '#'
    },
    {
      id: 'resource3',
      title: 'Technical Troubleshooting',
      description: 'Common technical issues and their solutions',
      link: '#'
    }
  ];

  // Initialize data
  useEffect(() => {
    setLoading(true);
    try {
      // Simulating data fetch
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error loading support data:', err);
      setError('Failed to load help and support information. Please try again later.');
      setLoading(false);
    }
  }, []);

  // Toggle FAQ answer visibility
  const toggleFaq = (id) => {
    setActiveFaqId(id === activeFaqId ? null : id);
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveFaqId(null);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setActiveCategory(e.target.value ? 'all' : 'general');
  };

  // Handle contact form changes
  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  };

  // Handle contact form submission
  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Contact form submitted:', contactForm);
    
    // For demo purposes, just close the form and reset
    alert('Your message has been sent. We will respond within 24 hours.');
    setShowContactForm(false);
    setContactForm({
      subject: '',
      message: '',
      contactMethod: 'email'
    });
  };

  // Filter FAQs based on active category and search query
  const getFilteredFaqs = () => {
    return faqs.filter(faq => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchesSearch = searchQuery === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading help and support resources...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <FiAlertCircle size={48} />
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.helpContainer}>
      <div className={styles.helpHeader}>
        <h2>Help & Support</h2>
        <p>Find answers to your questions or reach out to our support team</p>
      </div>
      
      {/* Search */}
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button 
          className={styles.contactButton}
          onClick={() => setShowContactForm(true)}
        >
          Contact Support
        </button>
      </div>
      
      {/* Main content area with FAQs and contact options */}
      <div className={styles.helpContentContainer}>
        <div className={styles.faqSection}>
          <div className={styles.faqCategories}>
            {categories.map(category => (
              <button
                key={category.id}
                className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
            {searchQuery && (
              <button
                className={`${styles.categoryButton} ${activeCategory === 'all' ? styles.active : ''}`}
                onClick={() => handleCategoryChange('all')}
              >
                Search Results
              </button>
            )}
          </div>
          
          <div className={styles.faqList}>
            {getFilteredFaqs().length === 0 ? (
              <div className={styles.noResults}>
                <h3>No results found</h3>
                <p>Try adjusting your search or browse our categories</p>
              </div>
            ) : (
              getFilteredFaqs().map(faq => (
                <div 
                  key={faq.id} 
                  className={styles.faqItem}
                >
                  <button 
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={faq.id === activeFaqId}
                  >
                    <span>{faq.question}</span>
                    {faq.id === activeFaqId ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {faq.id === activeFaqId && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className={styles.contactSection}>
          <h3>Contact Options</h3>
          <div className={styles.contactOptions}>
            {contactOptions.map(option => (
              <div key={option.id} className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  {option.icon}
                </div>
                <h4>{option.title}</h4>
                <p>{option.description}</p>
                <div className={styles.contactDetail}>
                  <strong>{option.contact}</strong>
                  <span>{option.hours}</span>
                </div>
                <button 
                  className={styles.contactActionButton}
                  onClick={() => {
                    if (option.id === 'email' || option.id === 'chat') {
                      setShowContactForm(true);
                      setContactForm({
                        ...contactForm,
                        contactMethod: option.id
                      });
                    } else if (option.id === 'phone') {
                      window.location.href = `tel:${option.contact.replace(/\s+/g, '')}`;
                    }
                  }}
                >
                  {option.action}
                </button>
              </div>
            ))}
          </div>
          
          <h3>Additional Resources</h3>
          <div className={styles.resourceLinks}>
            {supportResources.map(resource => (
              <a 
                key={resource.id} 
                href={resource.link}
                className={styles.resourceLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{resource.title}</span>
                <p>{resource.description}</p>
                <FiExternalLink />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Contact Form Modal */}
      {showContactForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Contact Support</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setShowContactForm(false)}
              >
                &times;
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <form onSubmit={handleContactFormSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactFormChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactFormChange}
                    placeholder="Please describe your issue in detail..."
                    rows="6"
                    required
                  ></textarea>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Preferred Contact Method</label>
                  <div className={styles.radioGroup}>
                    <div className={styles.radioOption}>
                      <input
                        type="radio"
                        id="contact-email"
                        name="contactMethod"
                        value="email"
                        checked={contactForm.contactMethod === 'email'}
                        onChange={handleContactFormChange}
                      />
                      <label htmlFor="contact-email">Email</label>
                    </div>
                    
                    <div className={styles.radioOption}>
                      <input
                        type="radio"
                        id="contact-phone"
                        name="contactMethod"
                        value="phone"
                        checked={contactForm.contactMethod === 'phone'}
                        onChange={handleContactFormChange}
                      />
                      <label htmlFor="contact-phone">Phone Call</label>
                    </div>
                    
                    <div className={styles.radioOption}>
                      <input
                        type="radio"
                        id="contact-chat"
                        name="contactMethod"
                        value="chat"
                        checked={contactForm.contactMethod === 'chat'}
                        onChange={handleContactFormChange}
                      />
                      <label htmlFor="contact-chat">WhatsApp</label>
                    </div>
                  </div>
                </div>
                
                <div className={styles.formActions}>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={() => setShowContactForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSupport; 