import React, { useState, useEffect } from 'react';
import { FaBook, FaFile, FaFileAlt, FaFileVideo, FaFileAudio, FaFileCode, FaFilePdf, FaFileArchive, FaFileImage, FaLink, FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaSort, FaEye, FaDownload, FaShare } from 'react-icons/fa';
import styles from './ResourcesComponent.module.css';

const ResourcesComponent = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResources, setFilteredResources] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('date-desc');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentResource, setCurrentResource] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'document',
    url: '',
    file: null,
    isPublic: true
  });

  // Fetch resources on component mount
  useEffect(() => {
    fetchResources();
  }, []);

  // Filter resources when search query, categories, or sort option changes
  useEffect(() => {
    filterAndSortResources();
  }, [resources, searchQuery, selectedCategories, sortOption]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      // In a real app, fetch from API
      // For now, use mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      setResources(generateMockResources());
      setError(null);
    } catch (err) {
      console.error('Error fetching resources:', err);
      setError('Failed to load resources. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateMockResources = () => {
    const mockResources = [
      {
        id: '1',
        title: 'Introduction to Algebra PDF',
        description: 'A comprehensive guide to basic algebraic concepts',
        category: 'document',
        type: 'pdf',
        url: 'https://example.com/algebra.pdf',
        size: '2.4 MB',
        dateCreated: new Date(2023, 9, 15),
        lastModified: new Date(2023, 10, 5),
        views: 124,
        downloads: 67,
        isPublic: true,
        thumbnailUrl: 'https://via.placeholder.com/100x140'
      },
      {
        id: '2',
        title: 'History Timeline Infographic',
        description: 'Visual timeline of major historical events',
        category: 'image',
        type: 'png',
        url: 'https://example.com/history-timeline.png',
        size: '4.1 MB',
        dateCreated: new Date(2023, 8, 21),
        lastModified: new Date(2023, 8, 21),
        views: 253,
        downloads: 98,
        isPublic: true,
        thumbnailUrl: 'https://via.placeholder.com/100x100'
      },
      {
        id: '3',
        title: 'Physics Lecture: Forces and Motion',
        description: 'Video lecture explaining Newton\'s laws of motion',
        category: 'video',
        type: 'mp4',
        url: 'https://example.com/physics-lecture.mp4',
        size: '156 MB',
        dateCreated: new Date(2023, 10, 2),
        lastModified: new Date(2023, 10, 3),
        views: 89,
        downloads: 34,
        isPublic: true,
        thumbnailUrl: 'https://via.placeholder.com/160x90'
      },
      {
        id: '4',
        title: 'Grammar Exercises Worksheet',
        description: 'Practice exercises for English grammar',
        category: 'document',
        type: 'docx',
        url: 'https://example.com/grammar-exercises.docx',
        size: '1.2 MB',
        dateCreated: new Date(2023, 7, 10),
        lastModified: new Date(2023, 9, 8),
        views: 167,
        downloads: 123,
        isPublic: true,
        thumbnailUrl: 'https://via.placeholder.com/100x140'
      },
      {
        id: '5',
        title: 'Chemistry Lab Safety Guidelines',
        description: 'Important safety procedures for chemistry laboratory sessions',
        category: 'document',
        type: 'pdf',
        url: 'https://example.com/chemistry-safety.pdf',
        size: '3.5 MB',
        dateCreated: new Date(2023, 5, 20),
        lastModified: new Date(2023, 6, 12),
        views: 78,
        downloads: 45,
        isPublic: false,
        thumbnailUrl: 'https://via.placeholder.com/100x140'
      },
      {
        id: '6',
        title: 'Khan Academy - Calculus Resources',
        description: 'Collection of external resources for learning calculus',
        category: 'link',
        type: 'url',
        url: 'https://www.khanacademy.org/math/calculus-1',
        dateCreated: new Date(2023, 9, 25),
        lastModified: new Date(2023, 9, 25),
        views: 56,
        downloads: 0,
        isPublic: true
      },
      {
        id: '7',
        title: 'Biology Cell Structure Quiz',
        description: 'Self-assessment quiz on cell structures and functions',
        category: 'interactive',
        type: 'quiz',
        url: 'https://example.com/cell-structure-quiz',
        dateCreated: new Date(2023, 10, 1),
        lastModified: new Date(2023, 10, 8),
        views: 112,
        downloads: 0,
        isPublic: true,
        thumbnailUrl: 'https://via.placeholder.com/120x120'
      },
      {
        id: '8',
        title: 'Literary Analysis Template',
        description: 'Template for analyzing literary texts and novels',
        category: 'document',
        type: 'docx',
        url: 'https://example.com/literary-analysis.docx',
        size: '0.8 MB',
        dateCreated: new Date(2023, 6, 15),
        lastModified: new Date(2023, 6, 15),
        views: 92,
        downloads: 76,
        isPublic: true,
        thumbnailUrl: 'https://via.placeholder.com/100x140'
      }
    ];
    
    return mockResources;
  };

  const filterAndSortResources = () => {
    let filtered = [...resources];
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) || 
        resource.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(resource => 
        selectedCategories.includes(resource.category)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'title-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'date-asc':
        filtered.sort((a, b) => a.dateCreated - b.dateCreated);
        break;
      case 'date-desc':
        filtered.sort((a, b) => b.dateCreated - a.dateCreated);
        break;
      case 'views-desc':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'downloads-desc':
        filtered.sort((a, b) => b.downloads - a.views);
        break;
      default:
        break;
    }
    
    setFilteredResources(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleAddResource = () => {
    setFormData({
      title: '',
      description: '',
      category: 'document',
      url: '',
      file: null,
      isPublic: true
    });
    setShowAddModal(true);
  };

  const handleEditResource = (resource) => {
    setCurrentResource(resource);
    setFormData({
      title: resource.title,
      description: resource.description,
      category: resource.category,
      url: resource.url,
      file: null,
      isPublic: resource.isPublic
    });
    setShowEditModal(true);
  };

  const handleDeleteResource = (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      // In a real app, send delete request to API
      setResources(prev => prev.filter(resource => resource.id !== id));
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        file: files[0]
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    if (formData.category !== 'link' && !formData.file && !formData.url) {
      alert('Please provide either a URL or upload a file');
      return;
    }
    
    // In a real app, send data to API
    const newResource = {
      id: currentResource ? currentResource.id : `${Date.now()}`,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      type: formData.file ? formData.file.type.split('/')[1] : 'url',
      url: formData.url || `https://example.com/${formData.title.toLowerCase().replace(/\s+/g, '-')}`,
      size: formData.file ? `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB` : null,
      dateCreated: currentResource ? currentResource.dateCreated : new Date(),
      lastModified: new Date(),
      views: currentResource ? currentResource.views : 0,
      downloads: currentResource ? currentResource.downloads : 0,
      isPublic: formData.isPublic,
      thumbnailUrl: 'https://via.placeholder.com/100x140'
    };
    
    if (currentResource) {
      // Update existing resource
      setResources(prev => prev.map(res => 
        res.id === currentResource.id ? newResource : res
      ));
      setShowEditModal(false);
    } else {
      // Add new resource
      setResources(prev => [newResource, ...prev]);
      setShowAddModal(false);
    }
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: 'document',
      url: '',
      file: null,
      isPublic: true
    });
    setCurrentResource(null);
  };

  const getResourceIcon = (resource) => {
    switch (resource.category) {
      case 'document':
        if (resource.type === 'pdf') return <FaFilePdf />;
        return <FaFileAlt />;
      case 'video':
        return <FaFileVideo />;
      case 'audio':
        return <FaFileAudio />;
      case 'image':
        return <FaFileImage />;
      case 'code':
        return <FaFileCode />;
      case 'archive':
        return <FaFileArchive />;
      case 'link':
        return <FaLink />;
      case 'interactive':
        return <FaBook />;
      default:
        return <FaFile />;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading resources...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button className={styles.retryButton} onClick={fetchResources}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1>Teaching Resources</h1>
          <p className={styles.subheader}>Manage and share educational materials with your students</p>
        </div>
        
        <button className={styles.addButton} onClick={handleAddResource}>
          <FaPlus /> Add Resource
        </button>
      </div>
      
      <div className={styles.toolbarContainer}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filterContainer}>
          <label className={styles.filterLabel}>
            <FaFilter /> Filter:
          </label>
          <div className={styles.categoryFilters}>
            <button
              className={`${styles.categoryButton} ${selectedCategories.includes('document') ? styles.active : ''}`}
              onClick={() => handleCategoryToggle('document')}
            >
              <FaFileAlt /> Documents
            </button>
            <button
              className={`${styles.categoryButton} ${selectedCategories.includes('video') ? styles.active : ''}`}
              onClick={() => handleCategoryToggle('video')}
            >
              <FaFileVideo /> Videos
            </button>
            <button
              className={`${styles.categoryButton} ${selectedCategories.includes('image') ? styles.active : ''}`}
              onClick={() => handleCategoryToggle('image')}
            >
              <FaFileImage /> Images
            </button>
            <button
              className={`${styles.categoryButton} ${selectedCategories.includes('link') ? styles.active : ''}`}
              onClick={() => handleCategoryToggle('link')}
            >
              <FaLink /> Links
            </button>
            <button
              className={`${styles.categoryButton} ${selectedCategories.includes('interactive') ? styles.active : ''}`}
              onClick={() => handleCategoryToggle('interactive')}
            >
              <FaBook /> Interactive
            </button>
          </div>
        </div>
        
        <div className={styles.sortContainer}>
          <label className={styles.sortLabel}>
            <FaSort /> Sort:
          </label>
          <select
            className={styles.sortSelect}
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="views-desc">Most Viewed</option>
            <option value="downloads-desc">Most Downloaded</option>
          </select>
        </div>
      </div>
      
      {filteredResources.length === 0 ? (
        <div className={styles.emptyState}>
          <FaFile className={styles.emptyIcon} />
          <h3>No resources found</h3>
          <p>
            {resources.length === 0
              ? 'Get started by adding your first teaching resource'
              : 'Try adjusting your search filters'}
          </p>
          {resources.length === 0 && (
            <button className={styles.addEmptyButton} onClick={handleAddResource}>
              <FaPlus /> Add Resource
            </button>
          )}
        </div>
      ) : (
        <div className={styles.resourcesList}>
          {filteredResources.map(resource => (
            <div key={resource.id} className={styles.resourceCard}>
              <div className={styles.resourceThumbnail}>
                {resource.thumbnailUrl ? (
                  <img src={resource.thumbnailUrl} alt={resource.title} />
                ) : (
                  <div className={styles.iconPlaceholder}>
                    {getResourceIcon(resource)}
                  </div>
                )}
              </div>
              
              <div className={styles.resourceInfo}>
                <h3 className={styles.resourceTitle}>{resource.title}</h3>
                <p className={styles.resourceDescription}>{resource.description}</p>
                
                <div className={styles.resourceMeta}>
                  <span className={styles.resourceType}>
                    {getResourceIcon(resource)} {resource.type?.toUpperCase()}
                  </span>
                  {resource.size && (
                    <span className={styles.resourceSize}>{resource.size}</span>
                  )}
                  <span className={styles.resourceDate}>
                    Added: {formatDate(resource.dateCreated)}
                  </span>
                </div>
                
                <div className={styles.resourceStats}>
                  <span className={styles.views}>
                    <FaEye /> {resource.views} views
                  </span>
                  {resource.downloads > 0 && (
                    <span className={styles.downloads}>
                      <FaDownload /> {resource.downloads} downloads
                    </span>
                  )}
                  <span className={`${styles.visibility} ${resource.isPublic ? styles.public : styles.private}`}>
                    {resource.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
              </div>
              
              <div className={styles.resourceActions}>
                <a 
                  href={resource.url} 
                  className={styles.viewButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaEye />
                </a>
                
                {resource.category !== 'link' && (
                  <a 
                    href={resource.url} 
                    className={styles.downloadButton}
                    download
                  >
                    <FaDownload />
                  </a>
                )}
                
                <button
                  className={styles.shareButton}
                  onClick={() => alert(`Share URL: ${resource.url}`)}
                >
                  <FaShare />
                </button>
                
                <button
                  className={styles.editButton}
                  onClick={() => handleEditResource(resource)}
                >
                  <FaEdit />
                </button>
                
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteResource(resource.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {(showAddModal || showEditModal) && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{showAddModal ? 'Add New Resource' : 'Edit Resource'}</h2>
              <button 
                className={styles.closeButton}
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                }}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className={styles.resourceForm}>
              <div className={styles.formGroup}>
                <label htmlFor="title">Title*</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows="3"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="category">Resource Type*</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  required
                >
                  <option value="document">Document</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                  <option value="image">Image</option>
                  <option value="link">External Link</option>
                  <option value="interactive">Interactive</option>
                  <option value="code">Code</option>
                  <option value="archive">Archive</option>
                </select>
              </div>
              
              {formData.category === 'link' ? (
                <div className={styles.formGroup}>
                  <label htmlFor="url">URL*</label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleFormChange}
                    placeholder="https://example.com"
                    required
                  />
                </div>
              ) : (
                <>
                  <div className={styles.formGroup}>
                    <label htmlFor="file">Upload File</label>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleFormChange}
                    />
                    <small>OR</small>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="url">Resource URL</label>
                    <input
                      type="url"
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleFormChange}
                      placeholder="https://example.com/resource.pdf"
                    />
                  </div>
                </>
              )}
              
              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleFormChange}
                  />
                  Make this resource visible to students
                </label>
              </div>
              
              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton}>
                  {showAddModal ? 'Add Resource' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesComponent;