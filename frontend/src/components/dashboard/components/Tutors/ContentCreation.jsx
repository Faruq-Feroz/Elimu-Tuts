import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaVideo, FaFile, FaQuestion, FaBook, FaLink, FaUpload, FaCloudUploadAlt, FaSave, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
import styles from './ContentCreation.module.css';

const ContentCreation = () => {
  const { currentUser } = useAuth();
  const [selectedTab, setSelectedTab] = useState('lessons');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedContentType, setSelectedContentType] = useState(null);
  const [showContentForm, setShowContentForm] = useState(false);
  const [contentList, setContentList] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: '',
    contentType: '',
    videoUrl: '',
    fileUrl: '',
    content: '',
    duration: '',
    questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/courses`);
      
      let tutorCourses = [];
      if (response.data) {
        if (Array.isArray(response.data)) {
          tutorCourses = response.data.filter(course => course.tutor === currentUser?.uid);
        } else if (Array.isArray(response.data.data)) {
          tutorCourses = response.data.data.filter(course => course.tutor === currentUser?.uid);
        }
        setCourses(tutorCourses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCourse) {
      fetchContent();
    }
  }, [selectedCourse, selectedTab]);

  const fetchContent = async () => {
    if (!selectedCourse) return;

    setLoading(true);
    // In a real app, this would be an API call to get content for the selected course
    // For now, we'll use mock data
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockContent = generateMockContent(selectedCourse._id, selectedTab);
      setContentList(mockContent);
    } catch (error) {
      console.error("Error fetching content:", error);
      setError("Failed to load content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateMockContent = (courseId, contentType) => {
    const types = {
      lessons: [
        { id: `lesson-1-${courseId}`, title: "Introduction to the Course", description: "An overview of what to expect from this course", contentType: "video", videoUrl: "https://example.com/video1.mp4", duration: "10:23", createdAt: "2023-10-15" },
        { id: `lesson-2-${courseId}`, title: "Core Concepts Explained", description: "Detailed explanation of the fundamental concepts", contentType: "document", fileUrl: "https://example.com/document1.pdf", duration: "25 pages", createdAt: "2023-10-16" },
        { id: `lesson-3-${courseId}`, title: "Practical Applications", description: "How to apply the concepts in real-world scenarios", contentType: "video", videoUrl: "https://example.com/video2.mp4", duration: "18:45", createdAt: "2023-10-18" }
      ],
      quizzes: [
        { id: `quiz-1-${courseId}`, title: "Module 1 Assessment", description: "Test your understanding of the basic concepts", contentType: "quiz", questions: 10, duration: "15 min", createdAt: "2023-10-17" },
        { id: `quiz-2-${courseId}`, title: "Mid-term Quiz", description: "Comprehensive assessment of all modules covered so far", contentType: "quiz", questions: 25, duration: "30 min", createdAt: "2023-10-22" }
      ],
      resources: [
        { id: `resource-1-${courseId}`, title: "Supplementary Reading Materials", description: "Additional articles and research papers", contentType: "document", fileUrl: "https://example.com/resources1.pdf", createdAt: "2023-10-14" },
        { id: `resource-2-${courseId}`, title: "Helpful External Links", description: "Collection of useful websites and tools", contentType: "links", links: ["https://example.com/tool1", "https://example.com/tool2"], createdAt: "2023-10-19" },
        { id: `resource-3-${courseId}`, title: "Practice Worksheets", description: "Additional exercises for practice", contentType: "document", fileUrl: "https://example.com/worksheets.pdf", createdAt: "2023-10-20" }
      ]
    };
    
    return types[contentType] || [];
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    resetForm();
  };

  const handleCourseSelect = (courseId) => {
    const course = courses.find(c => c._id === courseId);
    setSelectedCourse(course);
    
    // Reset content form when changing course
    setShowContentForm(false);
    resetForm();
  };

  const handleContentTypeSelect = (type) => {
    setSelectedContentType(type);
    setFormData({
      ...formData,
      contentType: type,
      courseId: selectedCourse?._id
    });
  };

  const toggleContentForm = () => {
    setShowContentForm(!showContentForm);
    if (!showContentForm) {
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      courseId: selectedCourse?._id || '',
      contentType: '',
      videoUrl: '',
      fileUrl: '',
      content: '',
      duration: '',
      questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]
    });
    setIsEditing(false);
    setEditingId(null);
    setSelectedContentType(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    
    if (field === 'question') {
      updatedQuestions[index].question = value;
    } else if (field === 'correctAnswer') {
      updatedQuestions[index].correctAnswer = parseInt(value);
    } else if (field.startsWith('option')) {
      const optionIndex = parseInt(field.split('-')[1]);
      updatedQuestions[index].options[optionIndex] = value;
    }
    
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { question: '', options: ['', '', '', ''], correctAnswer: 0 }
      ]
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions.splice(index, 1);
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // In a real app, this would be an API call to create/update content
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (isEditing) {
        // Update existing content
        const updatedContentList = contentList.map(content => 
          content.id === editingId ? { ...formData, id: editingId } : content
        );
        setContentList(updatedContentList);
      } else {
        // Add new content
        const newContent = {
          ...formData,
          id: `${selectedTab.slice(0, -1)}-${contentList.length + 1}-${selectedCourse._id}`,
          createdAt: new Date().toISOString().split('T')[0]
        };
        
        // If it's a quiz, add questions count
        if (selectedTab === 'quizzes') {
          newContent.questions = formData.questions.length;
        }
        
        setContentList([...contentList, newContent]);
      }
      
      resetForm();
      setShowContentForm(false);
      
    } catch (error) {
      console.error("Error saving content:", error);
      setError("Failed to save content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (content) => {
    setIsEditing(true);
    setEditingId(content.id);
    
    // Set appropriate form data based on content type
    setFormData({
      ...content,
      contentType: content.contentType,
      courseId: selectedCourse._id
    });
    
    setSelectedContentType(content.contentType);
    setShowContentForm(true);
  };

  const handleDelete = async (contentId) => {
    if (!window.confirm("Are you sure you want to delete this content? This action cannot be undone.")) {
      return;
    }
    
    // In a real app, this would be an API call to delete content
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedContentList = contentList.filter(content => content.id !== contentId);
      setContentList(updatedContentList);
      
    } catch (error) {
      console.error("Error deleting content:", error);
      setError("Failed to delete content. Please try again.");
    }
  };

  const renderContentTypeSelector = () => {
    const contentTypes = {
      lessons: [
        { id: 'video', label: 'Video Lesson', icon: <FaVideo /> },
        { id: 'document', label: 'Document/PDF', icon: <FaFile /> }
      ],
      quizzes: [
        { id: 'quiz', label: 'Multiple Choice Quiz', icon: <FaQuestion /> }
      ],
      resources: [
        { id: 'document', label: 'Document/PDF', icon: <FaFile /> },
        { id: 'links', label: 'External Links', icon: <FaLink /> }
      ]
    };
    
    return (
      <div className={styles.contentTypesGrid}>
        {contentTypes[selectedTab].map(type => (
          <div 
            key={type.id}
            className={`${styles.contentTypeCard} ${selectedContentType === type.id ? styles.selected : ''}`}
            onClick={() => handleContentTypeSelect(type.id)}
          >
            <div className={styles.contentTypeIcon}>{type.icon}</div>
            <div className={styles.contentTypeLabel}>{type.label}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderContentForm = () => {
    return (
      <form onSubmit={handleSubmit} className={styles.contentForm}>
        <div className={styles.formHeader}>
          <h3>{isEditing ? 'Edit Content' : 'Create New Content'}</h3>
          <button 
            type="button" 
            className={styles.closeFormButton}
            onClick={toggleContentForm}
          >
            <FaTimes />
          </button>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Enter a descriptive title"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            placeholder="Provide a brief description"
            rows="3"
          />
        </div>

        {/* Render different fields based on content type */}
        {selectedContentType === 'video' && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="videoUrl">Video URL</label>
              <input
                type="url"
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                required
                placeholder="Enter video URL (YouTube, Vimeo, etc.)"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
                placeholder="e.g., 10:30"
              />
            </div>
          </>
        )}

        {selectedContentType === 'document' && (
          <div className={styles.formGroup}>
            <label htmlFor="fileUrl">Document URL or Upload</label>
            <div className={styles.fileUploadGroup}>
              <input
                type="url"
                id="fileUrl"
                name="fileUrl"
                value={formData.fileUrl}
                onChange={handleInputChange}
                placeholder="Enter document URL or upload a file"
              />
              <div className={styles.uploadButtonWrapper}>
                <button type="button" className={styles.uploadButton}>
                  <FaUpload /> Upload
                </button>
              </div>
            </div>
            <div className={styles.fileUploadNote}>
              <small>Supported formats: PDF, DOCX, PPT (Max: 10MB)</small>
            </div>
          </div>
        )}

        {selectedContentType === 'links' && (
          <div className={styles.formGroup}>
            <label>External Links</label>
            <div className={styles.linksContainer}>
              <input
                type="url"
                name="link1"
                placeholder="Enter URL"
                className={styles.linkInput}
              />
              <input
                type="text"
                name="linkTitle1"
                placeholder="Link title or description"
                className={styles.linkInput}
              />
              <button type="button" className={styles.addLinkButton}>
                <FaPlus /> Add Another Link
              </button>
            </div>
          </div>
        )}

        {selectedContentType === 'quiz' && (
          <div className={styles.quizFormSection}>
            <div className={styles.quizHeader}>
              <h4>Quiz Questions</h4>
              <button 
                type="button" 
                className={styles.addQuestionButton}
                onClick={addQuestion}
              >
                <FaPlus /> Add Question
              </button>
            </div>
            
            {formData.questions.map((question, qIndex) => (
              <div key={qIndex} className={styles.questionCard}>
                <div className={styles.questionHeader}>
                  <h5>Question {qIndex + 1}</h5>
                  {formData.questions.length > 1 && (
                    <button 
                      type="button" 
                      className={styles.removeQuestionButton}
                      onClick={() => removeQuestion(qIndex)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                
                <div className={styles.formGroup}>
                  <label>Question Text</label>
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                    required
                    placeholder="Enter your question"
                  />
                </div>
                
                <div className={styles.optionsContainer}>
                  <label>Answer Options</label>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className={styles.optionGroup}>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleQuestionChange(qIndex, `option-${oIndex}`, e.target.value)}
                        required
                        placeholder={`Option ${oIndex + 1}`}
                        className={styles.optionInput}
                      />
                      <label className={styles.correctAnswerLabel}>
                        <input
                          type="radio"
                          name={`correctAnswer-${qIndex}`}
                          value={oIndex}
                          checked={question.correctAnswer === oIndex}
                          onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                          required
                        />
                        Correct Answer
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={toggleContentForm}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Content' : 'Create Content')}
          </button>
        </div>
      </form>
    );
  };

  const renderContentList = () => {
    if (loading) {
      return (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading content...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className={styles.errorState}>
          <p>{error}</p>
          <button onClick={fetchContent} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      );
    }
    
    if (!contentList.length) {
      return (
        <div className={styles.emptyState}>
          <FaBook className={styles.emptyStateIcon} />
          <h3>No {selectedTab} found</h3>
          <p>Create your first {selectedTab.slice(0, -1)} for this course.</p>
          <button 
            onClick={toggleContentForm}
            className={styles.createButton}
          >
            <FaPlus /> Create {selectedTab.slice(0, -1)}
          </button>
        </div>
      );
    }
    
    return (
      <div className={styles.contentListContainer}>
        {contentList.map(content => (
          <div key={content.id} className={styles.contentCard}>
            <div className={styles.contentIcon}>
              {content.contentType === 'video' && <FaVideo />}
              {content.contentType === 'document' && <FaFile />}
              {content.contentType === 'quiz' && <FaQuestion />}
              {content.contentType === 'links' && <FaLink />}
            </div>
            
            <div className={styles.contentInfo}>
              <h4>{content.title}</h4>
              <p>{content.description}</p>
              
              <div className={styles.contentMeta}>
                {content.duration && <span><FaVideo /> {content.duration}</span>}
                {content.questions && <span><FaQuestion /> {content.questions} questions</span>}
                <span>Created: {content.createdAt}</span>
              </div>
            </div>
            
            <div className={styles.contentActions}>
              <button 
                onClick={() => handleEdit(content)}
                className={styles.editButton}
                title="Edit"
              >
                <FaEdit />
              </button>
              <button 
                onClick={() => handleDelete(content.id)}
                className={styles.deleteButton}
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1><FaBook className={styles.headerIcon} /> Content Creation</h1>
          <p className={styles.subheader}>Create and manage educational materials for your courses</p>
        </div>
        
        {selectedCourse && !showContentForm && (
          <button 
            className={styles.createContentButton}
            onClick={toggleContentForm}
          >
            <FaPlus /> Create Content
          </button>
        )}
      </div>

      <div className={styles.contentArea}>
        <div className={styles.sidePanel}>
          <div className={styles.courseSelector}>
            <h3>Select Course</h3>
            
            {loading && !courses.length ? (
              <div className={styles.loadingCourses}>
                <div className={styles.spinner}></div>
                <p>Loading courses...</p>
              </div>
            ) : (
              <div className={styles.courseList}>
                {courses.length > 0 ? (
                  courses.map(course => (
                    <div 
                      key={course._id}
                      className={`${styles.courseItem} ${selectedCourse?._id === course._id ? styles.activeCourse : ''}`}
                      onClick={() => handleCourseSelect(course._id)}
                    >
                      <div className={styles.courseImage}>
                        <img src={course.coverImage || 'https://via.placeholder.com/40x40?text=Course'} alt={course.title} />
                      </div>
                      <div className={styles.courseTitle}>{course.title}</div>
                    </div>
                  ))
                ) : (
                  <div className={styles.noCourses}>
                    <p>No courses found.</p>
                    <p>Create a course to add content.</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {selectedCourse && (
            <div className={styles.contentTypes}>
              <h3>Content Type</h3>
              
              <div className={styles.tabsContainer}>
                <div 
                  className={`${styles.tab} ${selectedTab === 'lessons' ? styles.activeTab : ''}`}
                  onClick={() => handleTabChange('lessons')}
                >
                  <FaVideo className={styles.tabIcon} />
                  <span>Lessons</span>
                </div>
                
                <div 
                  className={`${styles.tab} ${selectedTab === 'quizzes' ? styles.activeTab : ''}`}
                  onClick={() => handleTabChange('quizzes')}
                >
                  <FaQuestion className={styles.tabIcon} />
                  <span>Quizzes</span>
                </div>
                
                <div 
                  className={`${styles.tab} ${selectedTab === 'resources' ? styles.activeTab : ''}`}
                  onClick={() => handleTabChange('resources')}
                >
                  <FaBook className={styles.tabIcon} />
                  <span>Resources</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.mainContent}>
          {!selectedCourse ? (
            <div className={styles.noCourseSelected}>
              <FaBook className={styles.noCourseIcon} />
              <h2>Select a Course</h2>
              <p>Choose a course from the list to manage its content</p>
            </div>
          ) : showContentForm ? (
            <div className={styles.contentFormContainer}>
              {!selectedContentType ? (
                <div className={styles.contentTypeSelection}>
                  <h3>Select Content Type</h3>
                  {renderContentTypeSelector()}
                </div>
              ) : (
                renderContentForm()
              )}
            </div>
          ) : (
            <div className={styles.contentListSection}>
              <div className={styles.contentListHeader}>
                <h3>{selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} for {selectedCourse.title}</h3>
              </div>
              {renderContentList()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCreation;