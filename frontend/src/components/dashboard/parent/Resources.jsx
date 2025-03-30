import React, { useState, useEffect } from 'react';
import { FiDownload, FiFolder, FiFile, FiLink, FiBookOpen, FiSearch, FiFilter, FiGrid, FiList, FiChevronDown, FiAlertCircle, FiVideo, FiExternalLink } from 'react-icons/fi';
import styles from './Resources.module.css';

const Resources = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedResource, setSelectedResource] = useState(null);
  const [showResourceDetail, setShowResourceDetail] = useState(false);

  // Mock resource data with Kenyan educational context
  const mockResources = [
    {
      id: 'RES001',
      title: '8-4-4 Mathematics Revision Guide',
      description: 'Comprehensive revision guide for 8-4-4 mathematics curriculum covering all key topics for KCPE preparation.',
      category: 'curriculum',
      grade: 'grade7-8',
      type: 'pdf',
      fileSize: '2.4 MB',
      thumbnail: 'https://ui-avatars.com/api/?name=Math+Guide&background=FF5722&color=fff',
      downloadUrl: '#',
      dateAdded: '2023-08-15',
      author: 'Kenya Institute of Curriculum Development',
      keyTopics: ['Algebra', 'Geometry', 'Fractions', 'Percentages', 'Statistics'],
      isFeatured: true
    },
    {
      id: 'RES002',
      title: 'Kiswahili Language Practice Worksheets',
      description: 'A collection of worksheets for practicing Kiswahili grammar, vocabulary, and reading comprehension.',
      category: 'worksheet',
      grade: 'grade4-6',
      type: 'pdf',
      fileSize: '1.8 MB',
      thumbnail: 'https://ui-avatars.com/api/?name=Kiswahili&background=4CAF50&color=fff',
      downloadUrl: '#',
      dateAdded: '2023-09-02',
      author: 'Elimu-Tuts Faculty',
      keyTopics: ['Sarufi', 'Vitendawili', 'Methali', 'Insha', 'Ufahamu'],
      isFeatured: false
    },
    {
      id: 'RES003',
      title: 'CBC Science Experiment Videos',
      description: 'Video collection demonstrating common CBC science experiments using materials available at home.',
      category: 'video',
      grade: 'grade4-6',
      type: 'video',
      fileSize: 'Stream',
      thumbnail: 'https://ui-avatars.com/api/?name=Science+Videos&background=2196F3&color=fff',
      downloadUrl: '#',
      dateAdded: '2023-07-28',
      author: 'Dr. Otieno, Science Education Specialist',
      keyTopics: ['Simple Machines', 'Electricity', 'Plants', 'Weather', 'Ecology'],
      isFeatured: true,
      videoUrl: 'https://www.youtube.com/watch?v=example'
    },
    {
      id: 'RES004',
      title: 'Kenyan History Digital Timeline',
      description: 'Interactive timeline of Kenyan history from pre-colonial times to present day, with key events and figures.',
      category: 'interactive',
      grade: 'grade7-8',
      type: 'html',
      fileSize: 'Online',
      thumbnail: 'https://ui-avatars.com/api/?name=Kenya+History&background=9C27B0&color=fff',
      downloadUrl: '#',
      dateAdded: '2023-06-14',
      author: 'Kenya Historical Society',
      keyTopics: ['Pre-Colonial Kenya', 'Colonization', 'Independence', 'Modern Kenya'],
      isFeatured: false,
      linkUrl: 'https://example.com/kenya-timeline'
    },
    {
      id: 'RES005',
      title: 'CBC Parent\'s Guide to Assessment',
      description: 'Comprehensive guide for parents on understanding the CBC competency-based assessment approach.',
      category: 'guide',
      grade: 'all',
      type: 'pdf',
      fileSize: '3.2 MB',
      thumbnail: 'https://ui-avatars.com/api/?name=CBC+Guide&background=FFC107&color=fff',
      downloadUrl: '#',
      dateAdded: '2023-09-20',
      author: 'Ministry of Education',
      keyTopics: ['Formative Assessment', 'Projects', 'Portfolios', 'Skills Assessment'],
      isFeatured: true
    },
    {
      id: 'RES006',
      title: 'CBC English Language Arts Activities',
      description: 'Creative activities to support English language arts learning at home, aligned with CBC curriculum.',
      category: 'activity',
      grade: 'grade1-3',
      type: 'pdf',
      fileSize: '1.5 MB',
      thumbnail: 'https://ui-avatars.com/api/?name=English+Activities&background=E91E63&color=fff',
      downloadUrl: '#',
      dateAdded: '2023-08-30',
      author: 'Elimu-Tuts Faculty',
      keyTopics: ['Reading', 'Writing', 'Speaking', 'Listening', 'Comprehension'],
      isFeatured: false
    },
    {
      id: 'RES007',
      title: 'Digital Mathematics Games Collection',
      description: 'Collection of digital math games to reinforce learning through play, aligned with both CBC and 8-4-4 curricula.',
      category: 'interactive',
      grade: 'grade4-6',
      type: 'html',
      fileSize: 'Online',
      thumbnail: 'https://ui-avatars.com/api/?name=Math+Games&background=3F51B5&color=fff',
      downloadUrl: '#',
      dateAdded: '2023-07-05',
      author: 'Kenyan Math Teachers Association',
      keyTopics: ['Number Sense', 'Operations', 'Problem Solving', 'Geometry'],
      isFeatured: true,
      linkUrl: 'https://example.com/math-games'
    },
    {
      id: 'RES008',
      title: 'Preparing for National Examinations',
      description: 'Guide for parents on how to support children preparing for KCPE and KCSE exams.',
      category: 'guide',
      grade: 'grade7-8',
      type: 'pdf',
      fileSize: '2.1 MB',
      thumbnail: 'https://ui-avatars.com/api/?name=Exam+Prep&background=795548&color=fff',
      downloadUrl: '#',
      dateAdded: '2023-05-25',
      author: 'Kenya National Examinations Council',
      keyTopics: ['Study Skills', 'Exam Strategies', 'Mental Health', 'Revision Techniques'],
      isFeatured: false
    },
    {
      id: 'RES009',
      title: 'Traditional Kenyan Games for Learning',
      description: 'Guide to traditional Kenyan games that can be used to reinforce curriculum concepts and cultural heritage.',
      category: 'activity',
      grade: 'all',
      type: 'pdf',
      fileSize: '3.7 MB',
      thumbnail: 'https://ui-avatars.com/api/?name=Kenyan+Games&background=009688&color=fff',
      downloadUrl: '#',
      dateAdded: '2023-04-18',
      author: 'Cultural Heritage Foundation of Kenya',
      keyTopics: ['Physical Skills', 'Strategy', 'Cooperation', 'Cultural Knowledge'],
      isFeatured: true
    },
    {
      id: 'RES010',
      title: 'CBC Term 2 Home Science Projects',
      description: 'Practical home science projects for CBC learners that can be completed with materials available at home.',
      category: 'project',
      grade: 'grade4-6',
      type: 'pdf',
      fileSize: '1.9 MB',
      thumbnail: 'https://ui-avatars.com/api/?name=Home+Science&background=8BC34A&color=fff',
      downloadUrl: '#',
      dateAdded: '2023-09-08',
      author: 'Elimu-Tuts Home Science Department',
      keyTopics: ['Nutrition', 'Crafts', 'Hygiene', 'Consumer Education'],
      isFeatured: false
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'curriculum', name: 'Curriculum Guides' },
    { id: 'worksheet', name: 'Worksheets' },
    { id: 'video', name: 'Videos' },
    { id: 'interactive', name: 'Interactive Resources' },
    { id: 'guide', name: 'Parent Guides' },
    { id: 'activity', name: 'Activities' },
    { id: 'project', name: 'Projects' }
  ];

  // Grade levels for filtering
  const grades = [
    { id: 'all', name: 'All Grades' },
    { id: 'grade1-3', name: 'Grade 1-3 (CBC)' },
    { id: 'grade4-6', name: 'Grade 4-6 (CBC)' },
    { id: 'grade7-8', name: 'Grade 7-8 (CBC/8-4-4)' },
    { id: 'secondary', name: 'Secondary School' }
  ];

  // Initialize data on component mount
  useEffect(() => {
    setLoading(true);
    try {
      // Set resources data from mock
      setResources(mockResources);
    } catch (err) {
      console.error('Error initializing resources data:', err);
      setError('Failed to load resources. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle category filter change
  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  // Handle grade filter change
  const handleGradeFilterChange = (e) => {
    setGradeFilter(e.target.value);
  };

  // Toggle view mode between grid and list
  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  // Open resource detail modal
  const openResourceDetail = (resource) => {
    setSelectedResource(resource);
    setShowResourceDetail(true);
  };

  // Close resource detail modal
  const closeResourceDetail = () => {
    setShowResourceDetail(false);
  };

  // Format date to DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-KE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Get icon based on resource type
  const getResourceIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FiFile />;
      case 'video':
        return <FiVideo />;
      case 'html':
        return <FiExternalLink />;
      default:
        return <FiBookOpen />;
    }
  };

  // Filter resources based on search query and filters
  const getFilteredResources = () => {
    return resources.filter(resource => {
      // Filter by search query
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.keyTopics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filter by category
      const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;

      // Filter by grade
      const matchesGrade = gradeFilter === 'all' || resource.grade === gradeFilter || resource.grade === 'all';

      return matchesSearch && matchesCategory && matchesGrade;
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading educational resources...</p>
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
    <div className={styles.resourcesContainer}>
      <div className={styles.resourcesHeader}>
        <h2>Educational Resources</h2>
        <p>Access curriculum guides, worksheets, videos, and activities to support your child's learning</p>
      </div>
      
      {/* Featured Resources */}
      {resources.some(resource => resource.isFeatured) && (
        <div className={styles.featuredSection}>
          <h3>Featured Resources</h3>
          <div className={styles.featuredGrid}>
            {resources
              .filter(resource => resource.isFeatured)
              .map(resource => (
                <div 
                  key={resource.id} 
                  className={styles.featuredCard}
                  onClick={() => openResourceDetail(resource)}
                >
                  <div className={styles.featuredThumbnail}>
                    <img src={resource.thumbnail} alt={resource.title} />
                    <div className={styles.resourceType}>
                      {getResourceIcon(resource.type)}
                      <span>{resource.type.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className={styles.featuredContent}>
                    <h4>{resource.title}</h4>
                    <p>{resource.description}</p>
                    <div className={styles.featuredMeta}>
                      <span>{resource.author}</span>
                      <span>{formatDate(resource.dateAdded)}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      
      {/* Search and Filters */}
      <div className={styles.filtersContainer}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label htmlFor="category-filter">Category:</label>
            <select 
              id="category-filter" 
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div className={styles.filterGroup}>
            <label htmlFor="grade-filter">Grade Level:</label>
            <select 
              id="grade-filter"
              value={gradeFilter}
              onChange={handleGradeFilterChange}
            >
              {grades.map(grade => (
                <option key={grade.id} value={grade.id}>{grade.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className={styles.viewToggle}>
          <button 
            className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => toggleViewMode('grid')}
          >
            <FiGrid />
          </button>
          <button 
            className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => toggleViewMode('list')}
          >
            <FiList />
          </button>
        </div>
      </div>
      
      {/* Resources List */}
      <div className={viewMode === 'grid' ? styles.resourcesGrid : styles.resourcesList}>
        {getFilteredResources().length === 0 ? (
          <div className={styles.noResources}>
            <h3>No resources found</h3>
            <p>Try adjusting your filters or search term</p>
          </div>
        ) : (
          getFilteredResources().map(resource => (
            <div 
              key={resource.id} 
              className={viewMode === 'grid' ? styles.resourceCard : styles.resourceRow}
              onClick={() => openResourceDetail(resource)}
            >
              {viewMode === 'grid' ? (
                // Grid View
                <>
                  <div className={styles.resourceThumbnail}>
                    <img src={resource.thumbnail} alt={resource.title} />
                    <div className={styles.resourceType}>
                      {getResourceIcon(resource.type)}
                      <span>{resource.type.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className={styles.resourceContent}>
                    <h4>{resource.title}</h4>
                    <p className={styles.resourceDescription}>{resource.description}</p>
                    <div className={styles.resourceMeta}>
                      <span className={styles.resourceCategory}>
                        {categories.find(cat => cat.id === resource.category)?.name}
                      </span>
                      <span className={styles.resourceGrade}>
                        {grades.find(grade => grade.id === resource.grade)?.name}
                      </span>
                    </div>
                    <div className={styles.resourceFooter}>
                      <span className={styles.resourceDate}>{formatDate(resource.dateAdded)}</span>
                      <span className={styles.resourceSize}>{resource.fileSize}</span>
                    </div>
                  </div>
                </>
              ) : (
                // List View
                <>
                  <div className={styles.resourceListIcon}>
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className={styles.resourceListContent}>
                    <h4>{resource.title}</h4>
                    <p>{resource.description}</p>
                  </div>
                  <div className={styles.resourceListCategory}>
                    {categories.find(cat => cat.id === resource.category)?.name}
                  </div>
                  <div className={styles.resourceListGrade}>
                    {grades.find(grade => grade.id === resource.grade)?.name}
                  </div>
                  <div className={styles.resourceListDate}>
                    {formatDate(resource.dateAdded)}
                  </div>
                  <div className={styles.resourceListSize}>
                    {resource.fileSize}
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Resource Detail Modal */}
      {showResourceDetail && selectedResource && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{selectedResource.title}</h2>
              <button 
                className={styles.closeButton}
                onClick={closeResourceDetail}
              >
                &times;
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.resourceDetailHeader}>
                <div className={styles.resourceDetailThumbnail}>
                  <img src={selectedResource.thumbnail} alt={selectedResource.title} />
                </div>
                <div className={styles.resourceDetailInfo}>
                  <div className={styles.resourceDetailMeta}>
                    <span className={styles.resourceDetailType}>
                      {getResourceIcon(selectedResource.type)}
                      {selectedResource.type.toUpperCase()}
                    </span>
                    <span className={styles.resourceDetailSize}>
                      Size: {selectedResource.fileSize}
                    </span>
                    <span className={styles.resourceDetailDate}>
                      Added: {formatDate(selectedResource.dateAdded)}
                    </span>
                  </div>
                  <div className={styles.resourceDetailCategory}>
                    <strong>Category:</strong> {categories.find(cat => cat.id === selectedResource.category)?.name}
                  </div>
                  <div className={styles.resourceDetailGrade}>
                    <strong>Grade Level:</strong> {grades.find(grade => grade.id === selectedResource.grade)?.name}
                  </div>
                  <div className={styles.resourceDetailAuthor}>
                    <strong>Author:</strong> {selectedResource.author}
                  </div>
                </div>
              </div>
              
              <div className={styles.resourceDetailSection}>
                <h3>Description</h3>
                <p>{selectedResource.description}</p>
              </div>
              
              <div className={styles.resourceDetailSection}>
                <h3>Key Topics</h3>
                <div className={styles.topicsList}>
                  {selectedResource.keyTopics.map((topic, index) => (
                    <span key={index} className={styles.topicTag}>
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className={styles.resourceDetailActions}>
                {selectedResource.type === 'pdf' && (
                  <>
                    <a 
                      href={selectedResource.downloadUrl} 
                      className={styles.downloadButton}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiDownload /> Download Resource
                    </a>
                    <a 
                      href={selectedResource.downloadUrl} 
                      className={styles.previewButton}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiBookOpen /> Preview
                    </a>
                  </>
                )}
                
                {selectedResource.type === 'video' && (
                  <a 
                    href={selectedResource.videoUrl} 
                    className={styles.watchButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiVideo /> Watch Video
                  </a>
                )}
                
                {selectedResource.type === 'html' && (
                  <a 
                    href={selectedResource.linkUrl} 
                    className={styles.openButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiExternalLink /> Open Resource
                  </a>
                )}
              </div>
              
              <div className={styles.resourceDetailSection}>
                <h3>Share This Resource</h3>
                <div className={styles.shareOptions}>
                  <button className={styles.shareButton}>
                    <FiLink /> Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources; 