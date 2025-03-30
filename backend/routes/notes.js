const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching all notes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get notes by room ID
router.get('/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    
    // Check if a note already exists for this room
    let notes = await Note.find({ roomId });
    
    // If no note exists, create a new one
    if (notes.length === 0) {
      const newNote = new Note({
        roomId,
        title: 'Collaborative Note',
        content: '',
      });
      
      await newNote.save();
      notes = [newNote];
    }
    
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update note by room ID
router.put('/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const { content } = req.body;
    
    // Find and update the note
    let note = await Note.findOne({ roomId });
    
    if (!note) {
      // Create a new note if it doesn't exist
      note = new Note({
        roomId,
        title: 'Collaborative Note',
        content,
      });
    } else {
      // Update existing note
      note.content = content;
      note.updatedAt = Date.now();
    }
    
    await note.save();
    res.json(note);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new note
router.post('/', async (req, res) => {
  try {
    const { roomId, title, content } = req.body;
    
    // Check if a note already exists for this room
    const existingNote = await Note.findOne({ roomId });
    
    if (existingNote) {
      return res.status(400).json({ message: 'Note already exists for this room' });
    }
    
    // Create a new note
    const newNote = new Note({
      roomId,
      title: title || 'Collaborative Note',
      content: content || '',
    });
    
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a note
router.delete('/:noteId', async (req, res) => {
  try {
    const { noteId } = req.params;
    
    // Find and delete the note
    const note = await Note.findByIdAndDelete(noteId);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 