import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './Tutors.module.css';
import { 
  FiUser, 
  FiStar, 
  FiBookOpen, 
  FiClock,
  FiCalendar,
  FiMapPin,
  FiSearch,
  FiFilter,
  FiMessageSquare,
  FiVideo,
  FiExternalLink,
  FiChevronDown,
  FiAlertCircle
} from 'react-icons/fi';

const Tutors = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subjectFromUrl = searchParams.get('subject');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(subjectFromUrl || 'all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Subjects taught in the online learning platform
  const subjects = [
    { id: 'all', name: 'All Subjects' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'english', name: 'English & Literature' },
    { id: 'science', name: 'Science' },
    { id: 'socialstudies', name: 'Social Studies' },
    { id: 'kiswahili', name: 'Kiswahili' },
    { id: 'computerscience', name: 'Computer Science' },
    { id: 'business', name: 'Business Studies' },
    { id: 'art', name: 'Creative Arts' }
  ];
  
  // Mock tutors data with Kenyan names and background
  const mockTutors = [
    {
      id: '1',
      name: 'David Omondi, M.Ed.',
      avatar: 'https://ui-avatars.com/api/?name=David+Omondi&background=39559c&color=fff',
      rating: 4.9,
      reviewCount: 127,
      subjects: ['Mathematics', 'Physics'],
      bio: "I am an experienced mathematics and physics tutor with over 10 years of teaching experience. I hold a Master's in Education from Kenyatta University and have specialized training in STEM education. My teaching philosophy focuses on practical applications of mathematical concepts.",
      location: 'Nairobi, Kenya',
      university: 'Kenyatta University',
      expertise: ['Algebra', 'Calculus', 'Trigonometry', 'Physics', 'KCSE Exam Prep'],
      languages: ['English', 'Kiswahili', 'Luo'],
      availableTimes: [
        { day: 'Monday', slots: ['4:00 PM - 6:00 PM', '7:00 PM - 9:00 PM'] },
        { day: 'Wednesday', slots: ['4:00 PM - 6:00 PM', '7:00 PM - 9:00 PM'] },
        { day: 'Saturday', slots: ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'] }
      ],
      hourlyRate: 'KSh 800',
      achievements: [
        'Trained over 200 students who achieved grade A in KCSE Mathematics',
        'Developed Mathematics curriculum for leading online learning platforms',
        'Mathematics and Science Teachers Association of Kenya (MASTENAK) certified'
      ],
      testimonials: [
        {
          id: 't1',
          studentName: 'Wanjiku Kamau',
          rating: 5,
          comment: "Mr. Omondi helped my daughter improve from a C to an A- in Mathematics. His teaching methods are excellent and he makes complex topics easy to understand.",
          date: '2023-03-15'
        },
        {
          id: 't2',
          studentName: 'Thomas Mwangi',
          rating: 5,
          comment: "One of the best mathematics tutors we have worked with. He is patient, knowledgeable, and really cares about his students. Highly recommended!",
          date: '2023-02-10'
        }
      ]
    },
    {
      id: '2',
      name: 'Akinyi Wekesa, BSc.',
      avatar: 'https://ui-avatars.com/api/?name=Akinyi+Wekesa&background=9c3966&color=fff',
      rating: 4.8,
      reviewCount: 98,
      subjects: ['Science', 'Biology', 'Chemistry'],
      bio: "I am a science educator specializing in biology and chemistry. I have a BSc in Science Education from the University of Nairobi and 7 years of experience teaching secondary school students. I believe in making science engaging through practical experiments and real-world examples.",
      location: 'Kisumu, Kenya',
      university: 'University of Nairobi',
      expertise: ['Biology', 'Chemistry', 'Ecology', 'Genetics', 'Lab Techniques'],
      languages: ['English', 'Kiswahili', 'Luhya'],
      availableTimes: [
        { day: 'Tuesday', slots: ['3:00 PM - 5:00 PM', '6:00 PM - 8:00 PM'] },
        { day: 'Thursday', slots: ['3:00 PM - 5:00 PM', '6:00 PM - 8:00 PM'] },
        { day: 'Sunday', slots: ['2:00 PM - 4:00 PM'] }
      ],
      hourlyRate: 'KSh 750',
      achievements: [
        'Developed innovative teaching materials for Kenyan biology curriculum',
        'Science Congress Award for Best Teacher 2021',
        'Volunteer educator at Kisumu Science Center'
      ],
      testimonials: [
        {
          id: 't1',
          studentName: 'Njoroge Kariuki',
          rating: 5,
          comment: "Ms. Wekesa is an excellent science tutor. She makes complex concepts easy to understand through practical examples. My son's performance in biology improved significantly under her guidance.",
          date: '2023-04-02'
        },
        {
          id: 't2',
          studentName: 'Amina Hassan',
          rating: 4,
          comment: "Very knowledgeable and patient teacher. Her use of virtual lab demos really helped my daughter understand chemical reactions better.",
          date: '2023-03-18'
        }
      ]
    },
    {
      id: '3',
      name: 'Wilson Maina, MA.',
      avatar: 'https://ui-avatars.com/api/?name=Wilson+Maina&background=599c39&color=fff',
      rating: 4.7,
      reviewCount: 85,
      subjects: ['English', 'Literature', 'Kiswahili'],
      bio: "I am a passionate language educator with a Master of Arts in Literature from Moi University. With 9 years of teaching experience, I specialize in English language, composition, and African literature. I believe in nurturing critical thinking and communication skills through literature.",
      location: 'Nakuru, Kenya',
      university: 'Moi University',
      expertise: ['Essay Writing', 'Literary Analysis', 'Grammar', 'Public Speaking', 'Creative Writing'],
      languages: ['English', 'Kiswahili', 'Kikuyu'],
      availableTimes: [
        { day: 'Monday', slots: ['3:00 PM - 5:00 PM'] },
        { day: 'Wednesday', slots: ['3:00 PM - 5:00 PM'] },
        { day: 'Friday', slots: ['3:00 PM - 5:00 PM'] },
        { day: 'Saturday', slots: ['9:00 AM - 11:00 AM'] }
      ],
      hourlyRate: 'KSh 700',
      achievements: [
        'Published author of "Teaching Literature in the Digital Age"',
        'Developed English and Kiswahili curricula for Kenya Institute of Curriculum Development',
        'Recipient of the National Literary Award 2020'
      ],
      testimonials: [
        {
          id: 't1',
          studentName: 'Faith Odhiambo',
          rating: 5,
          comment: "Mr. Maina transformed my daughter's attitude towards literature. His passion for African literature is infectious, and he has a unique ability to make classic texts relevant to today's students.",
          date: '2023-01-20'
        },
        {
          id: 't2',
          studentName: 'Daniel Kimani',
          rating: 4,
          comment: "Excellent English tutor. My son's composition skills improved dramatically, and he now enjoys writing essays, something he used to dread.",
          date: '2022-12-15'
        }
      ]
    },
    {
      id: '4',
      name: 'Josephine Mutua, BSc.',
      avatar: 'https://ui-avatars.com/api/?name=Josephine+Mutua&background=9c5639&color=fff',
      rating: 4.9,
      reviewCount: 112,
      subjects: ['Computer Science', 'ICT', 'Mathematics'],
      bio: "I am a computer science educator with a BSc in Computer Science from Strathmore University. I have 6 years of experience teaching programming, web development, and digital literacy. I am passionate about encouraging more young Kenyans, especially girls, to pursue careers in technology.",
      location: 'Nairobi, Kenya',
      university: 'Strathmore University',
      expertise: ['Programming (Python, Java)', 'Web Development', 'Data Analysis', 'Digital Literacy', 'Computational Thinking'],
      languages: ['English', 'Kiswahili', 'Kamba'],
      availableTimes: [
        { day: 'Tuesday', slots: ['4:00 PM - 6:00 PM'] },
        { day: 'Thursday', slots: ['4:00 PM - 6:00 PM'] },
        { day: 'Saturday', slots: ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'] }
      ],
      hourlyRate: 'KSh 850',
      achievements: [
        'Mentor for Girls in Tech Kenya Initiative',
        'Developed coding bootcamp curriculum for secondary school students',
        'Microsoft Certified Educator'
      ],
      testimonials: [
        {
          id: 't1',
          studentName: 'Brian Otieno',
          rating: 5,
          comment: "Ms. Mutua is an exceptional computer science tutor. She makes programming concepts accessible and fun. My son has developed a strong interest in coding thanks to her lessons.",
          date: '2023-02-28'
        },
        {
          id: 't2',
          studentName: 'Grace Chege',
          rating: 5,
          comment: "As a parent with limited tech knowledge, I appreciate how Ms. Mutua keeps me informed about my daughter's progress. She has a gift for explaining complex concepts in simple terms.",
          date: '2023-01-15'
        }
      ]
    },
    {
      id: '5',
      name: 'Onyango Ochieng, M.Sc.',
      avatar: 'https://ui-avatars.com/api/?name=Onyango+Ochieng&background=399c91&color=fff',
      rating: 4.6,
      reviewCount: 73,
      subjects: ['Social Studies', 'History', 'Geography'],
      bio: "I am a social studies educator with an M.Sc. in Geography from the University of Nairobi. With 8 years of teaching experience, I specialize in Kenyan and African history, geography, and current affairs. I believe in making social studies relevant through connecting historical events to contemporary issues.",
      location: 'Eldoret, Kenya',
      university: 'University of Nairobi',
      expertise: ['East African History', 'Physical Geography', 'Current Affairs', 'Civics', 'Map Reading'],
      languages: ['English', 'Kiswahili', 'Luo', 'Kalenjin'],
      availableTimes: [
        { day: 'Monday', slots: ['5:00 PM - 7:00 PM'] },
        { day: 'Wednesday', slots: ['5:00 PM - 7:00 PM'] },
        { day: 'Friday', slots: ['5:00 PM - 7:00 PM'] },
        { day: 'Saturday', slots: ['1:00 PM - 3:00 PM'] }
      ],
      hourlyRate: 'KSh 700',
      achievements: [
        'Developed virtual field trips for Kenyan historical sites',
        'Published researcher on East African cultural geography',
        'Kenya Historical Association member'
      ],
      testimonials: [
        {
          id: 't1',
          studentName: 'Sarah Kimetto',
          rating: 5,
          comment: "Mr. Ochieng has a remarkable way of making history come alive. His lessons are engaging and insightful, connecting historical events to present-day Kenya and Africa.",
          date: '2023-03-05'
        },
        {
          id: 't2',
          studentName: 'James Kiprop',
          rating: 4,
          comment: "A very knowledgeable teacher who makes geography interesting with practical examples and virtual field trips. My son now enjoys subjects he previously struggled with.",
          date: '2023-02-12'
        }
      ]
    }
  ];

  // Initialize data on component mount
  useEffect(() => {
    setLoading(true);
    try {
      // Set tutors data
      setTutors(mockTutors);
      
      // If subject is specified in URL, set it as selected
      if (subjectFromUrl) {
        setSelectedSubject(subjectFromUrl);
      }
    } catch (err) {
      console.error('Error initializing tutors data:', err);
      setError('Failed to load tutors data');
    } finally {
      setLoading(false);
    }
  }, [subjectFromUrl]);

  // Open tutor details modal
  const openTutorDetails = (tutor) => {
    setSelectedTutor(tutor);
    setShowModal(true);
  };

  // Close tutor details modal
  const closeTutorDetails = () => {
    setShowModal(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle subject filter change
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  // Handle availability filter change
  const handleAvailabilityChange = (e) => {
    setSelectedAvailability(e.target.value);
  };

  // Filter tutors based on search and filters
  const getFilteredTutors = () => {
    return tutors.filter(tutor => {
      // Filter by search query
      const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tutor.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            tutor.bio.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by subject
      const matchesSubject = selectedSubject === 'all' || 
                             tutor.subjects.some(subject => 
                               subject.toLowerCase() === selectedSubject.toLowerCase() ||
                               (selectedSubject === 'socialstudies' && 
                                ['History', 'Geography', 'Social Studies'].some(s => 
                                  subject.includes(s)
                                )
                               ) ||
                               (selectedSubject === 'english' && 
                                ['English', 'Literature'].some(s => 
                                  subject.includes(s)
                                )
                               )
                             );
      
      // For availability, this would typically check against user's preferred times
      // For now, we'll simplify and just check if tutor has weekend availability
      const matchesAvailability = selectedAvailability === 'all' ||
                                 (selectedAvailability === 'weekends' && 
                                  tutor.availableTimes.some(time => 
                                    ['Saturday', 'Sunday'].includes(time.day)
                                  )) ||
                                 (selectedAvailability === 'weekdays' && 
                                  tutor.availableTimes.some(time => 
                                    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(time.day)
                                  )) ||
                                 (selectedAvailability === 'evenings' && 
                                  tutor.availableTimes.some(time => 
                                    time.slots.some(slot => slot.includes('PM'))
                                  ));
      
      return matchesSearch && matchesSubject && matchesAvailability;
    });
  };

  // Convert rating to stars display
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className={styles.ratingStars}>
        {[...Array(fullStars)].map((_, i) => (
          <FiStar key={`full-${i}`} className={styles.starFilled} />
        ))}
        {halfStar && <FiStar className={styles.starHalf} />}
        {[...Array(emptyStars)].map((_, i) => (
          <FiStar key={`empty-${i}`} className={styles.starEmpty} />
        ))}
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading tutors...</p>
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
    <div className={styles.tutorsContainer}>
      <div className={styles.tutorsHeader}>
        <h2>Find a Tutor</h2>
        <p>Connect with qualified tutors specializing in various subjects</p>
      </div>
      
      {/* Search and Filters */}
      <div className={styles.filtersContainer}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text"
            placeholder="Search by name, subject, or keyword..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label htmlFor="subject-filter">Subject:</label>
            <select 
              id="subject-filter" 
              value={selectedSubject}
              onChange={handleSubjectChange}
            >
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>
          
          <div className={styles.filterGroup}>
            <label htmlFor="availability-filter">Availability:</label>
            <select 
              id="availability-filter"
              value={selectedAvailability}
              onChange={handleAvailabilityChange}
            >
              <option value="all">Any Time</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
              <option value="evenings">Evenings</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Tutors List */}
      <div className={styles.tutorsList}>
        {getFilteredTutors().length === 0 ? (
          <div className={styles.noResults}>
            <h3>No tutors found</h3>
            <p>Try adjusting your search or filters to find more tutors</p>
          </div>
        ) : (
          getFilteredTutors().map(tutor => (
            <div key={tutor.id} className={styles.tutorCard}>
              <div className={styles.tutorCardHeader}>
                <div className={styles.tutorAvatar}>
                  <img src={tutor.avatar} alt={tutor.name} />
                </div>
                <div className={styles.tutorInfo}>
                  <h3>{tutor.name}</h3>
                  <div className={styles.tutorMeta}>
                    <div className={styles.tutorRating}>
                      {renderRatingStars(tutor.rating)}
                      <span className={styles.ratingText}>
                        {tutor.rating} ({tutor.reviewCount} reviews)
                      </span>
                    </div>
                    <div className={styles.tutorLocation}>
                      <FiMapPin /> {tutor.location}
                    </div>
                  </div>
                  <div className={styles.tutorSubjects}>
                    {tutor.subjects.map((subject, index) => (
                      <span key={index} className={styles.subjectTag}>
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className={styles.tutorBio}>
                <p>{tutor.bio.substring(0, 180)}...</p>
              </div>
              
              <div className={styles.tutorHighlights}>
                <div className={styles.highlightItem}>
                  <FiBookOpen />
                  <div>
                    <h4>Expertise</h4>
                    <p>{tutor.expertise.slice(0, 3).join(', ')}{tutor.expertise.length > 3 ? '...' : ''}</p>
                  </div>
                </div>
                <div className={styles.highlightItem}>
                  <FiClock />
                  <div>
                    <h4>Hourly Rate</h4>
                    <p>{tutor.hourlyRate}</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.tutorActions}>
                <button 
                  className={styles.viewProfileButton}
                  onClick={() => openTutorDetails(tutor)}
                >
                  View Full Profile
                </button>
                <Link to={`/dashboard/messages?contact=tutor${tutor.id}`} className={styles.messageButton}>
                  <FiMessageSquare /> Message
                </Link>
                <button className={styles.bookButton}>
                  <FiCalendar /> Book Session
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Tutor Details Modal */}
      {showModal && selectedTutor && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Tutor Profile</h2>
              <button 
                className={styles.closeButton}
                onClick={closeTutorDetails}
              >
                &times;
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.tutorDetailHeader}>
                <div className={styles.tutorDetailAvatar}>
                  <img src={selectedTutor.avatar} alt={selectedTutor.name} />
                </div>
                <div className={styles.tutorDetailInfo}>
                  <h3>{selectedTutor.name}</h3>
                  <div className={styles.tutorDetailMeta}>
                    <div className={styles.tutorDetailRating}>
                      {renderRatingStars(selectedTutor.rating)}
                      <span className={styles.ratingText}>
                        {selectedTutor.rating} ({selectedTutor.reviewCount} reviews)
                      </span>
                    </div>
                    <div className={styles.tutorDetailLocation}>
                      <FiMapPin /> {selectedTutor.location}
                    </div>
                  </div>
                  <div className={styles.tutorDetailSubjects}>
                    {selectedTutor.subjects.map((subject, index) => (
                      <span key={index} className={styles.subjectTag}>
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className={styles.tutorDetailSection}>
                <h4>About</h4>
                <p className={styles.tutorDetailBio}>{selectedTutor.bio}</p>
              </div>
              
              <div className={styles.tutorDetailRow}>
                <div className={styles.tutorDetailCol}>
                  <div className={styles.tutorDetailSection}>
                    <h4>Education</h4>
                    <p><strong>University:</strong> {selectedTutor.university}</p>
                  </div>
                  
                  <div className={styles.tutorDetailSection}>
                    <h4>Languages</h4>
                    <div className={styles.languageList}>
                      {selectedTutor.languages.map((language, index) => (
                        <span key={index} className={styles.languageTag}>
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className={styles.tutorDetailSection}>
                    <h4>Expertise</h4>
                    <ul className={styles.expertiseList}>
                      {selectedTutor.expertise.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className={styles.tutorDetailCol}>
                  <div className={styles.tutorDetailSection}>
                    <h4>Availability</h4>
                    <div className={styles.availabilityList}>
                      {selectedTutor.availableTimes.map((time, index) => (
                        <div key={index} className={styles.availabilityItem}>
                          <div className={styles.availabilityDay}>{time.day}</div>
                          <div className={styles.availabilitySlots}>
                            {time.slots.map((slot, slotIndex) => (
                              <span key={slotIndex} className={styles.availabilitySlot}>
                                {slot}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className={styles.tutorDetailSection}>
                    <h4>Achievements</h4>
                    <ul className={styles.achievementsList}>
                      {selectedTutor.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className={styles.tutorDetailSection}>
                <h4>Reviews from Students</h4>
                <div className={styles.testimonialsList}>
                  {selectedTutor.testimonials.map(testimonial => (
                    <div key={testimonial.id} className={styles.testimonialItem}>
                      <div className={styles.testimonialHeader}>
                        <div className={styles.testimonialName}>{testimonial.studentName}</div>
                        <div className={styles.testimonialRating}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <FiStar key={i} className={styles.starFilled} />
                          ))}
                        </div>
                        <div className={styles.testimonialDate}>
                          {new Date(testimonial.date).toLocaleDateString()}
                        </div>
                      </div>
                      <p className={styles.testimonialComment}>{testimonial.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.tutorDetailActions}>
                <div className={styles.tutorDetailRate}>
                  <h4>Hourly Rate</h4>
                  <div className={styles.rateValue}>{selectedTutor.hourlyRate}</div>
                </div>
                <div className={styles.tutorDetailButtons}>
                  <Link to={`/dashboard/messages?contact=tutor${selectedTutor.id}`} className={styles.detailMessageButton}>
                    <FiMessageSquare /> Message Tutor
                  </Link>
                  <button className={styles.detailBookButton}>
                    <FiCalendar /> Book a Session
                  </button>
                  <button className={styles.detailVideoButton}>
                    <FiVideo /> Schedule Video Call
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

export default Tutors; 