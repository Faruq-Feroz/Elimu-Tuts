import React, { useState } from 'react';
import { 
  FaSearch, 
  FaQuestionCircle, 
  FaBook, 
  FaHeadset, 
  FaBug, 
  FaChevronDown, 
  FaChevronUp, 
  FaEnvelope, 
  FaPhone, 
  FaComments,
  FaVideo,
  FaFileAlt,
  FaUserGraduate,
  FaCreditCard,
  FaLock
} from 'react-icons/fa';
import styles from './HelpSupport.module.css';

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // Handle FAQ expansion/collapse
  const toggleFaq = (faqId) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [faqId]: !prev[faqId]
    }));
  };

  // Handle support ticket submission
  const handleTicketSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your API
    console.log('Support ticket submitted:', { subject: ticketSubject, message: ticketMessage });
    setTicketSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setTicketSubject('');
      setTicketMessage('');
      setTicketSubmitted(false);
    }, 3000);
  };

  // FAQ data organized by categories
  const faqData = {
    account: [
      {
        id: 'account1',
        question: 'How do I update my profile information?',
        answer: 'Go to Settings > Profile and update your information. Click Save to apply the changes.'
      },
      {
        id: 'account2',
        question: 'How do I change my password?',
        answer: 'Go to Settings > Security and enter your current password, followed by your new password. Click Save Changes to update your password.'
      },
      {
        id: 'account3',
        question: 'How do I delete my account?',
        answer: 'Go to Settings > Account > Danger Zone. Click on "Delete Account" and follow the confirmation steps. Please note that this action is irreversible.'
      }
    ],
    courses: [
      {
        id: 'courses1',
        question: 'How do I create a new course?',
        answer: 'Go to My Courses and click on "Create New Course". Fill in all the required information and click "Create Course".'
      },
      {
        id: 'courses2',
        question: 'How do I add content to my course?',
        answer: 'Navigate to the course you want to add content to and click "Manage Content". From there, you can add lessons, quizzes, and resources.'
      },
      {
        id: 'courses3',
        question: 'How do I make my course available to students?',
        answer: 'After creating your course and adding content, go to My Courses, select your course, and change the status to "Published".'
      }
    ],
    students: [
      {
        id: 'students1',
        question: 'How can I see which students are enrolled in my courses?',
        answer: 'Go to My Courses, select a course, and click on "Students". This will show you a list of all enrolled students.'
      },
      {
        id: 'students2',
        question: 'How do I communicate with my students?',
        answer: 'You can use the Messages feature to send individual or group messages to your students.'
      },
      {
        id: 'students3',
        question: 'How do I track student progress?',
        answer: 'Each course has an Analytics section where you can view detailed reports on student progress, quiz scores, and completion rates.'
      }
    ],
    payments: [
      {
        id: 'payments1',
        question: 'How and when do I get paid?',
        answer: 'Payments are processed on the 1st and 15th of each month. You can view your earnings in the Earnings section of your dashboard.'
      },
      {
        id: 'payments2',
        question: 'How do I set up my payment method?',
        answer: 'Go to Settings > Billing and add your preferred payment method (bank account, M-Pesa, or other supported methods).'
      },
      {
        id: 'payments3',
        question: 'How are course fees calculated?',
        answer: 'You set the price for your courses. The platform takes a 15% commission fee, and the rest is paid to you according to the payment schedule.'
      }
    ],
    technical: [
      {
        id: 'technical1',
        question: 'What are the recommended video formats for uploads?',
        answer: 'We recommend using MP4 format with H.264 encoding for best compatibility. Maximum file size is 2GB per video.'
      },
      {
        id: 'technical2',
        question: 'How do I troubleshoot video playback issues?',
        answer: 'Ensure your videos are in MP4 format. If students report playback issues, check your internet connection and try uploading a lower resolution version.'
      },
      {
        id: 'technical3',
        question: 'What browsers are supported?',
        answer: 'Our platform works best with the latest versions of Chrome, Firefox, Safari, and Edge.'
      }
    ]
  };

  // Combined list of all FAQs for search functionality
  const allFaqs = Object.values(faqData).flat();

  // Filter FAQs based on search query
  const filteredFaqs = searchQuery 
    ? allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Documentation data
  const documentationData = [
    {
      id: 'doc1',
      title: 'Getting Started Guide',
      description: 'Learn the basics of setting up your tutor profile and creating your first course.',
      icon: <FaBook />,
      link: '/docs/getting-started'
    },
    {
      id: 'doc2',
      title: 'Course Creation Guide',
      description: 'Detailed instructions on creating engaging and effective courses.',
      icon: <FaFileAlt />,
      link: '/docs/course-creation'
    },
    {
      id: 'doc3',
      title: 'Video Production Tips',
      description: 'Best practices for recording high-quality educational videos.',
      icon: <FaVideo />,
      link: '/docs/video-tips'
    },
    {
      id: 'doc4',
      title: 'Student Engagement Guide',
      description: 'Strategies to keep your students engaged and improve completion rates.',
      icon: <FaUserGraduate />,
      link: '/docs/student-engagement'
    },
    {
      id: 'doc5',
      title: 'Payment & Earnings Guide',
      description: 'Understanding your earnings, payments, and tax information.',
      icon: <FaCreditCard />,
      link: '/docs/payments'
    },
    {
      id: 'doc6',
      title: 'Security Best Practices',
      description: 'How to keep your account secure and protect your content.',
      icon: <FaLock />,
      link: '/docs/security'
    }
  ];

  // Troubleshooting guides
  const troubleshootingData = [
    {
      id: 'trouble1',
      title: 'Video Upload Issues',
      description: 'Solutions for common problems when uploading course videos.',
      link: '/troubleshooting/video-upload'
    },
    {
      id: 'trouble2',
      title: 'Payment Problems',
      description: 'Resolve issues with payments and withdrawals.',
      link: '/troubleshooting/payments'
    },
    {
      id: 'trouble3',
      title: 'Student Access Issues',
      description: 'Help students who are having trouble accessing your courses.',
      link: '/troubleshooting/student-access'
    },
    {
      id: 'trouble4',
      title: 'Mobile App Troubleshooting',
      description: 'Fix common problems with the mobile application.',
      link: '/troubleshooting/mobile-app'
    }
  ];

  return (
    <div className={styles.helpContainer}>
      <h1 className={styles.helpTitle}>Help & Support</h1>
      
      {/* Search bar */}
      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search for help topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      
      {/* Display search results if there's a query */}
      {searchQuery && (
        <div className={styles.searchResults}>
          <h2>Search Results for "{searchQuery}"</h2>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map(faq => (
              <div key={faq.id} className={styles.faqItem}>
                <div 
                  className={styles.faqQuestion}
                  onClick={() => toggleFaq(faq.id)}
                >
                  <FaQuestionCircle className={styles.faqIcon} />
                  <h3>{faq.question}</h3>
                  {expandedFaqs[faq.id] ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {expandedFaqs[faq.id] && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className={styles.noResults}>No results found. Try a different search term or browse the categories below.</p>
          )}
        </div>
      )}
      
      {/* Tabs navigation */}
      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'faq' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          <FaQuestionCircle /> FAQs
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'docs' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('docs')}
        >
          <FaBook /> Documentation
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'contact' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          <FaHeadset /> Contact Support
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'troubleshooting' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('troubleshooting')}
        >
          <FaBug /> Troubleshooting
        </button>
      </div>
      
      {/* FAQs content */}
      {activeTab === 'faq' && !searchQuery && (
        <div className={styles.faqsContainer}>
          <h2>Frequently Asked Questions</h2>
          
          {/* FAQ Categories */}
          <div className={styles.faqCategories}>
            <div className={styles.faqCategory}>
              <h3>Account & Profile</h3>
              {faqData.account.map(faq => (
                <div key={faq.id} className={styles.faqItem}>
                  <div 
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <h4>{faq.question}</h4>
                    {expandedFaqs[faq.id] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  {expandedFaqs[faq.id] && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className={styles.faqCategory}>
              <h3>Courses & Content</h3>
              {faqData.courses.map(faq => (
                <div key={faq.id} className={styles.faqItem}>
                  <div 
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <h4>{faq.question}</h4>
                    {expandedFaqs[faq.id] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  {expandedFaqs[faq.id] && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className={styles.faqCategory}>
              <h3>Students & Communication</h3>
              {faqData.students.map(faq => (
                <div key={faq.id} className={styles.faqItem}>
                  <div 
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <h4>{faq.question}</h4>
                    {expandedFaqs[faq.id] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  {expandedFaqs[faq.id] && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className={styles.faqCategory}>
              <h3>Payments & Earnings</h3>
              {faqData.payments.map(faq => (
                <div key={faq.id} className={styles.faqItem}>
                  <div 
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <h4>{faq.question}</h4>
                    {expandedFaqs[faq.id] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  {expandedFaqs[faq.id] && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className={styles.faqCategory}>
              <h3>Technical Issues</h3>
              {faqData.technical.map(faq => (
                <div key={faq.id} className={styles.faqItem}>
                  <div 
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <h4>{faq.question}</h4>
                    {expandedFaqs[faq.id] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  {expandedFaqs[faq.id] && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Documentation content */}
      {activeTab === 'docs' && (
        <div className={styles.docsContainer}>
          <h2>Documentation & Guides</h2>
          <p className={styles.docsIntro}>
            Explore our comprehensive guides to get the most out of the platform.
          </p>
          
          <div className={styles.documentationGrid}>
            {documentationData.map(doc => (
              <a key={doc.id} href={doc.link} className={styles.docCard}>
                <div className={styles.docIcon}>{doc.icon}</div>
                <div className={styles.docContent}>
                  <h3>{doc.title}</h3>
                  <p>{doc.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      
      {/* Contact Support content */}
      {activeTab === 'contact' && (
        <div className={styles.contactContainer}>
          <h2>Contact Support</h2>
          
          <div className={styles.contactOptions}>
            <div className={styles.contactOption}>
              <FaEnvelope className={styles.contactIcon} />
              <h3>Email Support</h3>
              <p>Send us an email and we'll respond within 24 hours.</p>
              <a href="mailto:support@elimututs.com" className={styles.contactLink}>support@elimututs.com</a>
            </div>
            
            <div className={styles.contactOption}>
              <FaPhone className={styles.contactIcon} />
              <h3>Phone Support</h3>
              <p>Available Monday to Friday, 9am to 5pm EAT.</p>
              <a href="tel:+254712345678" className={styles.contactLink}>+254 712 345 678</a>
            </div>
            
            <div className={styles.contactOption}>
              <FaComments className={styles.contactIcon} />
              <h3>Live Chat</h3>
              <p>Chat with our support team in real-time.</p>
              <button className={styles.chatButton}>Start Chat</button>
            </div>
          </div>
          
          <div className={styles.supportTicket}>
            <h3>Create Support Ticket</h3>
            <p>Submit a ticket and our team will get back to you as soon as possible.</p>
            
            {ticketSubmitted ? (
              <div className={styles.ticketSuccess}>
                <FaQuestionCircle className={styles.successIcon} />
                <h4>Support Ticket Submitted!</h4>
                <p>We've received your request and will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className={styles.ticketForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="Briefly describe your issue"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    placeholder="Please provide details about your issue"
                    rows={6}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className={styles.submitButton}>Submit Ticket</button>
              </form>
            )}
          </div>
        </div>
      )}
      
      {/* Troubleshooting content */}
      {activeTab === 'troubleshooting' && (
        <div className={styles.troubleshootingContainer}>
          <h2>Troubleshooting Guides</h2>
          <p className={styles.troubleshootingIntro}>
            Find solutions to common problems you might encounter while using our platform.
          </p>
          
          <div className={styles.troubleshootingList}>
            {troubleshootingData.map(item => (
              <a key={item.id} href={item.link} className={styles.troubleshootingItem}>
                <div className={styles.troubleIcon}>
                  <FaBug />
                </div>
                <div className={styles.troubleContent}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </a>
            ))}
          </div>
          
          <div className={styles.systemStatus}>
            <h3>System Status</h3>
            <div className={styles.statusIndicator}>
              <div className={styles.statusDot}></div>
              <p>All systems operational</p>
            </div>
            <p className={styles.statusMessage}>
              Our platform is running normally. If you're experiencing issues, please contact support.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSupport;