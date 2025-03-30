import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Assignments.module.css';

// Sample data for assignments - in a real app, this would come from an API
const SAMPLE_ASSIGNMENTS = [
  {
    id: 'asgmt-001',
    title: 'Literature Analysis: "Things Fall Apart"',
    subject: 'English',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    status: 'pending',
    description: 'Write a 1000-word analysis on the main themes in Chinua Achebe\'s "Things Fall Apart." Focus on cultural clash, masculinity, and the effects of colonialism.',
    resources: [
      { name: 'Analysis Guidelines', type: 'pdf' },
      { name: 'Example Analysis', type: 'pdf' }
    ],
    totalPoints: 100,
    submissionType: 'document'
  },
  {
    id: 'asgmt-002',
    title: 'Algebra Problem Set',
    subject: 'Mathematics',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    status: 'pending',
    description: 'Complete the attached problem set covering quadratic equations, functions, and graphing. Show all work for full credit.',
    resources: [
      { name: 'Problem Set', type: 'pdf' },
      { name: 'Formula Sheet', type: 'pdf' }
    ],
    totalPoints: 50,
    submissionType: 'document'
  },
  {
    id: 'asgmt-003',
    title: 'Chemical Reactions Lab Report',
    subject: 'Chemistry',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    status: 'pending',
    description: 'Write a complete lab report for the chemical reactions experiment conducted in class. Include hypothesis, methods, results, and conclusion.',
    resources: [
      { name: 'Lab Report Template', type: 'docx' },
      { name: 'Lab Notes', type: 'pdf' }
    ],
    totalPoints: 75,
    submissionType: 'document'
  },
  {
    id: 'asgmt-004',
    title: 'History Timeline Project',
    subject: 'History',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    status: 'pending',
    description: 'Create a multimedia timeline of major events during the Industrial Revolution. Include at least 15 events with descriptions and images.',
    resources: [
      { name: 'Timeline Requirements', type: 'pdf' },
      { name: 'Example Timeline', type: 'link' }
    ],
    totalPoints: 120,
    submissionType: 'project'
  },
  {
    id: 'asgmt-005',
    title: 'Biology Ecosystem Presentation',
    subject: 'Biology',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    status: 'pending',
    description: 'Prepare a 5-minute presentation on a specific ecosystem of your choice. Include information on climate, flora, fauna, and human impact.',
    resources: [
      { name: 'Presentation Guidelines', type: 'pdf' },
      { name: 'Research Resources', type: 'link' }
    ],
    totalPoints: 100,
    submissionType: 'presentation'
  },
  {
    id: 'asgmt-006',
    title: 'Physics Problem Set: Forces and Motion',
    subject: 'Physics',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (overdue)
    status: 'overdue',
    description: 'Complete problems 1-20 in Chapter 4 of your textbook. Show all work and explain your reasoning for each problem.',
    resources: [
      { name: 'Hints and Tips', type: 'pdf' }
    ],
    totalPoints: 50,
    submissionType: 'document'
  },
  {
    id: 'asgmt-007',
    title: 'Computer Science: Algorithm Implementation',
    subject: 'Computer Science',
    dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago (completed)
    status: 'completed',
    grade: 95,
    description: 'Implement three sorting algorithms (bubble sort, merge sort, and quicksort) and compare their performance on different input sizes.',
    resources: [
      { name: 'Algorithm Specifications', type: 'pdf' },
      { name: 'Test Data', type: 'zip' }
    ],
    totalPoints: 100,
    feedback: 'Excellent work! Your performance analysis was particularly insightful. Consider optimizing your bubble sort implementation for partial credit.',
    submissionType: 'code'
  },
  {
    id: 'asgmt-008',
    title: 'Geography Map Project',
    subject: 'Geography',
    dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago (completed)
    status: 'completed',
    grade: 88,
    description: 'Create a detailed map of a country of your choice, highlighting major geographical features, cities, and resources.',
    resources: [
      { name: 'Map Requirements', type: 'pdf' }
    ],
    totalPoints: 100,
    feedback: 'Very good work on your map details and visual presentation. Could use more information on natural resources and their distribution.',
    submissionType: 'project'
  }
];

const Assignments = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  
  // Get unique subjects from assignments
  const subjects = [...new Set(SAMPLE_ASSIGNMENTS.map(assignment => assignment.subject))];
  
  // Filter assignments based on active tab, search query, and selected subject
  const filteredAssignments = SAMPLE_ASSIGNMENTS.filter(assignment => {
    // Filter by tab (status)
    if (activeTab !== 'all' && assignment.status !== activeTab) return false;
    
    // Filter by search query
    if (searchQuery && !assignment.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Filter by subject
    if (selectedSubject && assignment.subject !== selectedSubject) return false;
    
    return true;
  });
  
  // Format date to display in a readable format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Calculate days remaining or overdue
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} remaining`;
    } else if (diffDays < 0) {
      return `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} overdue`;
    } else {
      return 'Due today';
    }
  };
  
  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return styles.completedBadge;
      case 'overdue':
        return styles.overdueBadge;
      case 'pending':
        return styles.pendingBadge;
      default:
        return '';
    }
  };
  
  // Handle assignment click to show details
  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
  };
  
  // Close assignment details view
  const closeDetailsView = () => {
    setSelectedAssignment(null);
  };
  
  // Get icon for resource type
  const getResourceIcon = (type) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'docx':
        return '📝';
      case 'zip':
        return '📦';
      case 'link':
        return '🔗';
      default:
        return '📎';
    }
  };
  
  // If assignment details view is open
  if (selectedAssignment) {
    return (
      <div className={styles.assignmentDetailsContainer}>
        <div className={styles.assignmentDetailsHeader}>
          <button 
            className={styles.backButton}
            onClick={closeDetailsView}
          >
            ← Back to Assignments
          </button>
          
          <div className={`${styles.statusBadge} ${getStatusBadgeClass(selectedAssignment.status)}`}>
            {selectedAssignment.status.charAt(0).toUpperCase() + selectedAssignment.status.slice(1)}
          </div>
        </div>
        
        <div className={styles.assignmentDetailsCard}>
          <h1 className={styles.assignmentTitle}>{selectedAssignment.title}</h1>
          
          <div className={styles.assignmentMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Subject:</span>
              <span className={styles.metaValue}>{selectedAssignment.subject}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Due Date:</span>
              <span className={styles.metaValue}>{formatDate(selectedAssignment.dueDate)}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Total Points:</span>
              <span className={styles.metaValue}>{selectedAssignment.totalPoints}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Submission Type:</span>
              <span className={styles.metaValue}>{selectedAssignment.submissionType.charAt(0).toUpperCase() + selectedAssignment.submissionType.slice(1)}</span>
            </div>
            {selectedAssignment.grade && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Grade:</span>
                <span className={styles.metaValue}>{selectedAssignment.grade}/{selectedAssignment.totalPoints} ({Math.round((selectedAssignment.grade / selectedAssignment.totalPoints) * 100)}%)</span>
              </div>
            )}
          </div>
          
          <div className={styles.assignmentDescription}>
            <h2>Description</h2>
            <p>{selectedAssignment.description}</p>
          </div>
          
          <div className={styles.assignmentResources}>
            <h2>Resources</h2>
            <div className={styles.resourcesList}>
              {selectedAssignment.resources.map((resource, index) => (
                <a href="#" key={index} className={styles.resourceLink}>
                  <span className={styles.resourceIcon}>{getResourceIcon(resource.type)}</span>
                  <span className={styles.resourceName}>{resource.name}</span>
                  <span className={styles.resourceType}>.{resource.type}</span>
                </a>
              ))}
            </div>
          </div>
          
          {selectedAssignment.feedback && (
            <div className={styles.assignmentFeedback}>
              <h2>Instructor Feedback</h2>
              <p>{selectedAssignment.feedback}</p>
            </div>
          )}
          
          {selectedAssignment.status !== 'completed' && (
            <div className={styles.submissionSection}>
              <h2>Submit Your Assignment</h2>
              <div className={styles.dropzone}>
                <div className={styles.dropzoneIcon}>📤</div>
                <p>Drag your file here or click to upload</p>
                <span className={styles.supportedFormats}>Supported formats: PDF, DOCX, ZIP (max 10MB)</span>
              </div>
              
              <div className={styles.submissionControls}>
                <button className={styles.uploadButton}>Choose File</button>
                <button 
                  className={styles.submitButton}
                  disabled={selectedAssignment.status === 'overdue'}
                >
                  {selectedAssignment.status === 'overdue' ? 'Submission Closed' : 'Submit Assignment'}
                </button>
              </div>
              
              {selectedAssignment.status === 'overdue' && (
                <div className={styles.overdueMessage}>
                  <span className={styles.overdueIcon}>⚠️</span>
                  <span>This assignment is past due. Contact your instructor for late submission options.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Main assignments list view
  return (
    <div className={styles.assignmentsContainer}>
      <div className={styles.assignmentsHeader}>
        <h1 className={styles.assignmentsTitle}>My Assignments</h1>
        <p className={styles.assignmentsSubtitle}>Track, complete, and submit your assignments</p>
      </div>
      
      <div className={styles.controlsSection}>
        <div className={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Search assignments..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className={styles.filterControls}>
          <select 
            className={styles.filterSelect}
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">All Subjects</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'all' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'pending' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'completed' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'overdue' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('overdue')}
        >
          Overdue
        </button>
      </div>
      
      {filteredAssignments.length === 0 ? (
        <div className={styles.noAssignmentsMessage}>
          <div className={styles.noAssignmentsIcon}>📝</div>
          <h3>No assignments found</h3>
          <p>There are no {activeTab !== 'all' ? activeTab : ''} assignments matching your criteria.</p>
        </div>
      ) : (
        <div className={styles.assignmentsList}>
          {filteredAssignments.map((assignment) => (
            <div 
              key={assignment.id} 
              className={styles.assignmentCard}
              onClick={() => handleAssignmentClick(assignment)}
            >
              <div className={styles.assignmentHeader}>
                <div className={styles.subjectBadge}>{assignment.subject}</div>
                <div className={`${styles.statusBadge} ${getStatusBadgeClass(assignment.status)}`}>
                  {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </div>
              </div>
              
              <h3 className={styles.assignmentCardTitle}>{assignment.title}</h3>
              
              <div className={styles.assignmentCardDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}>📅</span>
                  <span className={styles.detailText}>{formatDate(assignment.dueDate)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}>⏳</span>
                  <span className={`${styles.detailText} ${
                    assignment.status === 'overdue' ? styles.overdueText : 
                    new Date(assignment.dueDate) - new Date() < 2 * 24 * 60 * 60 * 1000 ? styles.urgentText : ''
                  }`}>
                    {getDaysRemaining(assignment.dueDate)}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}>📊</span>
                  <span className={styles.detailText}>{assignment.totalPoints} points</span>
                </div>
              </div>
              
              {assignment.grade && (
                <div className={styles.gradeIndicator}>
                  <span className={styles.gradeLabel}>Grade:</span>
                  <span className={styles.gradeValue}>{assignment.grade}/{assignment.totalPoints}</span>
                </div>
              )}
              
              <div className={styles.assignmentCardFooter}>
                <button className={styles.viewDetailsButton}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assignments;