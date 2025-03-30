// src/components/dashboard/student/Notes.jsx
import React, { useState, useEffect } from 'react';
import { FaPlus, FaUsers, FaSearch, FaFilter, FaEdit, FaClock, FaExclamationCircle } from 'react-icons/fa';
import styles from './Notes.module.css';
import CollaborativeNotes from './CollaborativeNotes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SocketProvider } from '../../../../context/SocketContext';
import { getAllCollaborativeNotes, createNote } from '../../../../services/api';
import { useAuth } from '../../../../context/AuthContext';
import { nanoid } from 'nanoid';

const NotesComponent = () => {
  const [view, setView] = useState('list'); // 'list', 'collaborate', or 'personal'
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const { currentUser } = useAuth();

  // Generate a personal room ID prefix unique to this user
  const getUserPrefix = () => {
    // Use the UID from Firebase Auth to create a unique prefix
    return currentUser?.uid ? `personal_${currentUser.uid}_` : 'personal_anonymous_';
  };

  // Fetch collaborative notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const allNotes = await getAllCollaborativeNotes();
        
        // Separate personal and collaborative notes based on roomId pattern
        const userPrefix = getUserPrefix();
        const personalNotes = allNotes
          .filter(note => note.roomId.startsWith(userPrefix))
          .map(note => ({
            id: note._id,
            roomId: note.roomId,
            title: note.title || 'Untitled Note',
            lastEdited: new Date(note.updatedAt),
            preview: note.content.substring(0, 50) + (note.content.length > 50 ? '...' : ''),
            subject: note.title?.split(':')[0] || 'General',
            isPersonal: true
          }));
        
        const collaborativeNotes = allNotes
          .filter(note => !note.roomId.startsWith('personal_'))
          .map(note => ({
          id: note._id,
          roomId: note.roomId,
          title: note.title || 'Collaborative Note',
          lastEdited: new Date(note.updatedAt),
          preview: note.content.substring(0, 50) + (note.content.length > 50 ? '...' : ''),
          isCollaborative: true
        }));
        
        setNotes([...personalNotes, ...collaborativeNotes]);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
        setError('Failed to load notes');
        setNotes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [view, currentUser]); // Refetch when returning to list view or user changes

  const handleCollaborateClick = (roomId = '') => {
    setSelectedRoomId(roomId);
    setView('collaborate');
  };

  const handleNewNoteClick = async () => {
    try {
      setIsLoading(true);
      // Create a unique room ID for this personal note
      const personalRoomId = `${getUserPrefix()}${nanoid(10)}`;
      const title = 'Untitled Note';
      const content = '';
      
      // Create the note using the same API as collaborative notes
      await createNote(personalRoomId, title, content);
      
      // Navigate to the note editor
      setSelectedRoomId(personalRoomId);
      setView('personal');
      
      toast.success('New note created!');
    } catch (error) {
      console.error('Failed to create new note:', error);
      toast.error('Failed to create new note');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPersonalNote = (roomId) => {
    setSelectedRoomId(roomId);
    setView('personal');
  };

  const handleBackToNotes = () => {
    setView('list');
  };

  // Format date to relative time
  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Filter notes based on search and subject filter
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (note.preview && note.preview.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = filterSubject === 'All' || note.subject === filterSubject || 
                          (filterSubject === 'Collaborative' && note.isCollaborative) ||
                          (filterSubject === 'Personal' && note.isPersonal);
    
    return matchesSearch && matchesSubject;
  });

  if (view === 'collaborate') {
    return (
      <>
        <SocketProvider>
          <CollaborativeNotes onBack={handleBackToNotes} initialRoomId={selectedRoomId} />
        </SocketProvider>
        <ToastContainer position="bottom-right" />
      </>
    );
  }

  if (view === 'personal') {
    return (
      <>
        <SocketProvider>
          {/* Using the same CollaborativeNotes component but in personal mode */}
          <CollaborativeNotes 
            onBack={handleBackToNotes} 
            initialRoomId={selectedRoomId} 
            isPersonal={true} 
          />
        </SocketProvider>
        <ToastContainer position="bottom-right" />
      </>
    );
  }

  return (
    <div className={styles.notesContainer}>
      <div className={styles.notesHeader}>
        <h1 className={styles.notesTitle}>My Notes</h1>
        <p className={styles.notesSubtitle}>Manage and access all your personal and collaborative notes</p>
      </div>
      
      <div className={styles.notesToolbar}>
        <div className={styles.toolbarLeft}>
          <button 
            className={`${styles.newNoteBtn} ${styles.collaborateBtn}`}
            onClick={() => handleCollaborateClick()}
          >
            <FaUsers />
            <span>Collaborate</span>
          </button>
          <button 
            className={styles.newNoteBtn}
            onClick={handleNewNoteClick}
          >
            <FaPlus />
            <span>New Note</span>
          </button>
        </div>
        <div className={styles.toolbarRight}>
          <div className={styles.searchNotes}>
            <FaSearch className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search notes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.filterDropdown}>
            <FaFilter className={styles.filterIcon} />
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
            >
              <option value="All">All Notes</option>
              <option value="Personal">Personal</option>
              <option value="Collaborative">Collaborative</option>
              <option value="Mathematics">Mathematics</option>
              <option value="English">English</option>
              <option value="Science">Science</option>
              <option value="Social Studies">Social Studies</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading notes...</p>
        </div>
      )}

      {error && (
        <div className={styles.errorState}>
          <FaExclamationCircle />
          <p>{error}</p>
        </div>
      )}

      {!isLoading && filteredNotes.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📝</div>
          <h3>No notes found</h3>
          <p>Try adjusting your search or create a new note</p>
        </div>
      ) : (
        <>
          {(filterSubject === 'Personal' || filterSubject === 'All') && 
           filteredNotes.some(note => note.isPersonal) && (
            <>
              <div className={styles.sectionHeader}>
                <h2>Personal Notes</h2>
              </div>
              <div className={styles.notesGrid}>
                {filteredNotes
                  .filter(note => note.isPersonal)
                  .map(note => (
                    <div 
                      key={note.id} 
                      className={styles.noteCard}
                      onClick={() => handleEditPersonalNote(note.roomId)}
                    >
                      <div className={styles.cardHeader}>
                        <h3>{note.title}</h3>
                      </div>
                      <div className={styles.cardMeta}>
                        <span className={styles.lastEdited}>
                          <FaClock size={12} />
                          {formatDate(note.lastEdited)}
                        </span>
                        {note.subject && (
                          <span className={styles.noteSubject}>{note.subject}</span>
                        )}
                      </div>
                      <p className={styles.notePreview}>{note.preview}</p>
                      <button className={styles.editNoteButton}>
                        <FaEdit size={12} />
                        Edit Note
                      </button>
                    </div>
                  ))}
              </div>
            </>
          )}

          {(filterSubject === 'Collaborative' || filterSubject === 'All') && 
           filteredNotes.some(note => note.isCollaborative) && (
            <>
            <div className={styles.sectionHeader}>
              <h2>Collaborative Notes</h2>
            </div>
          <div className={styles.notesGrid}>
            {filteredNotes
              .filter(note => note.isCollaborative)
              .map(note => (
                <div
                  key={note.id}
                  className={`${styles.noteCard} ${styles.collaborativeCard}`}
                  onClick={() => handleCollaborateClick(note.roomId)}
                >
                  <div className={styles.cardHeader}>
                    <h3>{note.title}</h3>
                    <div className={styles.collaborativeBadge}>
                      <FaUsers size={12} />
                    </div>
                  </div>
                  <div className={styles.cardMeta}>
                    <span className={styles.lastEdited}>
                      <FaClock size={12} />
                      {formatDate(note.lastEdited)}
                    </span>
                    <span className={styles.roomId}>Room: {note.roomId}</span>
                  </div>
                  <p className={styles.notePreview}>{note.preview}</p>
                  <button className={styles.joinRoomButton}>
                    Continue Collaborating
                      </button>
                    </div>
                  ))}
              </div>
            </>
          )}
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default NotesComponent;