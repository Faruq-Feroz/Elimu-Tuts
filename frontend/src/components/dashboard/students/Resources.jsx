import React, { useState, useLayoutEffect } from 'react';
import styles from './Resources.module.css';

// Sample data for resources
const SAMPLE_RESOURCES = [
  {
    id: 'res-001',
    title: 'Introduction to Mathematics Concepts',
    subject: 'Mathematics',
    type: 'pdf',
    size: '2.4 MB',
    uploadDate: new Date(2023, 7, 15),
    description: 'A comprehensive guide to basic mathematical concepts covered in this course. Includes definitions, formulas, and example problems.',
    downloadUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3'
  },
  {
    id: 'res-002',
    title: 'English Literature Reading List',
    subject: 'English',
    type: 'pdf',
    size: '1.1 MB',
    uploadDate: new Date(2023, 8, 3),
    description: 'Complete reading list for the English Literature course with recommended texts and supplementary materials.',
    downloadUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530018352490-c6eef07fd7e0?ixlib=rb-4.0.3'
  },
  {
    id: 'res-003',
    title: 'Physics Lab Procedures Manual',
    subject: 'Physics',
    type: 'pdf',
    size: '3.8 MB',
    uploadDate: new Date(2023, 8, 10),
    description: 'Detailed manual for all laboratory procedures and safety protocols for the Physics class experiments.',
    downloadUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3'
  },
  {
    id: 'res-004',
    title: 'Chemistry Periodic Table Guide',
    subject: 'Chemistry',
    type: 'pdf',
    size: '1.5 MB',
    uploadDate: new Date(2023, 7, 28),
    description: 'Interactive guide to the periodic table of elements with detailed information on each element and its properties.',
    downloadUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3'
  },
  {
    id: 'res-005',
    title: 'Biology Cell Structure Slides',
    subject: 'Biology',
    type: 'pptx',
    size: '5.2 MB',
    uploadDate: new Date(2023, 8, 5),
    description: 'Presentation slides covering cell structures, functions, and processes with detailed diagrams and animations.',
    downloadUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3'
  },
  {
    id: 'res-006',
    title: 'History Timeline Project Template',
    subject: 'History',
    type: 'docx',
    size: '850 KB',
    uploadDate: new Date(2023, 8, 12),
    description: 'Template document for the history timeline project with formatting guidelines and example entries.',
    downloadUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-4.0.3'
  },
  {
    id: 'res-007',
    title: 'Computer Science Algorithm Examples',
    subject: 'Computer Science',
    type: 'zip',
    size: '4.7 MB',
    uploadDate: new Date(2023, 8, 8),
    description: 'Collection of example code implementations for various algorithms covered in the computer science curriculum.',
    downloadUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3'
  },
  {
    id: 'res-008',
    title: 'Geography Map Creation Tutorial',
    subject: 'Geography',
    type: 'mp4',
    size: '78.5 MB',
    uploadDate: new Date(2023, 7, 30),
    description: 'Video tutorial demonstrating techniques for creating detailed geographical maps using digital tools.',
    downloadUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3'
  },
  {
    id: 'res-009',
    title: 'Art History Reference Images',
    subject: 'Art',
    type: 'zip',
    size: '125 MB',
    uploadDate: new Date(2023, 8, 15),
    description: 'High-resolution image collection of important artworks referenced throughout the Art History course.',
    downloadUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3'
  },
  {
    id: 'res-010',
    title: 'Music Theory Workbook',
    subject: 'Music',
    type: 'pdf',
    size: '3.2 MB',
    uploadDate: new Date(2023, 8, 1),
    description: 'Comprehensive workbook for music theory exercises, including notation, scales, and harmony practice.',
    downloadUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3'
  },
  {
    id: 'res-011',
    title: 'Physical Education Activity Log',
    subject: 'Physical Education',
    type: 'xlsx',
    size: '720 KB',
    uploadDate: new Date(2023, 8, 7),
    description: 'Spreadsheet template for tracking physical activities, exercise routines, and progress throughout the semester.',
    downloadUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3'
  },
  {
    id: 'res-012',
    title: 'Language Learning Audio Files',
    subject: 'Languages',
    type: 'zip',
    size: '98.3 MB',
    uploadDate: new Date(2023, 8, 9),
    description: 'Collection of audio files for language practice, including pronunciation guides and conversation examples.',
    downloadUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3'
  }
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('uploadDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedResource, setSelectedResource] = useState(null);
  
  // Reset scroll position when component mounts
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    
    // Also reset any parent scrollable elements
    const parentScrollable = document.querySelector('.contentArea');
    if (parentScrollable) {
      parentScrollable.scrollTop = 0;
    }
  }, []);
  
  // Get unique subjects and file types
  const subjects = [...new Set(SAMPLE_RESOURCES.map(resource => resource.subject))];
  const fileTypes = [...new Set(SAMPLE_RESOURCES.map(resource => resource.type))];
  
  // Filter resources based on search, subject, and type
  const filteredResources = SAMPLE_RESOURCES.filter(resource => {
    // Filter by search query (title or description)
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !resource.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by subject
    if (selectedSubject && resource.subject !== selectedSubject) {
      return false;
    }
    
    // Filter by file type
    if (selectedType && resource.type !== selectedType) {
      return false;
    }
    
    return true;
  });
  
  // Sort filtered resources
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'title') {
      return sortOrder === 'asc' 
        ? a.title.localeCompare(b.title) 
        : b.title.localeCompare(a.title);
    } else if (sortBy === 'subject') {
      return sortOrder === 'asc'
        ? a.subject.localeCompare(b.subject)
        : b.subject.localeCompare(a.subject);
    } else if (sortBy === 'size') {
      const aSize = parseFloat(a.size);
      const bSize = parseFloat(b.size);
      return sortOrder === 'asc' ? aSize - bSize : bSize - aSize;
    } else if (sortBy === 'uploadDate') {
      return sortOrder === 'asc'
        ? new Date(a.uploadDate) - new Date(b.uploadDate)
        : new Date(b.uploadDate) - new Date(a.uploadDate);
    }
    return 0;
  });
  
  // Format date to display in a readable format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get file type icon
  const getFileTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return '📄';
      case 'docx':
        return '📝';
      case 'pptx':
        return '📊';
      case 'xlsx':
        return '📈';
      case 'zip':
        return '📦';
      case 'mp4':
        return '🎬';
      case 'mp3':
        return '🎵';
      default:
        return '📎';
    }
  };
  
  // Handle resource selection
  const handleResourceSelect = (resource) => {
    setSelectedResource(resource);
  };
  
  // Close resource detail view
  const closeResourceDetail = () => {
    setSelectedResource(null);
  };
  
  // Toggle sort order
  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  // Simulate download (in a real app, this would handle the actual download)
  const handleDownload = (e, resource) => {
    e.stopPropagation();
    alert(`Downloading: ${resource.title}`);
    // In a real app, you would trigger the actual download here
  };
  
  // Sort controls section in the JSX that needs to be modified
  const sortControl = (
    <div className={styles.sortGroup}>
      <span className={styles.sortLabel}>Sort by:</span>
      <select 
        className={styles.sortSelect}
        value={sortBy}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        <option value="uploadDate">Upload Date</option>
        <option value="title">Title</option>
        <option value="subject">Subject</option>
        <option value="size">File Size</option>
      </select>
      <button 
        className={styles.sortOrderButton}
        onClick={() => handleSortChange(sortBy)}
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
  
  // Resource detail view
  if (selectedResource) {
    return (
      <div className={styles.resourceDetailContainer}>
        <button 
          className={styles.backButton}
          onClick={closeResourceDetail}
        >
          ← Back to Resources
        </button>
        
        <div className={styles.resourceDetailCard}>
          <div className={styles.resourceDetailHeader}>
            <div className={styles.resourceTypeIconLarge}>
              {getFileTypeIcon(selectedResource.type)}
            </div>
            <h1 className={styles.resourceDetailTitle}>{selectedResource.title}</h1>
          </div>
          
          <div className={styles.resourceDetailGrid}>
            <div className={styles.resourceDetailInfo}>
              <div className={styles.infoGroup}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Subject</span>
                  <span className={styles.infoValue}>{selectedResource.subject}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>File Type</span>
                  <span className={styles.infoValue}>{selectedResource.type.toUpperCase()}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Size</span>
                  <span className={styles.infoValue}>{selectedResource.size}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Uploaded</span>
                  <span className={styles.infoValue}>{formatDate(selectedResource.uploadDate)}</span>
                </div>
              </div>
              
              <div className={styles.resourceDescription}>
                <h3>Description</h3>
                <p>{selectedResource.description}</p>
              </div>
              
              <button 
                className={styles.downloadButton}
                onClick={(e) => handleDownload(e, selectedResource)}
              >
                Download File
              </button>
            </div>
            
            <div className={styles.resourcePreview}>
              <div className={styles.previewContainer}>
                {selectedResource.type === 'pdf' ? (
                  <div className={styles.pdfPreview}>
                    <img 
                      src={selectedResource.thumbnailUrl} 
                      alt={selectedResource.title}
                      className={styles.previewImage}
                    />
                    <div className={styles.previewOverlay}>
                      <span className={styles.previewIcon}>👁️</span>
                      <span>Preview not available</span>
                      <span>Download to view</span>
                    </div>
                  </div>
                ) : selectedResource.type === 'mp4' ? (
                  <div className={styles.videoPreview}>
                    <div className={styles.videoPlaceholder}>
                      <span className={styles.playIcon}>▶️</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.genericPreview}>
                    <div className={styles.fileIconLarge}>
                      {getFileTypeIcon(selectedResource.type)}
                    </div>
                    <div className={styles.fileTypeName}>
                      {selectedResource.type.toUpperCase()} File
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.resourcesContainer}>
      <div className={styles.resourcesHeader}>
        <h1 className={styles.resourcesTitle}>Course Resources</h1>
        <p className={styles.resourcesSubtitle}>Access and download learning materials for your courses</p>
      </div>
      
      <div className={styles.controlsSection}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search resources..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className={styles.filtersRow}>
          <div className={styles.filterGroup}>
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
            
            <select
              className={styles.filterSelect}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All File Types</option>
              {fileTypes.map((type, index) => (
                <option key={index} value={type}>{type.toUpperCase()}</option>
              ))}
            </select>
          </div>
          
          {sortControl}
        </div>
      </div>
      
      {sortedResources.length > 0 ? (
        <div className={styles.resourceGrid}>
          {sortedResources.map((resource) => (
            <div
              key={resource.id}
              className={styles.resourceCard}
              onClick={() => handleResourceSelect(resource)}
            >
              <div className={styles.resourceCardHeader}>
                <div className={styles.fileTypeIcon}>
                  {getFileTypeIcon(resource.type)}
                </div>
                <div className={styles.fileTypeBadge}>
                  {resource.type.toUpperCase()}
                </div>
              </div>
              
              <div className={styles.resourceCardBody}>
                <h3 className={styles.resourceTitle}>{resource.title}</h3>
                
                <div className={styles.resourceMeta}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaIcon}>📚</span>
                    <span className={styles.metaText}>{resource.subject}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaIcon}>📏</span>
                    <span className={styles.metaText}>{resource.size}</span>
                  </div>
                </div>
                
                <p className={styles.resourceDescription}>
                  {resource.description.length > 120
                    ? `${resource.description.substring(0, 120)}...`
                    : resource.description}
                </p>
                
                <div className={styles.resourceFooter}>
                  <span className={styles.uploadDate}>{formatDate(resource.uploadDate)}</span>
                  <button
                    className={styles.downloadButtonSmall}
                    onClick={(e) => handleDownload(e, resource)}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noResourcesMessage}>
          <div className={styles.noResourcesIcon}>📚</div>
          <h3>No resources found</h3>
          <p>Try adjusting your search criteria or check back later for new materials.</p>
        </div>
      )}
    </div>
  );
};

export default Resources; 