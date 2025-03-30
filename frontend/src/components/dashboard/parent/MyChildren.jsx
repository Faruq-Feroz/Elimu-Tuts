import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../../context/AuthContext';
import styles from './MyChildren.module.css';
import { 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiSearch, 
  FiChevronDown, 
  FiChevronUp,
  FiAlertCircle,
  FiCalendar,
  FiBook,
  FiUser,
  FiHeart,
  FiBarChart2,
  FiX,
  FiCheck
} from 'react-icons/fi';

const MyChildren = () => {
  // Auth context - commented out as not used yet
  // const { currentUser } = useAuth();
  
  // State variables
  const [children, setChildren] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [expandedChild, setExpandedChild] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    dob: '',
    gender: '',
    grade: '',
    school: '',
    interests: '',
    healthInfo: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  });

  // Mock data with Kenyan names
  const mockChildren = [
    {
      id: '1',
      name: 'Wanjiku Kamau',
      dob: '2015-05-12',
      gender: 'Female',
      grade: '3rd Grade',
      school: 'Makini School',
      interests: 'Drawing, Swimming, Reading',
      healthInfo: 'Mild asthma, No food allergies',
      emergencyContact: {
        name: 'James Kamau',
        phone: '0712345678',
        relationship: 'Father'
      },
      subjects: [
        { name: 'Mathematics', grade: 'A', teacher: 'Mr. Omondi' },
        { name: 'English', grade: 'B+', teacher: 'Mrs. Mutua' },
        { name: 'Science', grade: 'A-', teacher: 'Mr. Kimani' }
      ],
      attendance: {
        present: 45,
        absent: 3,
        late: 2,
        total: 50
      },
      upcomingEvents: [
        { date: '2023-11-15', title: 'Parent-Teacher Meeting' },
        { date: '2023-11-20', title: 'Science Exhibition' }
      ]
    },
    {
      id: '2',
      name: 'Njoroge Kariuki',
      dob: '2017-09-23',
      gender: 'Male',
      grade: '1st Grade',
      school: 'Riara Springs Primary School',
      interests: 'Football, Music, Puzzles',
      healthInfo: 'Peanut allergy',
      emergencyContact: {
        name: 'Wambui Kariuki',
        phone: '0723456789',
        relationship: 'Mother'
      },
      subjects: [
        { name: 'Mathematics', grade: 'B+', teacher: 'Mrs. Wanjiru' },
        { name: 'English', grade: 'A', teacher: 'Mr. Otieno' },
        { name: 'Art', grade: 'A+', teacher: 'Ms. Akinyi' }
      ],
      attendance: {
        present: 47,
        absent: 2,
        late: 1,
        total: 50
      },
      upcomingEvents: [
        { date: '2023-11-18', title: 'Sports Day' },
        { date: '2023-12-01', title: 'End of Term Concert' }
      ]
    }
  ];

  // Fetch children data on component mount
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        setLoading(true);
        // In a real app, would fetch from API
        // Just use mock data directly for now
        setChildren(mockChildren);
      } catch (err) {
        console.error('Error fetching children:', err);
        setError('Failed to load children data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchChildren();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle form submission for adding/editing a child
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (editMode) {
        // In a real app, would call API to update child
        // Update state directly for demo
        setChildren(children.map(child => 
          child.id === formData.id ? { ...child, ...formData } : child
        ));
      } else {
        // In a real app, would call API to create child
        // Create new child with mock ID
        const newChild = {
          ...formData,
          id: Date.now().toString(),
          subjects: [],
          attendance: { present: 0, absent: 0, late: 0, total: 0 },
          upcomingEvents: []
        };
        
        setChildren([...children, newChild]);
      }
      
      // Reset form
      setFormData({
        id: '',
        name: '',
        dob: '',
        gender: '',
        grade: '',
        school: '',
        interests: '',
        healthInfo: '',
        emergencyContact: {
          name: '',
          phone: '',
          relationship: ''
        }
      });
      setShowForm(false);
      setEditMode(false);
      
    } catch (err) {
      console.error('Error saving child:', err);
      setError('Failed to save child data');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit child
  const handleEdit = (child) => {
    setFormData({
      ...child
    });
    setEditMode(true);
    setShowForm(true);
  };

  // Handle delete child
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this child?')) {
      return;
    }
    
    try {
      setLoading(true);
      
      // In a real app, would call API to delete child
      // Update state directly for demo
      setChildren(children.filter(child => child.id !== id));
      
    } catch (err) {
      console.error('Error deleting child:', err);
      setError('Failed to delete child');
    } finally {
      setLoading(false);
    }
  };

  // Toggle child details expansion
  const toggleChildExpansion = (id) => {
    setExpandedChild(expandedChild === id ? null : id);
  };

  // Filter children based on search query
  const filteredChildren = children.filter(child => 
    child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditMode(false);
    setFormData({
      id: '',
      name: '',
      dob: '',
      gender: '',
      grade: '',
      school: '',
      interests: '',
      healthInfo: '',
      emergencyContact: {
        name: '',
        phone: '',
        relationship: ''
      }
    });
  };

  return (
    <div className={styles.childrenManagement}>
      <div className={styles.pageHeader}>
        <h1>My Children</h1>
        <p>Manage your children's profiles and view their academic progress</p>
      </div>

      <div className={styles.actionBar}>
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name, grade, or school..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <button 
          className={styles.addButton} 
          onClick={() => {
            setEditMode(false);
            setFormData({
              id: '',
              name: '',
              dob: '',
              gender: '',
              grade: '',
              school: '',
              interests: '',
              healthInfo: '',
              emergencyContact: {
                name: '',
                phone: '',
                relationship: ''
              }
            });
            setShowForm(true);
          }}
        >
          <FiPlus /> Add Child
        </button>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <FiAlertCircle /> {error}
          <button onClick={() => setError(null)} className={styles.dismissError}>
            <FiX />
          </button>
        </div>
      )}

      {loading && !showForm ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading children data...</p>
        </div>
      ) : (
        <div className={styles.childrenList}>
          {filteredChildren.length === 0 ? (
            <div className={styles.noChildren}>
              <FiUser size={48} />
              <h3>{searchQuery ? 'No children match your search' : 'No children added yet'}</h3>
              <p>{searchQuery ? 'Try a different search term' : 'Click "Add Child" to add your first child'}</p>
            </div>
          ) : (
            filteredChildren.map(child => (
              <div 
                key={child.id} 
                className={styles.childCard}
              >
                <div 
                  className={styles.childHeader}
                  onClick={() => toggleChildExpansion(child.id)}
                >
                  <div className={styles.childName}>
                    <h3>{child.name}</h3>
                    <div className={styles.childSummary}>
                      {child.grade} • {child.school}
                    </div>
                  </div>
                  <div className={styles.childActions}>
                    <button 
                      className={styles.viewProgressButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        // In a real app, would navigate to progress page
                        alert(`View progress for ${child.name}`);
                      }}
                    >
                      <FiBarChart2 /> View Progress
                    </button>
                    <button 
                      className={styles.editButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(child);
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button 
                      className={styles.deleteButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(child.id);
                      }}
                    >
                      <FiTrash2 />
                    </button>
                    {expandedChild === child.id ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                </div>
                
                {expandedChild === child.id && (
                  <div className={styles.childDetails}>
                    <div className={styles.detailsSection}>
                      <h4><FiUser /> Personal Information</h4>
                      <div className={styles.detailsGrid}>
                        <div>
                          <strong>Date of Birth:</strong> {new Date(child.dob).toLocaleDateString()}
                        </div>
                        <div>
                          <strong>Gender:</strong> {child.gender}
                        </div>
                        <div>
                          <strong>Interests:</strong> {child.interests}
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.detailsSection}>
                      <h4><FiBook /> Academic Performance</h4>
                      <div className={styles.subjectsList}>
                        {child.subjects && child.subjects.length > 0 ? (
                          child.subjects.map((subject, index) => (
                            <div key={index} className={styles.subjectItem}>
                              <div className={styles.subjectName}>{subject.name}</div>
                              <div className={styles.subjectTeacher}>{subject.teacher}</div>
                              <div className={styles.subjectGrade}>{subject.grade}</div>
                            </div>
                          ))
                        ) : (
                          <div className={styles.noData}>No subjects data available</div>
                        )}
                      </div>
                    </div>
                    
                    <div className={styles.detailsSection}>
                      <h4><FiCheck /> Attendance</h4>
                      {child.attendance && child.attendance.total > 0 ? (
                        <div className={styles.attendanceStats}>
                          <div className={styles.attendanceItem}>
                            <div className={styles.attendanceValue}>{child.attendance.present}</div>
                            <div className={styles.attendanceLabel}>Present</div>
                          </div>
                          <div className={styles.attendanceItem}>
                            <div className={styles.attendanceValue}>{child.attendance.absent}</div>
                            <div className={styles.attendanceLabel}>Absent</div>
                          </div>
                          <div className={styles.attendanceItem}>
                            <div className={styles.attendanceValue}>{child.attendance.late}</div>
                            <div className={styles.attendanceLabel}>Late</div>
                          </div>
                          <div className={styles.attendanceItem}>
                            <div className={styles.attendanceRate}>
                              {Math.round((child.attendance.present / child.attendance.total) * 100)}%
                            </div>
                            <div className={styles.attendanceLabel}>Attendance Rate</div>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.noData}>No attendance data available</div>
                      )}
                    </div>
                    
                    <div className={styles.detailsSection}>
                      <h4><FiCalendar /> Upcoming Events</h4>
                      <div className={styles.eventsList}>
                        {child.upcomingEvents && child.upcomingEvents.length > 0 ? (
                          child.upcomingEvents.map((event, index) => (
                            <div key={index} className={styles.eventItem}>
                              <div className={styles.eventDate}>
                                {new Date(event.date).toLocaleDateString()}
                              </div>
                              <div className={styles.eventTitle}>{event.title}</div>
                            </div>
                          ))
                        ) : (
                          <div className={styles.noData}>No upcoming events</div>
                        )}
                      </div>
                    </div>
                    
                    <div className={styles.detailsSection}>
                      <h4><FiHeart /> Health Information</h4>
                      <div className={styles.healthInfo}>
                        {child.healthInfo || 'No health information provided'}
                      </div>
                      
                      <h4>Emergency Contact</h4>
                      {child.emergencyContact ? (
                        <div className={styles.emergencyContact}>
                          <div><strong>Name:</strong> {child.emergencyContact.name}</div>
                          <div><strong>Phone:</strong> {child.emergencyContact.phone}</div>
                          <div><strong>Relationship:</strong> {child.emergencyContact.relationship}</div>
                        </div>
                      ) : (
                        <div className={styles.noData}>No emergency contact information</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Add/Edit Child Form */}
      {showForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{editMode ? 'Edit Child' : 'Add New Child'}</h2>
              <button className={styles.closeButton} onClick={handleCancelForm}>
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.formSection}>
                <h3>Basic Information</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className={styles.formSection}>
                <h3>Educational Information</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="grade">Grade/Class</label>
                    <input
                      type="text"
                      id="grade"
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="school">School</label>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="interests">Interests/Hobbies</label>
                    <input
                      type="text"
                      id="interests"
                      name="interests"
                      value={formData.interests}
                      onChange={handleInputChange}
                      placeholder="e.g. Drawing, Swimming, Reading"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formSection}>
                <h3>Health & Emergency Information</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup + ' ' + styles.fullWidth}>
                    <label htmlFor="healthInfo">Health Information</label>
                    <textarea
                      id="healthInfo"
                      name="healthInfo"
                      value={formData.healthInfo}
                      onChange={handleInputChange}
                      placeholder="Any allergies, medical conditions, or special needs"
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="emergencyContact.name">Emergency Contact Name</label>
                    <input
                      type="text"
                      id="emergencyContact.name"
                      name="emergencyContact.name"
                      value={formData.emergencyContact.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="emergencyContact.phone">Emergency Contact Phone</label>
                    <input
                      type="tel"
                      id="emergencyContact.phone"
                      name="emergencyContact.phone"
                      value={formData.emergencyContact.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="emergencyContact.relationship">Relationship</label>
                    <input
                      type="text"
                      id="emergencyContact.relationship"
                      name="emergencyContact.relationship"
                      value={formData.emergencyContact.relationship}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formActions}>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={handleCancelForm}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className={styles.buttonSpinner}></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      {editMode ? 'Update Child' : 'Add Child'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyChildren; 