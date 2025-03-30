// Base URL for the API
const API_URL = import.meta.env.VITE_API_URL || 'https://collaborative-note-app-iq6g.onrender.com';

/**
 * Get notes for a specific room
 * @param {string} roomId - The room ID
 * @returns {Promise<Array>} - The notes data
 */
export const getNotes = async (roomId) => {
  try {
    const response = await fetch(`${API_URL}/api/notes/${roomId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

/**
 * Get all collaborative notes
 * @returns {Promise<Array>} - All available collaborative notes
 */
export const getAllCollaborativeNotes = async () => {
  try {
    const response = await fetch(`${API_URL}/api/notes`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch collaborative notes');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching collaborative notes:', error);
    throw error;
  }
};

/**
 * Update a note's content
 * @param {string} roomId - The room ID
 * @param {string} content - The note content
 * @param {string} title - Optional title for the note
 * @returns {Promise<Object>} - The updated note
 */
export const updateNote = async (roomId, content, title) => {
  try {
    const response = await fetch(`${API_URL}/api/notes/${roomId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, title }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update note');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

/**
 * Create a new note
 * @param {string} roomId - The room ID
 * @param {string} title - The note title
 * @param {string} content - The note content
 * @returns {Promise<Object>} - The created note
 */
export const createNote = async (roomId, title, content) => {
  try {
    const response = await fetch(`${API_URL}/api/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomId, title, content }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create note');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

/**
 * Delete a note
 * @param {string} noteId - The note ID
 * @returns {Promise<Object>} - The response data
 */
export const deleteNote = async (noteId) => {
  try {
    const response = await fetch(`${API_URL}/api/notes/${noteId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete note');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
}; 