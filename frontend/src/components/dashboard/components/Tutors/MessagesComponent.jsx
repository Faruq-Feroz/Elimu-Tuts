import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { 
  FaSearch, 
  FaPaperPlane, 
  FaRegClock, 
  FaRegUser,
  FaRegBell,
  FaRegEnvelope,
  FaChevronDown,
  FaPlus,
  FaRegSmile,
  FaPaperclip,
  FaImage,
  FaEllipsisV,
  FaCircle,
  FaCheck,
  FaCheckDouble
} from 'react-icons/fa';
import styles from './MessagesComponent.module.css';

const MessagesComponent = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [newMessageRecipient, setNewMessageRecipient] = useState('');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  
  const messagesEndRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchConversations();
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
      markConversationAsRead(selectedConversation.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    // Filter conversations based on search query
    if (searchQuery.trim() === '') {
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter(conv => 
        conv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredConversations(filtered);
    }
  }, [searchQuery, conversations]);

  useEffect(() => {
    // Filter students for new message modal
    if (studentSearchQuery.trim() === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student => 
        student.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(studentSearchQuery.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [studentSearchQuery, students]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    setLoading(true);
    try {
      // In a real app, fetch conversations from API
      // For now, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      const mockConversations = generateMockConversations();
      setConversations(mockConversations);
      setFilteredConversations(mockConversations);
      
      // Select the first conversation by default if any exist
      if (mockConversations.length > 0) {
        setSelectedConversation(mockConversations[0]);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      // In a real app, fetch students from API
      // For now, we'll use mock data
      const mockStudents = generateMockStudents();
      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      // In a real app, fetch messages from API
      // For now, we'll use mock data
      const mockMessages = generateMockMessages(conversationId);
      setMessages(mockMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const markConversationAsRead = (conversationId) => {
    // Update the unread status of the selected conversation
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, unread: 0 } 
          : conv
      )
    );
  };

  const generateMockConversations = () => {
    const mockConversations = [];
    const studentNames = [
      'Samuel Maina', 
      'Rachel Otieno', 
      'Daniel Kamau', 
      'Elizabeth Wanjiku', 
      'Michael Odhiambo',
      'Grace Muthoni',
      'James Kariuki',
      'Sarah Njeri'
    ];
    
    const lastMessages = [
      'Hi, I had a question about the assignment due tomorrow.',
      'Thank you for your help with the project!',
      'When is the next live session scheduled?',
      'Could you explain the concept from yesterday\'s class again?',
      'I submitted my assignment. Could you check if you received it?',
      'Are there any extra study materials for this week\'s topic?',
      'I\'m having trouble accessing the course videos.',
      'Will the exam cover all topics or just the recent ones?'
    ];
    
    // Create 8 mock conversations
    for (let i = 0; i < 8; i++) {
      const name = studentNames[i];
      const lastMsg = lastMessages[i];
      const unread = Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0;
      const lastActive = new Date();
      lastActive.setMinutes(lastActive.getMinutes() - Math.floor(Math.random() * 600));
      
      mockConversations.push({
        id: `conv-${i + 1}`,
        studentId: `student-${i + 1}`,
        studentName: name,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`,
        lastMessage: lastMsg,
        lastActive: lastActive,
        unread: unread,
        online: Math.random() > 0.7
      });
    }
    
    // Sort by last active time
    return mockConversations.sort((a, b) => b.lastActive - a.lastActive);
  };

  const generateMockStudents = () => {
    const studentNames = [
      'Samuel Maina', 
      'Rachel Otieno', 
      'Daniel Kamau', 
      'Elizabeth Wanjiku', 
      'Michael Odhiambo',
      'Grace Muthoni',
      'James Kariuki',
      'Sarah Njeri',
      'Peter Gitonga',
      'Jane Nyambura',
      'George Otieno',
      'Lucy Wambui'
    ];
    
    return studentNames.map((name, index) => {
      const nameParts = name.split(' ');
      const firstName = nameParts[0].toLowerCase();
      const email = `${firstName}.${Math.floor(Math.random() * 1000)}@example.com`;
      
      return {
        id: `student-${index + 1}`,
        name: name,
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`,
        course: ['Mathematics', 'English', 'Science', 'History', 'Geography'][Math.floor(Math.random() * 5)],
        online: Math.random() > 0.7
      };
    });
  };

  const generateMockMessages = (conversationId) => {
    const mockMessages = [];
    const conversation = conversations.find(c => c.id === conversationId);
    
    if (!conversation) return [];
    
    const studentName = conversation.studentName;
    const studentId = conversation.studentId;
    
    // Get a consistent number of messages based on conversation ID
    const messageCount = (parseInt(conversationId.split('-')[1]) % 5) + 5;
    
    // Current time for the most recent message
    let messageTime = new Date();
    
    // Generate mock message content
    const studentMessages = [
      'Hi professor, I have a question about the recent assignment.',
      'Could you explain the concept from the last lecture again?',
      'When is the next test scheduled?',
      'Thank you for your help!',
      'I\'m having trouble with problem #3 on the worksheet.',
      'Are there any additional resources you recommend for this topic?',
      'I submitted my assignment. Can you confirm if you received it?',
      'Will this material be on the final exam?',
      'I missed the last class due to illness. What did I miss?',
      'How can I improve my understanding of this subject?'
    ];
    
    const tutorMessages = [
      'Hello! I\'d be happy to help you with that.',
      'Sure, the concept involves understanding that...',
      'The next test is scheduled for next Friday at 2pm.',
      'You\'re welcome! Let me know if you need anything else.',
      'For problem #3, you need to apply the formula we discussed in class.',
      'Yes, I can recommend some additional readings. I\'ll share them with you.',
      'Yes, I received your assignment. I\'ll grade it soon.',
      'The final exam will cover all the material we\'ve discussed so far.',
      'In the last class, we covered chapters 5 and 6. The notes are available online.',
      'Regular practice and revision of the concepts will help improve your understanding.'
    ];
    
    // Set time interval between messages (3-15 minutes)
    for (let i = 0; i < messageCount; i++) {
      // Alternating sender
      const isStudent = i % 2 === 0;
      
      // Set message time (older messages first)
      messageTime = new Date(messageTime.getTime() - (Math.floor(Math.random() * 12) + 3) * 60000);
      
      mockMessages.push({
        id: `msg-${conversationId}-${i}`,
        senderId: isStudent ? studentId : 'tutor-1',
        senderName: isStudent ? studentName : 'Me',
        content: isStudent 
          ? studentMessages[i % studentMessages.length] 
          : tutorMessages[i % tutorMessages.length],
        timestamp: messageTime,
        read: true,
        attachments: []
      });
    }
    
    // Add the last message that appears in the conversation list
    messageTime = new Date(messageTime.getTime() - (Math.floor(Math.random() * 12) + 3) * 60000);
    mockMessages.unshift({
      id: `msg-${conversationId}-last`,
      senderId: 'student-1',
      senderName: studentName,
      content: conversation.lastMessage,
      timestamp: conversation.lastActive,
      read: conversation.unread === 0,
      attachments: []
    });
    
    // Sort messages by timestamp (oldest first)
    return mockMessages.sort((a, b) => a.timestamp - b.timestamp);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedConversation) return;
    
    // Create a new message
    const newMsg = {
      id: `msg-${selectedConversation.id}-${Date.now()}`,
      senderId: 'tutor-1',
      senderName: 'Me',
      content: newMessage,
      timestamp: new Date(),
      read: true,
      attachments: []
    };
    
    // Update messages list
    setMessages(prev => [...prev, newMsg]);
    
    // Update conversation with new last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation.id 
          ? { 
              ...conv, 
              lastMessage: newMessage, 
              lastActive: new Date() 
            } 
          : conv
      )
    );
    
    // Clear input
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewConversation = () => {
    if (newMessageRecipient) {
      const student = students.find(s => s.id === newMessageRecipient);
      
      if (student) {
        // Check if conversation already exists
        const existingConv = conversations.find(conv => conv.studentId === student.id);
        
        if (existingConv) {
          setSelectedConversation(existingConv);
        } else {
          // Create new conversation
          const newConv = {
            id: `conv-${Date.now()}`,
            studentId: student.id,
            studentName: student.name,
            avatar: student.avatar,
            lastMessage: 'New conversation started',
            lastActive: new Date(),
            unread: 0,
            online: student.online
          };
          
          setConversations(prev => [newConv, ...prev]);
          setSelectedConversation(newConv);
          setMessages([]);
        }
        
        // Close modal
        setShowNewMessageModal(false);
        setNewMessageRecipient('');
        setStudentSearchQuery('');
      }
    }
  };

  const formatTime = (date) => {
    if (!date) return '';
    
    const now = new Date();
    const messageDate = new Date(date);
    
    // If today, return time
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    }
    
    // If this week, return day name
    const diffDays = Math.round((now - messageDate) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return messageDate.toLocaleDateString('en-US', { weekday: 'short' });
    }
    
    // Otherwise return date
    return messageDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    const messageDate = new Date(date);
    return messageDate.toDateString() === today.toDateString();
  };

  const getTotalUnreadMessages = () => {
    return conversations.reduce((total, conv) => total + conv.unread, 0);
  };

  const renderConversationsList = () => {
    if (filteredConversations.length === 0) {
      return (
        <div className={styles.emptyState}>
          <FaRegEnvelope className={styles.emptyStateIcon} />
          <h3>No conversations found</h3>
          <p>
            {searchQuery 
              ? 'Try adjusting your search query' 
              : 'Start a new conversation with your students'}
          </p>
          <button 
            className={styles.newMessageButton}
            onClick={() => setShowNewMessageModal(true)}
          >
            <FaPlus /> New Message
          </button>
        </div>
      );
    }
    
    return (
      <div className={styles.conversationsList}>
        {filteredConversations.map(conversation => (
          <div 
            key={conversation.id}
            className={`${styles.conversationItem} ${
              selectedConversation?.id === conversation.id ? styles.activeConversation : ''
            } ${conversation.unread > 0 ? styles.unreadConversation : ''}`}
            onClick={() => setSelectedConversation(conversation)}
          >
            <div className={styles.avatarContainer}>
              <img 
                src={conversation.avatar} 
                alt={conversation.studentName} 
                className={styles.avatar} 
              />
              {conversation.online && (
                <span className={styles.onlineIndicator}></span>
              )}
            </div>
            
            <div className={styles.conversationInfo}>
              <div className={styles.conversationHeader}>
                <h3 className={styles.studentName}>{conversation.studentName}</h3>
                <span className={styles.conversationTime}>
                  {formatTime(conversation.lastActive)}
                </span>
              </div>
              
              <div className={styles.conversationFooter}>
                <p className={styles.lastMessage}>{conversation.lastMessage}</p>
                {conversation.unread > 0 && (
                  <span className={styles.unreadBadge}>{conversation.unread}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMessageContent = () => {
    if (!selectedConversation) {
      return (
        <div className={styles.noConversationSelected}>
          <FaRegEnvelope className={styles.noConversationIcon} />
          <h3>Select a conversation</h3>
          <p>Choose a conversation from the list or start a new one</p>
          <button 
            className={styles.newMessageButton}
            onClick={() => setShowNewMessageModal(true)}
          >
            <FaPlus /> New Message
          </button>
        </div>
      );
    }
    
    return (
      <>
        <div className={styles.messageHeader}>
          <div className={styles.messageHeaderInfo}>
            <div className={styles.avatarContainer}>
              <img 
                src={selectedConversation.avatar} 
                alt={selectedConversation.studentName} 
                className={styles.avatar} 
              />
              {selectedConversation.online && (
                <span className={styles.onlineIndicator}></span>
              )}
            </div>
            
            <div>
              <h3 className={styles.headerStudentName}>{selectedConversation.studentName}</h3>
              <p className={styles.headerStatus}>
                {selectedConversation.online 
                  ? 'Online now' 
                  : `Last active ${formatTime(selectedConversation.lastActive)}`
                }
              </p>
            </div>
          </div>
          
          <div className={styles.messageHeaderActions}>
            <button className={styles.headerActionButton}>
              <FaEllipsisV />
            </button>
          </div>
        </div>
        
        <div className={styles.messagesContainer}>
          <div className={styles.messagesList}>
            {messages.length === 0 ? (
              <div className={styles.noMessagesState}>
                <p>No messages yet</p>
                <p>Start a conversation with {selectedConversation.studentName}</p>
              </div>
            ) : (
              messages.map((message, index) => {
                const isCurrentUser = message.senderId === 'tutor-1';
                const showDateSeparator = index === 0 || 
                  !isToday(messages[index - 1]?.timestamp) !== !isToday(message.timestamp);
                
                return (
                  <React.Fragment key={message.id}>
                    {showDateSeparator && (
                      <div className={styles.dateSeparator}>
                        {isToday(message.timestamp) ? 'Today' : new Date(message.timestamp).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    )}
                    
                    <div 
                      className={`${styles.messageItem} ${
                        isCurrentUser ? styles.outgoingMessage : styles.incomingMessage
                      }`}
                    >
                      {!isCurrentUser && (
                        <div className={styles.messageAvatar}>
                          <img 
                            src={selectedConversation.avatar} 
                            alt={message.senderName} 
                          />
                        </div>
                      )}
                      
                      <div className={styles.messageBubble}>
                        <div className={styles.messageContent}>
                          {message.content}
                        </div>
                        
                        <div className={styles.messageFooter}>
                          <span className={styles.messageTime}>
                            {new Date(message.timestamp).toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              minute: '2-digit', 
                              hour12: true 
                            })}
                          </span>
                          
                          {isCurrentUser && (
                            <span className={styles.messageStatus}>
                              {message.read ? <FaCheckDouble /> : <FaCheck />}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className={styles.messageInputContainer}>
            <button className={styles.messageInputAction}>
              <FaRegSmile />
            </button>
            <button className={styles.messageInputAction}>
              <FaPaperclip />
            </button>
            <textarea
              className={styles.messageInput}
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className={styles.sendButton}
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ''}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1>Messages</h1>
          <p className={styles.subheader}>
            {currentUser ? `Hello ${currentUser.name}, communicate with your students` : 'Communicate with your students'}
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <div className={styles.notificationBadge}>
            <FaRegBell />
            {getTotalUnreadMessages() > 0 && (
              <span className={styles.badgeCount}>{getTotalUnreadMessages()}</span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.messagesSection}>
        <div className={styles.conversationsPanel}>
          <div className={styles.conversationsHeader}>
            <h2>Conversations</h2>
            <button 
              className={styles.newChatButton}
              onClick={() => setShowNewMessageModal(true)}
            >
              <FaPlus />
            </button>
          </div>
          
          <div className={styles.searchBar}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Loading conversations...</p>
            </div>
          ) : (
            renderConversationsList()
          )}
        </div>
        
        <div className={styles.messagesPanel}>
          {renderMessageContent()}
        </div>
      </div>

      {showNewMessageModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>New Message</h2>
              <button 
                className={styles.closeButton}
                onClick={() => {
                  setShowNewMessageModal(false);
                  setNewMessageRecipient('');
                  setStudentSearchQuery('');
                }}
              >
                &times;
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.recipientField}>
                <label>To:</label>
                <div className={styles.recipientSearch}>
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={studentSearchQuery}
                    onChange={(e) => setStudentSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className={styles.studentsList}>
                {filteredStudents.length === 0 ? (
                  <div className={styles.noStudentsFound}>
                    <p>No students found</p>
                  </div>
                ) : (
                  filteredStudents.map(student => (
                    <div 
                      key={student.id}
                      className={`${styles.studentItem} ${
                        newMessageRecipient === student.id ? styles.selectedStudent : ''
                      }`}
                      onClick={() => setNewMessageRecipient(student.id)}
                    >
                      <div className={styles.studentAvatar}>
                        <img src={student.avatar} alt={student.name} />
                        {student.online && (
                          <span className={styles.onlineIndicator}></span>
                        )}
                      </div>
                      
                      <div className={styles.studentInfo}>
                        <h4>{student.name}</h4>
                        <p>{student.email}</p>
                        <span className={styles.courseLabel}>{student.course}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              <button 
                className={`${styles.startChatButton} ${
                  !newMessageRecipient ? styles.disabledButton : ''
                }`}
                onClick={startNewConversation}
                disabled={!newMessageRecipient}
              >
                Start Conversation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesComponent;