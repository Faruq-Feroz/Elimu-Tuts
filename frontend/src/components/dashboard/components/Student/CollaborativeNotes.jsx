import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
// eslint-disable-next-line
import { AnimatePresence, motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaCopy, 
  FaClock, 
  FaBolt, 
  FaShareAlt,
  FaUserPlus,
  FaUsers,
  FaPen
} from 'react-icons/fa';
import { useSocket } from '../../../../context/SocketContext';
import { getNotes, updateNote } from '../../../../services/api';
import styles from './CollaborativeNotes.module.css';
import { useAuth } from '../../../../context/AuthContext';

const CollaborativeNotes = ({ onBack, initialRoomId = '', isPersonal = false }) => {
  const [view, setView] = useState(initialRoomId ? 'room' : 'home'); // 'home' or 'room'
  const [roomId, setRoomId] = useState(initialRoomId);
  const [noteContent, setNoteContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUsersList, setShowUsersList] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef(null);
  const titleInputRef = useRef(null);
  
  const { currentUser } = useAuth(); 
  const username = currentUser?.displayName || 'Anonymous';

  const { socket, connected, roomUsers, joinRoom, leaveRoom } = useSocket();

  // Handle room creation
  const handleCreateRoom = () => {
    const newRoomId = nanoid(10);
    setRoomId(newRoomId);
  };

  // Handle join room
  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (!roomId) return;
    
    setView('room');
  };

  // Join room when view changes to 'room' or when initialRoomId is provided
  useEffect(() => {
    if (view === 'room' && connected && socket && roomId) {
      // Only join room with others if not a personal note
      if (!isPersonal) {
        joinRoom(roomId, username);
      }
      
      // Fetch initial note content
      fetchNoteContent();

      // Listen for note updates from others (only for collaborative notes)
      if (!isPersonal && socket) {
        socket.on('note-updated', (updatedContent) => {
          setNoteContent(updatedContent);
        });
      }

      // Clean up on component unmount or view change
      return () => {
        if (!isPersonal) {
          leaveRoom(roomId);
          socket.off('note-updated');
        }
      };
    }
  }, [view, connected, socket, roomId, username, isPersonal]);

  const fetchNoteContent = async () => {
    try {
      setIsLoading(true);
      const notes = await getNotes(roomId);
      if (notes && notes.length > 0) {
        setNoteContent(notes[0].content);
        setNoteTitle(notes[0].title || (isPersonal ? 'Untitled Note' : 'Collaborative Note'));
      }
    } catch (error) {
      toast.error('Failed to load note content');
      console.error('Error fetching notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNoteChange = (e) => {
    const newContent = e.target.value;
    setNoteContent(newContent);
    
    // Emit content change to other users if it's a collaborative note
    if (!isPersonal && socket) {
      socket.emit('update-note', { roomId, content: newContent });
    }
    
    // Debounce saving to the database
    debounceSaveNote(newContent, noteTitle);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setNoteTitle(newTitle);
    
    // Save the title along with the current content
    debounceSaveNote(noteContent, newTitle);
  };

  // Enhanced debounce implementation for saving notes with visual feedback
  const debounceSaveNote = (() => {
    let timeout;
    return (content, title) => {
      clearTimeout(timeout);
      setIsSaving(true);
      timeout = setTimeout(() => {
        updateNote(roomId, content, title)
          .then(() => {
            setLastSaved(new Date());
          })
          .catch((error) => {
            console.error('Error updating note:', error);
            toast.error('Failed to save note content');
          })
          .finally(() => {
            setIsSaving(false);
          });
      }, 1000);
    };
  })();

  const copyRoomLink = () => {
    const roomLink = window.location.href + '?room=' + roomId;
    navigator.clipboard.writeText(roomLink);
    toast.success('Room link copied to clipboard');
  };

  const goHome = () => {
    if (onBack) {
      onBack();
    } else {
      setView('home');
    }
  };

  const focusEditor = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const formatLastSaved = () => {
    if (!lastSaved) return '';
    const now = new Date();
    const diff = now - lastSaved;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    return lastSaved.toLocaleTimeString();
  };

  const renderHome = () => (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.titleDot}></span>
          Collaborative Notes
        </h1>
      </div>
      
      <div className={styles.homeForm}>
        <div>
          <h2 className={styles.homeTitle}>Start Collaborating</h2>
          <p className={styles.homeSubtitle}>Create a new note or join an existing one to collaborate in real-time</p>
        </div>
        
        <form onSubmit={handleJoinRoom}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Your Name</label>
            <input
              type="text"
              id="username"
              value={username}
              disabled
              placeholder="Enter your name"
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="roomId">Room ID</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="text"
                id="roomId"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter room ID or create a new one"
                required
              />
              {roomId && (
                <button 
                  type="button" 
                  className={styles.iconButton}
                  onClick={() => {
                    navigator.clipboard.writeText(roomId);
                    toast.success('Room ID copied');
                  }}
                  title="Copy room ID"
                >
                  <FaCopy size={16} />
                </button>
              )}
            </div>
          </div>
          
          <div className={styles.buttonGroup}>
            <button 
              type="button" 
              onClick={handleCreateRoom}
              className={styles.createButton}
            >
              Generate Room
            </button>
            <button 
              type="submit" 
              className={styles.joinButton}
            >
              Join Room
              <FaUserPlus size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderRoom = () => (
    <div className={styles.container}>
      <motion.div 
        className={styles.header}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button 
          className={styles.backButton} 
          onClick={goHome}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft size={18} />
          <span>Back</span>
        </motion.button>
        
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className={styles.titleDot}></span>
          {isPersonal ? 'Personal Note' : `Room: ${roomId}`}
        </motion.h1>
        
        <div className={styles.headerActions}>
          {!isPersonal && (
            <>
              <motion.button 
                className={styles.actionButton}
                onClick={() => setShowUsersList(!showUsersList)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <FaUsers size={16} />
                <span>{roomUsers.length}</span>
              </motion.button>
              
              <motion.button 
                className={styles.actionButton}
                onClick={copyRoomLink}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <FaShareAlt size={16} />
                <span>Share</span>
              </motion.button>
            </>
          )}
          
          <motion.div 
            className={styles.saveStatus}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {isSaving ? (
              <>
                <div className={styles.savingSpinner}></div>
                <span>Saving...</span>
              </>
            ) : lastSaved ? (
              <>
                <FaClock size={14} />
                <span>Saved {formatLastSaved()}</span>
              </>
            ) : null}
          </motion.div>
        </div>
      </motion.div>
      
      {showUsersList && !isPersonal && (
        <motion.div 
          className={styles.usersPanel}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3>
            <FaUsers size={16} />
            Connected Users
          </h3>
          <ul className={styles.usersList}>
            {roomUsers.map((user, index) => (
              <motion.li 
                key={index} 
                className={styles.userItem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={styles.userAvatar}>
                  {user.charAt(0).toUpperCase()}
                </div>
                <span className={styles.userName}>{user}</span>
                {user === username && <span className={styles.youBadge}>You</span>}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
      
      {isPersonal && (
        <div className={styles.titleInputWrapper}>
          <input
            ref={titleInputRef}
            type="text"
            className={styles.titleInput}
            value={noteTitle}
            onChange={handleTitleChange}
            placeholder="Enter note title..."
          />
        </div>
      )}
      
      <motion.div 
        className={styles.editorWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onClick={focusEditor}
      >
        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading note content...</p>
          </div>
        ) : (
          <div className={styles.editor}>
            <textarea
              ref={textareaRef}
              className={styles.noteTextarea}
              value={noteContent}
              onChange={handleNoteChange}
              placeholder={isPersonal ? "Start typing your personal note..." : "Start typing to collaborate..."}
              autoFocus
            ></textarea>
            
            <div className={styles.editorFooter}>
              <div className={styles.editorControls}>
                {/* ... existing editor controls ... */}
              </div>
              
              <div className={styles.editorInfo}>
                <div className={styles.wordCount}>
                  {noteContent.trim() ? noteContent.trim().split(/\s+/).length : 0} words
                </div>
                
                {isPersonal ? (
                  <div className={styles.personalModeTag}>
                    <FaPen size={12} />
                    <span>Personal Note</span>
                  </div>
                ) : connected ? (
                  <div className={styles.connectionStatus}>
                    <FaBolt className={styles.connectedIcon} />
                    <span>Connected</span>
                  </div>
                ) : (
                  <div className={styles.connectionStatus}>
                    <div className={styles.offlineIndicator}></div>
                    <span>Offline</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );

  return view === 'home' ? renderHome() : renderRoom();
};

export default CollaborativeNotes; 