// src/components/Messages.jsx
import React, { useState } from 'react';
import styles from './Messages.module.css';

// Sample data for messages
const SAMPLE_MESSAGES = {
  inbox: [
    {
      id: 'msg-001',
      title: 'Quiz Feedback',
      sender: 'Mr. James Wilson',
      senderRole: 'Math Tutor',
      avatar: 'JW',
      avatarType: 'teacher',
      preview: 'Great job on your recent quiz! I have some suggestions for areas where you could improve further.',
      time: '3 days ago',
      unread: true,
      content: `Dear Student,

I wanted to reach out and congratulate you on your excellent performance in the recent math quiz. You scored 85%, which shows a strong grasp of the fundamental concepts.

I was particularly impressed with your work on the algebraic expressions and equations. Your step-by-step approach demonstrates good mathematical thinking.

For the upcoming topics, I would suggest focusing a bit more on geometric applications and word problems, as these will be important for the next unit.

If you have any questions or need additional practice materials, please don't hesitate to ask.

Best regards,
Mr. James Wilson
Mathematics Department`
    },
    {
      id: 'msg-002',
      title: 'Study Group Invitation',
      sender: 'Sarah Wong',
      senderRole: 'Classmate',
      avatar: 'SW',
      avatarType: 'student',
      preview: 'Would you like to join our science study group? We meet every Tuesday and Thursday after school.',
      time: '1 week ago',
      unread: false,
      content: `Hi there!

A few of us are forming a study group for the upcoming science exams, and we thought you might be interested in joining us.

We'll be meeting every Tuesday and Thursday from 3:30 PM to 5:00 PM in the school library. We're planning to cover all the major topics from the curriculum and work through practice problems together.

Having more minds to tackle the difficult concepts would be really helpful. Please let me know if you'd like to join us!

Regards,
Sarah Wong`
    },
    {
      id: 'msg-003',
      title: 'Assignment Extension',
      sender: 'Mrs. Kamau',
      senderRole: 'English Tutor',
      avatar: 'MK',
      avatarType: 'teacher',
      preview: "I've approved your request for an extension on the essay. The new deadline is next Friday.",
      time: '2 weeks ago',
      unread: false,
      content: `Dear Student,

I'm writing to confirm that your request for an extension on the comparative literature essay has been approved.

The new submission deadline is next Friday, December 15th, by 11:59 PM. Please ensure that you submit your work by this time, as further extensions will not be possible due to end-of-term grading requirements.

If you need any clarification on the essay requirements or would like to discuss your approach, my office hours are on Mondays and Wednesdays from 2:00 PM to 4:00 PM.

Best regards,
Mrs. Kamau
English Department`
    },
    {
      id: 'msg-004',
      title: 'Science Project Feedback',
      sender: 'Dr. Omondi',
      senderRole: 'Science Tutor',
      avatar: 'DO',
      avatarType: 'teacher',
      preview: 'Your science project proposal looks promising. I have a few suggestions to enhance your experiment design.',
      time: '2 weeks ago',
      unread: true,
      content: `Dear Student,

Thank you for submitting your science project proposal on "The Effect of Different Light Wavelengths on Plant Growth". I've reviewed it and believe it has great potential.

Your research question is clear, and your hypothesis is well-formed. I particularly appreciated your background research on photosynthesis and light absorption in plants.

To strengthen your experiment design, I would suggest:
1. Including at least 5 plants in each test group to ensure statistical significance
2. Controlling variables like water amount, soil type, and temperature more precisely
3. Extending the observation period to at least 4 weeks for more conclusive results

Please revise your proposal with these suggestions in mind. I'm looking forward to seeing your final experiment!

Best regards,
Dr. Omondi
Science Department`
    }
  ],
  sent: [
    {
      id: 'sent-001',
      title: 'Help with Math Problem',
      recipient: 'Mr. James Wilson',
      recipientRole: 'Math Tutor',
      avatar: 'JW',
      avatarType: 'teacher',
      preview: "I'm having trouble with question 5 in the homework. Could you please provide some guidance?",
      time: '1 day ago',
      content: `Dear Mr. Wilson,

I hope this message finds you well. I'm writing to ask for your help with question 5 in our recent homework assignment on calculus.

The problem involves finding the derivative of a complex function, and I'm struggling to apply the chain rule correctly. I've attempted the solution several times but keep getting different answers from what's in the back of the textbook.

Could you please provide some guidance or perhaps walk me through the correct approach during our next class?

Thank you for your help.

Best regards,
[Your Name]`
    },
    {
      id: 'sent-002',
      title: 'Study Group Response',
      recipient: 'Sarah Wong',
      recipientRole: 'Classmate',
      avatar: 'SW',
      avatarType: 'student',
      preview: "Yes, I'd love to join the study group. The schedule works perfectly for me.",
      time: '5 days ago',
      content: `Hi Sarah,

Thanks for thinking of me! I'd definitely like to join the science study group.

The Tuesday and Thursday schedule works perfectly for me, and I think studying together will be really helpful, especially for the physics topics.

I have some practice problems from last year's exam that might be useful. Should I bring those along?

Looking forward to our first session!

Best,
[Your Name]`
    },
    {
      id: 'sent-003',
      title: 'Essay Extension Request',
      recipient: 'Mrs. Kamau',
      recipientRole: 'English Tutor',
      avatar: 'MK',
      avatarType: 'teacher',
      preview: 'I would like to request an extension for the comparative literature essay due to personal circumstances.',
      time: '2 weeks ago',
      content: `Dear Mrs. Kamau,

I am writing to request an extension for the comparative literature essay that is currently due this Friday.

Due to some unexpected family circumstances, I have not been able to dedicate as much time to this assignment as I had planned. I believe I need about one more week to complete the essay to a standard that reflects my true capabilities.

I understand that extensions are only granted in exceptional cases, and I appreciate your consideration of my request.

Thank you for your understanding.

Sincerely,
[Your Name]`
    }
  ],
  tutors: [
    {
      id: 'tutor-001',
      name: 'Mr. James Wilson',
      role: 'Mathematics Tutor',
      avatar: 'JW',
      avatarType: 'teacher',
      status: 'online',
      subjects: ['Algebra', 'Calculus', 'Geometry']
    },
    {
      id: 'tutor-002',
      name: 'Mrs. Kamau',
      role: 'English Tutor',
      avatar: 'MK',
      avatarType: 'teacher',
      status: 'offline',
      subjects: ['Literature', 'Grammar', 'Essay Writing']
    },
    {
      id: 'tutor-003',
      name: 'Dr. Omondi',
      role: 'Science Tutor',
      avatar: 'DO',
      avatarType: 'teacher',
      status: 'online',
      subjects: ['Biology', 'Chemistry', 'Physics']
    },
    {
      id: 'tutor-004',
      name: 'Ms. Njeri',
      role: 'History Tutor',
      avatar: 'SN',
      avatarType: 'teacher',
      status: 'offline',
      subjects: ['World History', 'African History', 'Historical Analysis']
    }
  ]
};

