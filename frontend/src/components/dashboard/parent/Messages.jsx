import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Messages.module.css';
import { 
  FiMessageSquare, 
  FiUser, 
  FiSend, 
  FiPaperclip,
  FiMoreVertical,
  FiSearch,
  FiChevronDown,
  FiPlus,
  FiCheck,
  FiInfo,
  FiAlertCircle,
  FiX
} from 'react-icons/fi';

const Messages = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const contactIdFromUrl = searchParams.get('contact');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [newMessageData, setNewMessageData] = useState({
    recipient: '',
    subject: ''
  });
  
  const messagesEndRef = useRef(null);
  
  // Mock conversation data with Kenyan names
  const mockConversations = [
    {
      id: '1',
      with: {
        id: 'tutor1',
        name: 'Mr. David Omondi',
        avatar: 'https://ui-avatars.com/api/?name=David+Omondi&background=39559c&color=fff',
        role: 'Mathematics Tutor',
        status: 'online'
      },
      subject: 'Mathematics Progress Update',
      unread: 2,
      lastActive: '2023-04-10T14:30:00',
      messages: [
        {
          id: 'm1',
          sender: 'tutor1',
          text: 'Habari Mzazi, I wanted to provide an update on Wanjiku\'s progress in Mathematics. She has shown significant improvement in algebra concepts over the past two weeks.',
          timestamp: '2023-04-09T10:15:00',
          read: true
        },
        {
          id: 'm2',
          sender: 'parent',
          text: 'Thank you for the update, Mr. Omondi. We\'ve been practicing equations at home as you suggested.',
          timestamp: '2023-04-09T15:45:00',
          read: true
        },
        {
          id: 'm3',
          sender: 'tutor1',
          text: 'That\'s excellent! I\'ve prepared some additional practice problems that focus on quadratic equations. I think Wanjiku is ready for more challenging work.',
          timestamp: '2023-04-10T09:30:00',
          read: false
        },
        {
          id: 'm4',
          sender: 'tutor1',
          text: 'Also, we have a virtual mathematics competition coming up next month. I believe Wanjiku would do well if she participates. Would you like more information?',
          timestamp: '2023-04-10T14:30:00',
          read: false
        }
      ]
    },
    {
      id: '2',
      with: {
        id: 'tutor2',
        name: 'Ms. Akinyi Wekesa',
        avatar: 'https://ui-avatars.com/api/?name=Akinyi+Wekesa&background=9c3966&color=fff',
        role: 'Science Instructor',
        status: 'offline'
      },
      subject: 'Science Project Guidance',
      unread: 0,
      lastActive: '2023-04-08T11:20:00',
      messages: [
        {
          id: 'm1',
          sender: 'parent',
          text: 'Jambo Ms. Wekesa, Njoroge is having some difficulty understanding the requirements for the ecosystem project. Could you provide more details?',
          timestamp: '2023-04-07T16:45:00',
          read: true
        },
        {
          id: 'm2',
          sender: 'tutor2',
          text: 'Jambo! I\'d be happy to help. The project requires students to create a model of a Kenyan ecosystem. Njoroge can choose between coastal, savanna, or highland forest ecosystems.',
          timestamp: '2023-04-08T09:15:00',
          read: true
        },
        {
          id: 'm3',
          sender: 'tutor2',
          text: 'The model should show the plants, animals, and their interactions. Students can use recycled materials for construction. I\'ve attached the full rubric for your reference.',
          timestamp: '2023-04-08T09:20:00',
          read: true
        },
        {
          id: 'm4',
          sender: 'parent',
          text: 'Thank you for clarifying. Njoroge is interested in the highland forest ecosystem. We\'ll look through the rubric together.',
          timestamp: '2023-04-08T11:20:00',
          read: true
        }
      ]
    },
    {
      id: '3',
      with: {
        id: 'admin1',
        name: 'Mrs. Nyambura Kamau',
        avatar: 'https://ui-avatars.com/api/?name=Nyambura+Kamau&background=3d9c39&color=fff',
        role: 'Administrative Manager',
        status: 'online'
      },
      subject: 'Upcoming Parent-Teacher Meeting',
      unread: 1,
      lastActive: '2023-04-12T08:45:00',
      messages: [
        {
          id: 'm1',
          sender: 'admin1',
          text: 'Greetings, this is a reminder about our parent-teacher virtual meeting scheduled for next Tuesday, 18th April, at 4:00 PM. The focus will be on end-of-term assessments and preparing for the next learning module.',
          timestamp: '2023-04-05T13:30:00',
          read: true
        },
        {
          id: 'm2',
          sender: 'parent',
          text: 'Thank you for the reminder. Will the meeting be on the usual Zoom link?',
          timestamp: '2023-04-06T10:15:00',
          read: true
        },
        {
          id: 'm3',
          sender: 'admin1',
          text: 'Yes, we will use the same Zoom link as previous meetings. If you have any specific topics you\'d like to discuss, please let me know beforehand so I can inform the relevant tutors.',
          timestamp: '2023-04-06T14:20:00',
          read: true
        },
        {
          id: 'm4',
          sender: 'admin1',
          text: 'Important update: We\'re also planning to discuss the upcoming field trip to the Nairobi National Museum for the history module. Please come prepared with any questions regarding this excursion.',
          timestamp: '2023-04-12T08:45:00',
          read: false
        }
      ]
    },
    {
      id: '4',
      with: {
        id: 'tech1',
        name: 'Mr. Kiprop Ruto',
        avatar: 'https://ui-avatars.com/api/?name=Kiprop+Ruto&background=9c7039&color=fff',
        role: 'Technical Support',
        status: 'offline'
      },
      subject: 'Platform Access Issues',
      unread: 0,
      lastActive: '2023-04-03T16:10:00',
      messages: [
        {
          id: 'm1',
          sender: 'parent',
          text: 'Hello, we\'re experiencing difficulties accessing the video lessons. The system keeps showing a buffering icon even though our internet connection is strong.',
          timestamp: '2023-04-03T09:45:00',
          read: true
        },
        {
          id: 'm2',
          sender: 'tech1',
          text: 'Habari. I\'m sorry to hear about the access issues. Could you please provide more details about which browser you\'re using and if this happens with all video lessons or just specific ones?',
          timestamp: '2023-04-03T10:20:00',
          read: true
        },
        {
          id: 'm3',
          sender: 'parent',
          text: 'We\'re using Chrome, and it happens with all videos. We\'ve tried both on laptop and tablet.',
          timestamp: '2023-04-03T14:30:00',
          read: true
        },
        {
          id: 'm4',
          sender: 'tech1',
          text: 'Thank you for the information. We\'ve identified a server issue affecting video playback. Our team is working on fixing it, and it should be resolved within the next hour. In the meantime, you can access the downloadable versions of the lessons from the resources section as a temporary solution.',
          timestamp: '2023-04-03T15:15:00',
          read: true
        },
        {
          id: 'm5',
          sender: 'parent',
          text: 'The downloadable versions work perfectly. Thank you for the quick response.',
          timestamp: '2023-04-03T16:00:00',
          read: true
        },
        {
          id: 'm6',
          sender: 'tech1',
          text: 'You\'re welcome! I\'m glad the downloads are working. I\'ve just received confirmation that the video streaming issue has been resolved. Please let me know if you encounter any further problems.',
          timestamp: '2023-04-03T16:10:00',
          read: true
        }
      ]
    }
  ];

  // Initialize data on component mount
  useEffect(() => {
    setLoading(true);
    try {
      // Set conversations data
      setConversations(mockConversations);
      
      // Determine which conversation to show
      let conversationToShow;
      
      if (contactIdFromUrl) {
        // If a specific contact is requested via URL, show that conversation
        conversationToShow = mockConversations.find(convo => convo.with.id === contactIdFromUrl);
      } else if (mockConversations.length > 0) {
        // Otherwise show the first conversation
        conversationToShow = mockConversations[0];
      }
      
      if (conversationToShow) {
        setActiveConversation(conversationToShow);
      }
    } catch (err) {
      console.error('Error initializing messages data:', err);
      setError('Failed to load messages data');
    } finally {
      setLoading(false);
    }
  }, [contactIdFromUrl]);

  // Scroll to bottom of messages whenever active conversation changes or messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation]);

  // Mark messages as read when conversation is opened
  useEffect(() => {
    if (activeConversation && activeConversation.unread > 0) {
      // In a real app, this would make an API call to mark messages as read
      setConversations(prevConvos => {
        return prevConvos.map(convo => {
          if (convo.id === activeConversation.id) {
            // Mark all messages as read
            const updatedMessages = convo.messages.map(msg => ({
              ...msg,
              read: true
            }));
            return {
              ...convo,
              unread: 0,
              messages: updatedMessages
            };
          }
          return convo;
        });
      });
      
      // Also update active conversation
      setActiveConversation(prev => ({
        ...prev,
        unread: 0,
        messages: prev.messages.map(msg => ({
          ...msg,
          read: true
        }))
      }));
    }
  }, [activeConversation]);

  // Format timestamp to readable format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Check if it's today
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
    
    // Check if it's yesterday
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    }
    
    // If it's older, show date
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  };

  // Handle conversation click
  const handleConversationClick = (conversation) => {
    setActiveConversation(conversation);
  };

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation) return;
    
    const newMsg = {
      id: `new-${Date.now()}`,
      sender: 'parent',
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };
    
    // Update active conversation with new message
    setActiveConversation(prev => ({
      ...prev,
      lastActive: new Date().toISOString(),
      messages: [...prev.messages, newMsg]
    }));
    
    // Update conversations list
    setConversations(prevConvos => {
      return prevConvos.map(convo => {
        if (convo.id === activeConversation.id) {
          return {
            ...convo,
            lastActive: new Date().toISOString(),
            messages: [...convo.messages, newMsg]
          };
        }
        return convo;
      });
    });
    
    // Clear input
    setNewMessage('');
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter conversations
  const getFilteredConversations = () => {
    let filtered = conversations;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(convo => 
        convo.with.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        convo.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by type
    if (activeFilter === 'unread') {
      filtered = filtered.filter(convo => convo.unread > 0);
    } else if (activeFilter === 'tutors') {
      filtered = filtered.filter(convo => convo.with.role.includes('Tutor') || convo.with.role.includes('Instructor'));
    } else if (activeFilter === 'admin') {
      filtered = filtered.filter(convo => convo.with.role.includes('Admin') || convo.with.role.includes('Manager'));
    }
    
    return filtered;
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Handle new message form inputs
  const handleNewMessageInputChange = (e) => {
    const { name, value } = e.target;
    setNewMessageData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle creating a new conversation
  const handleCreateNewConversation = (e) => {
    e.preventDefault();
    
    if (!newMessageData.recipient || !newMessageData.subject) {
      return;
    }
    
    // Close modal
    setShowNewMessageModal(false);
    
    // In a real app, this would create an actual conversation
    alert(`New conversation created with ${newMessageData.recipient} about ${newMessageData.subject}`);
    
    // Reset form
    setNewMessageData({
      recipient: '',
      subject: ''
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading messages...</p>
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
    <div className={styles.messagesContainer}>
      {/* Sidebar with conversation list */}
      <div className={styles.conversationsList}>
        <div className={styles.conversationsHeader}>
          <h2><FiMessageSquare /> Messages</h2>
          <button 
            className={styles.newMessageButton}
            onClick={() => setShowNewMessageModal(true)}
          >
            <FiPlus /> New Message
          </button>
        </div>
        
        <div className={styles.conversationsSearch}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        <div className={styles.conversationsFilter}>
          <button 
            className={activeFilter === 'all' ? styles.activeFilter : ''}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button 
            className={activeFilter === 'unread' ? styles.activeFilter : ''}
            onClick={() => handleFilterChange('unread')}
          >
            Unread
          </button>
          <button 
            className={activeFilter === 'tutors' ? styles.activeFilter : ''}
            onClick={() => handleFilterChange('tutors')}
          >
            Tutors
          </button>
          <button 
            className={activeFilter === 'admin' ? styles.activeFilter : ''}
            onClick={() => handleFilterChange('admin')}
          >
            Admin
          </button>
        </div>
        
        <div className={styles.conversationsItems}>
          {getFilteredConversations().length === 0 ? (
            <div className={styles.noConversations}>
              <p>No messages found</p>
            </div>
          ) : (
            getFilteredConversations().map(conversation => (
              <div 
                key={conversation.id} 
                className={`${styles.conversationItem} ${
                  activeConversation && activeConversation.id === conversation.id ? styles.activeConversation : ''
                } ${conversation.unread > 0 ? styles.unreadConversation : ''}`}
                onClick={() => handleConversationClick(conversation)}
              >
                <div className={styles.conversationAvatar}>
                  <img src={conversation.with.avatar} alt={conversation.with.name} />
                  <span className={`${styles.statusIndicator} ${
                    conversation.with.status === 'online' ? styles.online : styles.offline
                  }`}></span>
                </div>
                <div className={styles.conversationInfo}>
                  <div className={styles.conversationHeader}>
                    <h3>{conversation.with.name}</h3>
                    <span className={styles.conversationTime}>
                      {formatTimestamp(conversation.lastActive)}
                    </span>
                  </div>
                  <div className={styles.conversationSubject}>
                    {conversation.subject}
                  </div>
                  <div className={styles.conversationPreview}>
                    {conversation.messages[conversation.messages.length - 1].text.substring(0, 60)}
                    {conversation.messages[conversation.messages.length - 1].text.length > 60 ? '...' : ''}
                  </div>
                  {conversation.unread > 0 && (
                    <div className={styles.unreadBadge}>{conversation.unread}</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Main chat area */}
      <div className={styles.chatArea}>
        {activeConversation ? (
          <>
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderInfo}>
                <div className={styles.chatAvatar}>
                  <img src={activeConversation.with.avatar} alt={activeConversation.with.name} />
                  <span className={`${styles.statusIndicator} ${
                    activeConversation.with.status === 'online' ? styles.online : styles.offline
                  }`}></span>
                </div>
                <div>
                  <h3>{activeConversation.with.name}</h3>
                  <div className={styles.contactRole}>{activeConversation.with.role}</div>
                </div>
              </div>
              <div className={styles.chatHeaderActions}>
                <button className={styles.infoButton}>
                  <FiInfo />
                </button>
                <button className={styles.moreButton}>
                  <FiMoreVertical />
                </button>
              </div>
            </div>
            
            <div className={styles.chatMessages}>
              <div className={styles.messageSubject}>
                <h4>Subject: {activeConversation.subject}</h4>
              </div>
              
              {activeConversation.messages.map(message => (
                <div 
                  key={message.id} 
                  className={`${styles.messageItem} ${
                    message.sender === 'parent' ? styles.outgoingMessage : styles.incomingMessage
                  }`}
                >
                  {message.sender !== 'parent' && (
                    <div className={styles.messageAvatar}>
                      <img src={activeConversation.with.avatar} alt={activeConversation.with.name} />
                    </div>
                  )}
                  <div className={styles.messageContent}>
                    <div className={styles.messageText}>
                      {message.text}
                    </div>
                    <div className={styles.messageTime}>
                      {formatTimestamp(message.timestamp)}
                      {message.sender === 'parent' && (
                        <span className={styles.messageStatus}>
                          <FiCheck />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <form className={styles.chatInput} onSubmit={handleSendMessage}>
              <button type="button" className={styles.attachButton}>
                <FiPaperclip />
              </button>
              <input 
                type="text" 
                placeholder="Type a message..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                required
              />
              <button type="submit" className={styles.sendButton} disabled={!newMessage.trim()}>
                <FiSend />
              </button>
            </form>
          </>
        ) : (
          <div className={styles.noActiveChat}>
            <FiMessageSquare size={48} />
            <h3>Select a conversation to view messages</h3>
            <p>Or start a new conversation by clicking "New Message"</p>
          </div>
        )}
      </div>
      
      {/* New message modal */}
      {showNewMessageModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>New Message</h3>
              <button 
                className={styles.modalClose}
                onClick={() => setShowNewMessageModal(false)}
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={handleCreateNewConversation}>
              <div className={styles.formGroup}>
                <label htmlFor="recipient">Recipient:</label>
                <select 
                  id="recipient"
                  name="recipient"
                  value={newMessageData.recipient}
                  onChange={handleNewMessageInputChange}
                  required
                >
                  <option value="">Select recipient</option>
                  <option value="Mr. David Omondi">Mr. David Omondi (Mathematics Tutor)</option>
                  <option value="Ms. Akinyi Wekesa">Ms. Akinyi Wekesa (Science Instructor)</option>
                  <option value="Mrs. Nyambura Kamau">Mrs. Nyambura Kamau (Administrative Manager)</option>
                  <option value="Mr. Kiprop Ruto">Mr. Kiprop Ruto (Technical Support)</option>
                  <option value="Mrs. Wanjiru Maina">Mrs. Wanjiru Maina (Principal)</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject:</label>
                <input 
                  type="text"
                  id="subject"
                  name="subject"
                  value={newMessageData.subject}
                  onChange={handleNewMessageInputChange}
                  placeholder="Enter subject"
                  required
                />
              </div>
              <div className={styles.formActions}>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={() => setShowNewMessageModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.createButton}
                >
                  Start Conversation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages; 