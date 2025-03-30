import React, { useState } from 'react';
import styles from './CBCResources.module.css';

// Sample data for CBC resources
const CBC_RESOURCES = [
  {
    id: 'cbc-001',
    title: 'Environmental Conservation Project',
    subject: 'Science',
    grade: '7',
    strand: 'Environmental Studies',
    category: 'project',
    difficulty: 'medium',
    duration: '2 weeks',
    description: 'Design and implement a home-based recycling system to reduce waste and conserve the environment. Document the process and measure the impact on household waste reduction.',
    learningOutcomes: [
      'Understand principles of waste management',
      'Develop skills in recycling and composting',
      'Analyze environmental impact of waste reduction',
      'Create sustainable solutions for everyday challenges'
    ],
    materials: [
      'Recycling containers',
      'Record keeping materials',
      'Camera for documentation',
      'Basic measuring tools'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3'
  },
  {
    id: 'cbc-002',
    title: 'Cultural Heritage Documentation',
    subject: 'Social Studies',
    grade: '6',
    strand: 'Heritage and Culture',
    category: 'project',
    difficulty: 'medium',
    duration: '3 weeks',
    description: 'Research and document aspects of local cultural heritage through interviews with community elders. Present findings in a creative format such as a digital story, photo essay, or video documentary.',
    learningOutcomes: [
      'Develop research and interview skills',
      'Appreciate cultural diversity and heritage',
      'Enhance digital documentation competencies',
      'Strengthen intergenerational connections'
    ],
    materials: [
      'Recording device for interviews',
      'Digital camera',
      'Art supplies for presentation',
      'Computer for digital presentations'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544985361-b420d7a77785?ixlib=rb-4.0.3'
  },
  {
    id: 'cbc-003',
    title: 'Financial Literacy Challenge',
    subject: 'Mathematics',
    grade: '8',
    strand: 'Financial Education',
    category: 'activity',
    difficulty: 'easy',
    duration: '1 week',
    description: 'Create a personal budget plan and track expenses for one week. Identify spending patterns, savings opportunities, and develop financial goals based on the analysis.',
    learningOutcomes: [
      'Apply mathematical concepts in real-life contexts',
      'Develop basic financial planning skills',
      'Analyze data and identify patterns',
      'Make informed financial decisions'
    ],
    materials: [
      'Budget templates',
      'Calculator',
      'Expense tracking sheets',
      'Graph paper for visual representations'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3'
  },
  {
    id: 'cbc-004',
    title: 'Digital Storytelling Workshop',
    subject: 'Language Arts',
    grade: '5',
    strand: 'Communication Skills',
    category: 'activity',
    difficulty: 'easy',
    duration: '3 days',
    description: 'Create a digital story incorporating text, images, and audio elements. Focus on a personal experience or imagined narrative that communicates a clear message to the audience.',
    learningOutcomes: [
      'Enhance narrative structure and storytelling ability',
      'Develop digital communication skills',
      'Build creative expression capabilities',
      'Practice effective audience engagement'
    ],
    materials: [
      'Digital device with internet access',
      'Storytelling templates',
      'Audio recording tools',
      'Image editing software'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3'
  },
  {
    id: 'cbc-005',
    title: 'Agricultural Innovation Project',
    subject: 'Agriculture',
    grade: '7',
    strand: 'Sustainable Farming',
    category: 'project',
    difficulty: 'hard',
    duration: '4 weeks',
    description: 'Design and implement a small-scale agricultural innovation such as a vertical garden, hydroponics system, or companion planting experiment. Document growth, challenges, and outcomes.',
    learningOutcomes: [
      'Apply scientific method to agricultural problems',
      'Develop sustainable farming practices',
      'Build project management skills',
      'Analyze factors affecting plant growth'
    ],
    materials: [
      'Gardening supplies',
      'Seeds or seedlings',
      'Documentation journal',
      'Measuring tools'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3'
  },
  {
    id: 'cbc-006',
    title: 'Simple Machines Engineering Challenge',
    subject: 'Science',
    grade: '6',
    strand: 'Physical Science',
    category: 'activity',
    difficulty: 'medium',
    duration: '1 week',
    description: 'Design and build a Rube Goldberg machine using at least three simple machines that accomplishes a simple task. Document the physics principles applied in the design.',
    learningOutcomes: [
      'Understand basic physics principles',
      'Apply engineering design process',
      'Develop problem-solving skills',
      'Build creative thinking capabilities'
    ],
    materials: [
      'Household items for machine construction',
      'Basic tools',
      'Drawing materials for planning',
      'Camera for documentation'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1615828027904-becfc417e9d9?ixlib=rb-4.0.3'
  },
  {
    id: 'cbc-007',
    title: 'Community Health Survey',
    subject: 'Health Science',
    grade: '8',
    strand: 'Public Health',
    category: 'project',
    difficulty: 'medium',
    duration: '2 weeks',
    description: 'Design and conduct a health survey in your community focusing on nutrition, exercise, or wellness practices. Analyze results and create an informative presentation with recommendations.',
    learningOutcomes: [
      'Develop research methodology skills',
      'Apply statistical analysis to data',
      'Understand community health factors',
      'Create evidence-based recommendations'
    ],
    materials: [
      'Survey design templates',
      'Data collection tools',
      'Analysis software or spreadsheets',
      'Presentation materials'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3'
  },
  {
    id: 'cbc-008',
    title: 'Entrepreneurship Challenge',
    subject: 'Business Studies',
    grade: '7',
    strand: 'Enterprise Skills',
    category: 'project',
    difficulty: 'hard',
    duration: '3 weeks',
    description: 'Develop a business plan for a micro-enterprise that addresses a community need. Create a prototype product or service description, marketing strategy, and basic financial projections.',
    learningOutcomes: [
      'Understand business plan fundamentals',
      'Develop market research skills',
      'Apply financial literacy concepts',
      'Build entrepreneurial mindset'
    ],
    materials: [
      'Business plan templates',
      'Market research tools',
      'Basic financial planning resources',
      'Materials for prototype development'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3'
  },
  {
    id: 'cbc-009',
    title: 'Digital Art Portfolio',
    subject: 'Art',
    grade: '6',
    strand: 'Creative Arts',
    category: 'activity',
    difficulty: 'easy',
    duration: '2 weeks',
    description: 'Create a digital art portfolio showcasing a variety of techniques such as digital drawing, photo manipulation, and graphic design. Include artist statements explaining creative choices.',
    learningOutcomes: [
      'Develop digital art skills across mediums',
      'Build portfolio development capabilities',
      'Enhance critical reflection on creative work',
      'Apply principles of design in digital contexts'
    ],
    materials: [
      'Digital device with art software',
      'Digital drawing tools or tablet (if available)',
      'Template for portfolio organization',
      'Reference materials for techniques'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1629196914168-38fd451c25d6?ixlib=rb-4.0.3'
  },
  {
    id: 'cbc-010',
    title: 'Personal Wellness Plan',
    subject: 'Physical Education',
    grade: '8',
    strand: 'Health & Fitness',
    category: 'activity',
    difficulty: 'easy',
    duration: '1 week',
    description: 'Design and implement a personalized wellness plan including physical activities, nutrition goals, and mental wellness practices. Track progress and reflect on outcomes.',
    learningOutcomes: [
      'Develop self-management skills',
      'Apply health knowledge to personal practices',
      'Build goal-setting and monitoring abilities',
      'Understand holistic wellness principles'
    ],
    materials: [
      'Wellness plan templates',
      'Activity tracking tools',
      'Nutrition guides',
      'Reflection journal'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?ixlib=rb-4.0.3'
  },
  {
    id: 'cbc-011',
    title: 'Design Thinking Challenge',
    subject: 'Integrated Studies',
    grade: '7',
    strand: 'Problem-Solving',
    category: 'project',
    difficulty: 'medium',
    duration: '2 weeks',
    description: 'Apply the design thinking process to identify and solve a problem in your school or community. Document all five stages: empathize, define, ideate, prototype, and test.',
    learningOutcomes: [
      'Develop human-centered design skills',
      'Apply structured problem-solving approach',
      'Build empathy and user research abilities',
      'Create and test practical solutions'
    ],
    materials: [
      'Design thinking workbook',
      'Interview and observation templates',
      'Prototyping materials',
      'Documentation tools'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3'
  },
  {
    id: 'cbc-012',
    title: 'Renewable Energy Model',
    subject: 'Science',
    grade: '8',
    strand: 'Energy & Technology',
    category: 'project',
    difficulty: 'hard',
    duration: '3 weeks',
    description: 'Research and build a working model of a renewable energy system such as solar, wind, or hydro power. Measure and analyze energy output and efficiency factors.',
    learningOutcomes: [
      'Understand renewable energy principles',
      'Apply engineering and design skills',
      'Develop data collection and analysis methods',
      'Evaluate sustainable energy solutions'
    ],
    materials: [
      'Renewable energy kit components',
      'Measurement tools',
      'Data recording equipment',
      'Construction materials'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3'
  }
];

// Curriculum guides for reference
const CURRICULUM_GUIDES = [
  {
    id: 'guide-001',
    title: 'CBC Implementation Guide Grade 5-7',
    subject: 'Curriculum Guide',
    grade: '5-7',
    description: 'Official guide on implementing the Competency-Based Curriculum for upper primary level, including teaching strategies, assessment methods, and integration approaches.',
    downloadUrl: '#',
  },
  {
    id: 'guide-002',
    title: 'CBC Assessment Framework 2023',
    subject: 'Assessment',
    grade: 'All',
    description: 'Updated framework for competency-based assessment, including formative and summative approaches, portfolio development, and project evaluation rubrics.',
    downloadUrl: '#',
  },
  {
    id: 'guide-003',
    title: 'CBC Core Competencies Framework',
    subject: 'Curriculum Guide',
    grade: 'All',
    description: 'Comprehensive guide to the seven core competencies in the CBC framework and how they are developed across different learning areas and grade levels.',
    downloadUrl: '#',
  },
  {
    id: 'guide-004',
    title: 'Digital Integration in CBC Learning',
    subject: 'Technology',
    grade: 'All',
    description: 'Guidelines for integrating digital tools and resources into CBC learning activities, with practical examples and implementation strategies.',
    downloadUrl: '#',
  }
];

const CBCResources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);
  const [activeTab, setActiveTab] = useState('projects');
  
  // Get unique subjects, grades, categories and difficulties
  const subjects = ['All', ...new Set(CBC_RESOURCES.map(resource => resource.subject))];
  const grades = ['All', ...new Set(CBC_RESOURCES.map(resource => resource.grade))];
  const categories = ['All', ...new Set(CBC_RESOURCES.map(resource => resource.category))];
  const difficulties = ['All', ...new Set(CBC_RESOURCES.map(resource => resource.difficulty))];
  
  // Filter resources based on search and filters
  const filteredResources = CBC_RESOURCES.filter(resource => {
    // Filter by search query
    if (searchQuery && 
        !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !resource.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by subject
    if (selectedSubject && selectedSubject !== 'All' && resource.subject !== selectedSubject) {
      return false;
    }
    
    // Filter by grade
    if (selectedGrade && selectedGrade !== 'All' && resource.grade !== selectedGrade) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory && selectedCategory !== 'All' && resource.category !== selectedCategory) {
      return false;
    }
    
    // Filter by difficulty
    if (selectedDifficulty && selectedDifficulty !== 'All' && resource.difficulty !== selectedDifficulty) {
      return false;
    }
    
    return true;
  });
  
  // Handle resource selection
  const handleResourceSelect = (resource) => {
    setSelectedResource(resource);
  };
  
  // Close resource detail view
  const closeResourceDetail = () => {
    setSelectedResource(null);
  };
  
  // Get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'var(--success-color, #4caf50)';
      case 'medium': return 'var(--warning-color, #ff9800)';
      case 'hard': return 'var(--danger-color, #f44336)';
      default: return 'var(--primary-color, #4a6fe9)';
    }
  };
  
  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'project': return '📋';
      case 'activity': return '🔍';
      default: return '📚';
    }
  };
  
  // Format text for display
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Render resource detail view
  const renderResourceDetail = () => {
    const resource = selectedResource;
    
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
            <div className={styles.resourceHeaderContent}>
              <h1 className={styles.resourceDetailTitle}>{resource.title}</h1>
              <div className={styles.resourceDetailMeta}>
                <span className={styles.resourceSubject}>{resource.subject}</span>
                <span className={styles.resourceGrade}>Grade {resource.grade}</span>
                <span className={styles.resourceStrand}>{resource.strand}</span>
                <span 
                  className={styles.resourceDifficulty}
                  style={{ backgroundColor: getDifficultyColor(resource.difficulty) }}
                >
                  {capitalizeFirstLetter(resource.difficulty)}
                </span>
                <span className={styles.resourceCategory}>
                  {getCategoryIcon(resource.category)} {capitalizeFirstLetter(resource.category)}
                </span>
                <span className={styles.resourceDuration}>{resource.duration}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.resourceDetailBody}>
            <div className={styles.resourceImageContainer}>
              <img 
                src={resource.imageUrl} 
                alt={resource.title} 
                className={styles.resourceDetailImage}
              />
            </div>
            
            <div className={styles.resourceSections}>
              <section className={styles.resourceSection}>
                <h2 className={styles.sectionTitle}>Description</h2>
                <p className={styles.resourceDescription}>{resource.description}</p>
              </section>
              
              <section className={styles.resourceSection}>
                <h2 className={styles.sectionTitle}>Learning Outcomes</h2>
                <ul className={styles.outcomesList}>
                  {resource.learningOutcomes.map((outcome, index) => (
                    <li key={index} className={styles.outcomeItem}>{outcome}</li>
                  ))}
                </ul>
              </section>
              
              <section className={styles.resourceSection}>
                <h2 className={styles.sectionTitle}>Materials Needed</h2>
                <ul className={styles.materialsList}>
                  {resource.materials.map((material, index) => (
                    <li key={index} className={styles.materialItem}>{material}</li>
                  ))}
                </ul>
              </section>
              
              <section className={styles.resourceSection}>
                <h2 className={styles.sectionTitle}>Getting Started</h2>
                <div className={styles.startGuide}>
                  <div className={styles.startStep}>
                    <div className={styles.stepNumber}>1</div>
                    <div className={styles.stepContent}>
                      <h3>Review the Resource</h3>
                      <p>Read through all instructions and gather necessary materials</p>
                    </div>
                  </div>
                  <div className={styles.startStep}>
                    <div className={styles.stepNumber}>2</div>
                    <div className={styles.stepContent}>
                      <h3>Plan Your Approach</h3>
                      <p>Create a timeline and break down the project into manageable tasks</p>
                    </div>
                  </div>
                  <div className={styles.startStep}>
                    <div className={styles.stepNumber}>3</div>
                    <div className={styles.stepContent}>
                      <h3>Document Your Work</h3>
                      <p>Keep records of your process, challenges, and successes</p>
                    </div>
                  </div>
                  <div className={styles.startStep}>
                    <div className={styles.stepNumber}>4</div>
                    <div className={styles.stepContent}>
                      <h3>Reflect and Submit</h3>
                      <p>Complete the reflection questions and submit your work to your teacher</p>
                    </div>
                  </div>
                </div>
              </section>
              
              <div className={styles.resourceActions}>
                <button className={styles.resourceActionButton}>
                  Download Instructions
                </button>
                <button className={styles.resourceActionButton}>
                  Download Worksheet
                </button>
                <button className={styles.resourceActionButtonPrimary}>
                  Start Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render curriculum guides section
  const renderCurriculumGuides = () => {
    return (
      <div className={styles.guidesContainer}>
        <h2 className={styles.sectionTitle}>Curriculum Guides</h2>
        <p className={styles.sectionDescription}>
          Official CBC curriculum guides and frameworks for reference
        </p>
        
        <div className={styles.guidesList}>
          {CURRICULUM_GUIDES.map(guide => (
            <div key={guide.id} className={styles.guideCard}>
              <div className={styles.guideIcon}>📚</div>
              <div className={styles.guideContent}>
                <h3 className={styles.guideTitle}>{guide.title}</h3>
                <div className={styles.guideMeta}>
                  <span className={styles.guideSubject}>{guide.subject}</span>
                  <span className={styles.guideGrade}>Grades {guide.grade}</span>
                </div>
                <p className={styles.guideDescription}>{guide.description}</p>
              </div>
              <button className={styles.guideDownloadButton}>
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render main content
  const renderMainContent = () => {
    return (
      <div className={styles.cbcResourcesContent}>
        <div className={styles.cbcTabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'projects' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects & Activities
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'guides' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('guides')}
          >
            Curriculum Guides
          </button>
        </div>
        
        {activeTab === 'projects' ? (
          <>
            <div className={styles.filterControls}>
              <div className={styles.searchBar}>
                <input 
                  type="text" 
                  placeholder="Search for CBC projects and activities..." 
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className={styles.filtersRow}>
                <select
                  className={styles.filterSelect}
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="">Subject (All)</option>
                  {subjects.map(subject => (
                    subject !== 'All' && <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                
                <select
                  className={styles.filterSelect}
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                >
                  <option value="">Grade (All)</option>
                  {grades.map(grade => (
                    grade !== 'All' && <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
                
                <select
                  className={styles.filterSelect}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Type (All)</option>
                  {categories.map(category => (
                    category !== 'All' && <option key={category} value={category}>{capitalizeFirstLetter(category)}</option>
                  ))}
                </select>
                
                <select
                  className={styles.filterSelect}
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="">Difficulty (All)</option>
                  {difficulties.map(difficulty => (
                    difficulty !== 'All' && <option key={difficulty} value={difficulty}>{capitalizeFirstLetter(difficulty)}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {filteredResources.length > 0 ? (
              <div className={styles.resourcesGrid}>
                {filteredResources.map(resource => (
                  <div 
                    key={resource.id} 
                    className={styles.resourceCard}
                    onClick={() => handleResourceSelect(resource)}
                  >
                    <div className={styles.resourceImageWrapper}>
                      <img 
                        src={resource.imageUrl} 
                        alt={resource.title} 
                        className={styles.resourceImage}
                      />
                      <div className={styles.resourceBadges}>
                        <span 
                          className={styles.difficultyBadge}
                          style={{ backgroundColor: getDifficultyColor(resource.difficulty) }}
                        >
                          {capitalizeFirstLetter(resource.difficulty)}
                        </span>
                        <span className={styles.categoryBadge}>
                          {getCategoryIcon(resource.category)} {capitalizeFirstLetter(resource.category)}
                        </span>
                      </div>
                    </div>
                    <div className={styles.resourceContent}>
                      <h3 className={styles.resourceTitle}>{resource.title}</h3>
                      <div className={styles.resourceMeta}>
                        <span className={styles.resourceSubject}>{resource.subject}</span>
                        <span className={styles.resourceGrade}>Grade {resource.grade}</span>
                      </div>
                      <p className={styles.resourceSummary}>{resource.description.substring(0, 120)}...</p>
                      <div className={styles.resourceFooter}>
                        <span className={styles.resourceDuration}>{resource.duration}</span>
                        <button className={styles.viewDetailsButton}>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noResourcesMessage}>
                <div className={styles.noResourcesIcon}>🔍</div>
                <h3>No resources match your criteria</h3>
                <p>Try adjusting your filters or search term</p>
              </div>
            )}
          </>
        ) : (
          renderCurriculumGuides()
        )}
      </div>
    );
  };
  
  return (
    <div className={styles.cbcResourcesContainer}>
      <div className={styles.cbcResourcesHeader}>
        <h1 className={styles.cbcResourcesTitle}>CBC Resources</h1>
        <p className={styles.cbcResourcesSubtitle}>
          Access projects, activities, and curriculum materials aligned with the Competency-Based Curriculum
        </p>
      </div>
      
      {selectedResource ? renderResourceDetail() : renderMainContent()}
    </div>
  );
};

export default CBCResources; 