const MessagesComponent = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle tab selection
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedMessage(null);
  };
  
  // Handle message selection
  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
  };
  
  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  // Toggle compose message modal
  const toggleComposeModal = () => {
    setShowComposeModal(!showComposeModal);
  };
  
  // Filter messages based on search query
  const filterMessages = (messages) => {
    if (!searchQuery) return messages;
    
    return messages.filter(message => 
      message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (message.sender || message.recipient || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  // Get avatar class based on type
  const getAvatarClass = (type) => {
    switch(type) {
      case 'teacher':
        return styles.teacherAvatar;
      case 'student':
        return styles.studentAvatar;
      case 'admin':
        return styles.adminAvatar;
      default:
        return '';
    }
  };
  
  // Count unread messages
  const countUnread = () => {
    return SAMPLE_MESSAGES.inbox.filter(message => message.unread).length;
  };
  
  // Render inbox messages
  const renderInbox = () => {
    const messages = filterMessages(SAMPLE_MESSAGES.inbox);
    
    if (messages.length === 0) {
      return (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📪</div>
          <h3 className={styles.emptyTitle}>No messages</h3>
          <p className={styles.emptyText}>
            Your inbox is empty. Messages from tutors and classmates will appear here.
          </p>
        </div>
      );
    }
    
    return (
      <div className={styles.messagesList}>
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`${styles.messageItem} ${message.unread ? styles.messageUnread : ''}`}
            onClick={() => handleMessageSelect(message)}
          >
            <div className={`${styles.messageAvatar} ${getAvatarClass(message.avatarType)}`}>
              {message.avatar}
            </div>
            <div className={styles.messageContent}>
              <div className={styles.messageHeader}>
                <h4 className={styles.messageTitle}>{message.title}</h4>
                <span className={styles.messageTime}>{message.time}</span>
              </div>
              <div className={styles.messageSender}>From: {message.sender} ({message.senderRole})</div>
              <p className={styles.messagePreview}>{message.preview}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Render sent messages
  const renderSent = () => {
    const messages = filterMessages(SAMPLE_MESSAGES.sent);
    
    if (messages.length === 0) {
      return (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📤</div>
          <h3 className={styles.emptyTitle}>No sent messages</h3>
          <p className={styles.emptyText}>
            Messages you send will appear here. Start a conversation by clicking the "Compose" button.
          </p>
        </div>
      );
    }
    
    return (
      <div className={styles.messagesList}>
        {messages.map(message => (
          <div 
            key={message.id} 
            className={styles.messageItem}
            onClick={() => handleMessageSelect(message)}
          >
            <div className={`${styles.messageAvatar} ${getAvatarClass(message.avatarType)}`}>
              {message.avatar}
            </div>
            <div className={styles.messageContent}>
              <div className={styles.messageHeader}>
                <h4 className={styles.messageTitle}>{message.title}</h4>
                <span className={styles.messageTime}>{message.time}</span>
              </div>
              <div className={styles.messageSender}>To: {message.recipient} ({message.recipientRole})</div>
              <p className={styles.messagePreview}>{message.preview}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Render tutors list
  const renderTutors = () => {
    const tutors = SAMPLE_MESSAGES.tutors.filter(tutor => 
      !searchQuery || 
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    if (tutors.length === 0) {
      return (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>👨‍🏫</div>
          <h3 className={styles.emptyTitle}>No tutors found</h3>
          <p className={styles.emptyText}>
            Try adjusting your search criteria or check back later for new tutors.
          </p>
        </div>
      );
    }
    
    return (
      <div className={styles.tutorsList}>
        {tutors.map(tutor => (
          <div key={tutor.id} className={styles.tutorItem}>
            <div className={`${styles.messageAvatar} ${getAvatarClass(tutor.avatarType)}`}>
              {tutor.avatar}
            </div>
            <div className={styles.tutorInfo}>
              <h4 className={styles.tutorName}>{tutor.name}</h4>
              <div className={styles.tutorRole}>{tutor.role}</div>
              <div className={`${styles.tutorStatus} ${tutor.status === 'offline' ? styles.statusOffline : ''}`}>
                <span className={`${styles.statusDot} ${tutor.status === 'offline' ? styles.statusDotOffline : ''}`}></span>
                {tutor.status === 'online' ? 'Online' : 'Offline'}
              </div>
            </div>
            <button 
              className={styles.messageBtn}
              onClick={(e) => {
                e.stopPropagation();
                toggleComposeModal();
              }}
            >
              Message
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  // Render message detail view
  const renderMessageView = () => {
    return (
      <div className={styles.messageView}>
        <div className={styles.messageViewHeader}>
          <div>
            <h3 className={styles.viewTitle}>{selectedMessage.title}</h3>
            <div className={styles.senderInfo}>
              <div className={`${styles.messageAvatar} ${getAvatarClass(selectedMessage.avatarType)}`}>
                {selectedMessage.avatar}
              </div>
              <div className={styles.senderDetails}>
                <div>
                  {activeTab === 'inbox' ? (
                    <>From: <span className={styles.senderName}>{selectedMessage.sender}</span> ({selectedMessage.senderRole})</>
                  ) : (
                    <>To: <span className={styles.senderName}>{selectedMessage.recipient}</span> ({selectedMessage.recipientRole})</>
                  )}
                </div>
                <div>{selectedMessage.time}</div>
              </div>
            </div>
          </div>
          <button 
            className={styles.closeBtn}
            onClick={() => setSelectedMessage(null)}
          >
            ×
          </button>
        </div>
        <div className={styles.messageViewBody}>
          {selectedMessage.content.split('\n\n').map((paragraph, i) => (
            <p key={i}>
              {paragraph.split('\n').map((line, j) => (
                <React.Fragment key={j}>
                  {line}
                  {j !== paragraph.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          ))}
        </div>
        <div className={styles.messageViewFooter}>
          {activeTab === 'inbox' && (
            <button 
              className={styles.replyBtn}
              onClick={toggleComposeModal}
            >
              Reply
            </button>
          )}
          <button className={styles.deleteBtn}>
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  // Render compose message modal
  const renderComposeModal = () => {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Compose New Message</h3>
            <button 
              className={styles.closeBtn}
              onClick={toggleComposeModal}
            >
              ×
            </button>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="recipient">To:</label>
              <select className={styles.formSelect} id="recipient">
                <option value="">Select recipient</option>
                {SAMPLE_MESSAGES.tutors.map(tutor => (
                  <option key={tutor.id} value={tutor.id}>{tutor.name} ({tutor.role})</option>
                ))}
                <option value="other">Other (classmate, admin)</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="subject">Subject:</label>
              <input className={styles.formInput} type="text" id="subject" placeholder="Enter subject" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="message">Message:</label>
              <textarea 
                className={styles.formTextarea} 
                id="message" 
                placeholder="Type your message here..."
              ></textarea>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button 
              className={styles.cancelBtn}
              onClick={toggleComposeModal}
            >
              Cancel
            </button>
            <button className={styles.sendBtn}>
              Send Message
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className={styles.messagesContainer}>
      <div className={styles.messagesHeader}>
        <h1 className={styles.messagesTitle}>Messages</h1>
        <p className={styles.messagesSubtitle}>
          Communicate with your tutors, classmates, and administrators
        </p>
      </div>
      
      {selectedMessage ? (
        renderMessageView()
      ) : (
        <div className={styles.messagesCard}>
          <div className={styles.tabsContainer}>
            <button 
              className={`${styles.tab} ${activeTab === 'inbox' ? styles.tabActive : ''}`}
              onClick={() => handleTabChange('inbox')}
            >
              Inbox
              {countUnread() > 0 && <span className={styles.tabCount}>{countUnread()}</span>}
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'sent' ? styles.tabActive : ''}`}
              onClick={() => handleTabChange('sent')}
            >
              Sent
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'tutors' ? styles.tabActive : ''}`}
              onClick={() => handleTabChange('tutors')}
            >
              Tutors
            </button>
          </div>
          
          <div className={styles.messagesBody}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder={`Search ${activeTab === 'tutors' ? 'tutors' : 'messages'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {activeTab === 'inbox' && renderInbox()}
            {activeTab === 'sent' && renderSent()}
            {activeTab === 'tutors' && renderTutors()}
          </div>
          
          <div className={styles.composeFooter}>
            <button className={styles.composeBtn} onClick={toggleComposeModal}>
              Compose New Message
            </button>
          </div>
        </div>
      )}
      
      {showComposeModal && renderComposeModal()}
    </div>
  );
};

export default MessagesComponent;