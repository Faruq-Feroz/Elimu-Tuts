// src/components/dashboard/student/Notes.jsx
import React from 'react';
import styles from './Notes.module.css';

const NotesComponent = () => {
  return (
    <div className={styles.notesContainer}>
      <h2>My Notes</h2>
      <div className={styles.notesToolbar}>
        <button className={styles.newNoteBtn}>New Note</button>
        <div className={styles.searchNotes}>
          <input type="text" placeholder="Search notes..." />
        </div>
        <div className={styles.filterDropdown}>
          <select>
            <option>All Subjects</option>
            <option>Mathematics</option>
            <option>English</option>
            <option>Science</option>
            <option>Social Studies</option>
          </select>
        </div>
      </div>
      <div className={styles.notesGrid}>
        <div className={styles.noteCard}>
          <h3>Mathematics Formulas</h3>
          <p>Last edited: Today</p>
          <p className={styles.notePreview}>Area of a circle = πr²...</p>
        </div>
        <div className={styles.noteCard}>
          <h3>English Grammar Rules</h3>
          <p>Last edited: 2 days ago</p>
          <p className={styles.notePreview}>Subject-verb agreement...</p>
        </div>
        <div className={styles.noteCard}>
          <h3>Science: Solar System</h3>
          <p>Last edited: 1 week ago</p>
          <p className={styles.notePreview}>The planets in order...</p>
        </div>
      </div>
    </div>
  );
};

export default NotesComponent;