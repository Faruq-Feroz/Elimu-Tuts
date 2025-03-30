// src/components/VideoLessons.jsx
import React, { useState, useEffect } from 'react';
import styles from './VideoLessons.module.css';

// CBC subjects
const SUBJECTS = [
  'Mathematics', 'English', 'Kiswahili', 'Science', 'Social Studies', 
  'ICT', 'Religious Education', 'Creative Arts', 'Music', 'Home Science', 
  'Agriculture', 'Physical Education', 'Health Education', 'Life Skills'
];

// CBC Grades
const GRADES = [
  'Pre-Primary 1', 'Pre-Primary 2', 
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
  'Grade 7', 'Grade 8', 'Grade 9'
];

// Sample video data based on CBC curriculum
const VIDEOS = [
  {
    id: 1,
    title: 'Introduction to Fractions',
    subject: 'Mathematics',
    grade: 'Grade 4',
    description: 'Learn about fractions and their real-world applications',
    thumbnail: 'https://img.youtube.com/vi/n0FZhQ_GkKw/hqdefault.jpg',
    youtubeId: 'n0FZhQ_GkKw',
    duration: '10:25',
    teacher: 'Ms. Wanjiru',
    quizzes: [
      {
        id: 'q1',
        question: 'What is 1/4 + 1/4?',
        options: ['1/8', '1/2', '2/4', '1/4'],
        answer: '1/2'
      },
      {
        id: 'q2',
        question: 'Which fraction is larger: 3/4 or 2/3?',
        options: ['3/4', '2/3', 'They are equal', 'Cannot be determined'],
        answer: '3/4'
      }
    ]
  },
  {
    id: 2,
    title: 'Parts of Speech in English',
    subject: 'English',
    grade: 'Grade 5',
    description: 'Understand nouns, verbs, adjectives, and adverbs',
    thumbnail: 'https://img.youtube.com/vi/4JYxaT1JCPU/hqdefault.jpg',
    youtubeId: '4JYxaT1JCPU',
    duration: '8:12',
    teacher: 'Mr. Omondi',
    quizzes: [
      {
        id: 'q1',
        question: 'Which of the following is a noun?',
        options: ['Run', 'Beautiful', 'Kenya', 'Quickly'],
        answer: 'Kenya'
      },
      {
        id: 'q2',
        question: 'In the sentence "She runs quickly", what is "quickly"?',
        options: ['Noun', 'Verb', 'Adjective', 'Adverb'],
        answer: 'Adverb'
      }
    ]
  },
  {
    id: 3,
    title: 'Our Solar System',
    subject: 'Science',
    grade: 'Grade 6',
    description: 'Explore the planets and other objects in our solar system',
    thumbnail: 'https://img.youtube.com/vi/libKVRa01L8/hqdefault.jpg',
    youtubeId: 'libKVRa01L8',
    duration: '12:45',
    teacher: 'Ms. Kamau',
    quizzes: [
      {
        id: 'q1',
        question: 'How many planets are in our solar system?',
        options: ['7', '8', '9', '10'],
        answer: '8'
      },
      {
        id: 'q2',
        question: 'Which is the largest planet in our solar system?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        answer: 'Jupiter'
      }
    ]
  },
  {
    id: 4,
    title: 'Kenyan Cultural Heritage',
    subject: 'Social Studies',
    grade: 'Grade 4',
    description: 'Learn about the diverse cultural heritage of Kenya',
    thumbnail: 'https://img.youtube.com/vi/2-eMfSPAa0I/hqdefault.jpg',
    youtubeId: '2-eMfSPAa0I',
    duration: '15:30',
    teacher: 'Mr. Kimani',
    quizzes: [
      {
        id: 'q1',
        question: 'How many official languages does Kenya have?',
        options: ['1', '2', '3', '4'],
        answer: '2'
      },
      {
        id: 'q2',
        question: 'Which of these is NOT a Kenyan community?',
        options: ['Kikuyu', 'Luo', 'Zulu', 'Maasai'],
        answer: 'Zulu'
      }
    ]
  },
  {
    id: 5,
    title: 'Basic Computer Skills',
    subject: 'ICT',
    grade: 'Grade 3',
    description: 'Introduction to computers and basic operations',
    thumbnail: 'https://img.youtube.com/vi/CwMWJP-OQJ0/hqdefault.jpg',
    youtubeId: 'CwMWJP-OQJ0',
    duration: '9:18',
    teacher: 'Ms. Atieno',
    quizzes: [
      {
        id: 'q1',
        question: 'What does CPU stand for?',
        options: ['Computer Processing Unit', 'Central Processing Unit', 'Control Processing Unit', 'Core Processing Unit'],
        answer: 'Central Processing Unit'
      },
      {
        id: 'q2',
        question: 'Which of these is an input device?',
        options: ['Monitor', 'Printer', 'Speaker', 'Keyboard'],
        answer: 'Keyboard'
      }
    ]
  },
  {
    id: 6,
    title: 'Kiswahili: Majina na Matumizi Yake',
    subject: 'Kiswahili',
    grade: 'Grade 5',
    description: 'Kujifunza aina za majina na matumizi yake katika sentensi',
    thumbnail: 'https://img.youtube.com/vi/fKW5wS-5hS0/hqdefault.jpg',
    youtubeId: 'fKW5wS-5hS0',
    duration: '11:05',
    teacher: 'Mwl. Juma',
    quizzes: [
      {
        id: 'q1',
        question: 'Ni kipi kati ya haya ni jina la pekee?',
        options: ['Mtu', 'Nairobi', 'Meza', 'Mtoto'],
        answer: 'Nairobi'
      },
      {
        id: 'q2',
        question: 'Nomino ni nini?',
        options: ['Kitendo', 'Jina', 'Kivumishi', 'Kielezi'],
        answer: 'Jina'
      }
    ]
  },
  {
    id: 7,
    title: 'Creative Arts: Drawing Basics',
    subject: 'Creative Arts',
    grade: 'Grade 2',
    description: 'Learn basic drawing techniques for young artists',
    thumbnail: 'https://img.youtube.com/vi/7TXEZ4tP06c/hqdefault.jpg',
    youtubeId: '7TXEZ4tP06c',
    duration: '7:50',
    teacher: 'Ms. Njeri',
    quizzes: [
      {
        id: 'q1',
        question: 'Which of these is a primary color?',
        options: ['Green', 'Purple', 'Blue', 'Orange'],
        answer: 'Blue'
      },
      {
        id: 'q2',
        question: 'What do you call a drawing of a person or animal?',
        options: ['Landscape', 'Portrait', 'Still life', 'Abstract'],
        answer: 'Portrait'
      }
    ]
  },
  {
    id: 8,
    title: 'Physical Health and Wellness',
    subject: 'Health Education',
    grade: 'Grade 4',
    description: 'Understanding the importance of physical health and wellness',
    thumbnail: 'https://img.youtube.com/vi/dhpCdqOtuj0/hqdefault.jpg',
    youtubeId: 'dhpCdqOtuj0',
    duration: '8:45',
    teacher: 'Mr. Onyango',
    quizzes: [
      {
        id: 'q1',
        question: 'How many glasses of water should you drink daily?',
        options: ['2-3', '4-5', '6-8', '10-12'],
        answer: '6-8'
      },
      {
        id: 'q2',
        question: 'Which of these is a benefit of regular exercise?',
        options: ['Lower energy levels', 'Poorer sleep', 'Stronger muscles', 'Weakened immunity'],
        answer: 'Stronger muscles'
      }
    ]
  },
  {
    id: 9,
    title: 'Introduction to Farming',
    subject: 'Agriculture',
    grade: 'Grade 6',
    description: 'Learn about sustainable farming practices in Kenya',
    thumbnail: 'https://img.youtube.com/vi/Xbx3eaVJdLk/hqdefault.jpg',
    youtubeId: 'Xbx3eaVJdLk',
    duration: '14:20',
    teacher: 'Mr. Mwangi',
    quizzes: [
      {
        id: 'q1',
        question: 'What is crop rotation?',
        options: ['Turning crops upside down', 'Growing different crops in sequence', 'Spinning crops in a circle', 'Harvesting crops in a cycle'],
        answer: 'Growing different crops in sequence'
      },
      {
        id: 'q2',
        question: 'Which of these is a cash crop in Kenya?',
        options: ['Maize', 'Beans', 'Tea', 'Potatoes'],
        answer: 'Tea'
      }
    ]
  }
];

// Sample playlist data
const PLAYLISTS = [
  {
    id: 'pl1',
    name: 'Mathematics Essentials',
    description: 'Core mathematics concepts for primary students',
    videos: [1, 3]
  },
  {
    id: 'pl2',
    name: 'Language Skills',
    description: 'Improve your English and Kiswahili language skills',
    videos: [2, 6]
  },
  {
    id: 'pl3',
    name: 'Science and Technology',
    description: 'Explore science concepts and computer skills',
    videos: [3, 5]
  },
  {
    id: 'pl4',
    name: 'Kenyan Culture and Society',
    description: 'Learn about Kenya\'s rich cultural heritage',
    videos: [4, 6]
  }
];

const VideoLessons = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState(VIDEOS);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'bookmarks', 'history', 'playlists'
  
  // New states for enhanced features
  const [bookmarks, setBookmarks] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  // Initialize from localStorage on component mount
  useEffect(() => {
    try {
      const storedBookmarks = JSON.parse(localStorage.getItem('videoBookmarks')) || [];
      const storedHistory = JSON.parse(localStorage.getItem('videoHistory')) || [];
      setBookmarks(storedBookmarks);
      setWatchHistory(storedHistory);
    } catch (error) {
      console.error('Error loading data from localStorage', error);
    }
  }, []);

  // Filter videos based on selected filters and search query
  useEffect(() => {
    let results = [...VIDEOS];
    
    // Apply tab filters first
    if (activeTab === 'bookmarks') {
      results = results.filter(video => bookmarks.includes(video.id));
    } else if (activeTab === 'history') {
      results = results.filter(video => watchHistory.some(item => item.videoId === video.id));
    } else if (activeTab === 'playlists' && currentPlaylist) {
      results = results.filter(video => currentPlaylist.videos.includes(video.id));
    }
    
    // Then apply other filters
    if (selectedSubject) {
      results = results.filter(video => video.subject === selectedSubject);
    }
    
    if (selectedGrade) {
      results = results.filter(video => video.grade === selectedGrade);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(video => 
        video.title.toLowerCase().includes(query) || 
        video.description.toLowerCase().includes(query) ||
        video.teacher.toLowerCase().includes(query)
      );
    }
    
    setFilteredVideos(results);
  }, [selectedSubject, selectedGrade, searchQuery, activeTab, bookmarks, watchHistory, currentPlaylist]);

  // Handle video selection
  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
    setShowQuiz(false);
    setQuizSubmitted(false);
    setQuizAnswers({});
    
    // Add to watch history
    const now = new Date();
    const historyEntry = { 
      videoId: video.id, 
      timestamp: now.toISOString(),
      displayTime: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}` 
    };
    
    const updatedHistory = [...watchHistory.filter(h => h.videoId !== video.id), historyEntry];
    setWatchHistory(updatedHistory);
    localStorage.setItem('videoHistory', JSON.stringify(updatedHistory));
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle bookmarking
  const toggleBookmark = (videoId) => {
    let updatedBookmarks;
    if (bookmarks.includes(videoId)) {
      updatedBookmarks = bookmarks.filter(id => id !== videoId);
    } else {
      updatedBookmarks = [...bookmarks, videoId];
    }
    setBookmarks(updatedBookmarks);
    localStorage.setItem('videoBookmarks', JSON.stringify(updatedBookmarks));
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedSubject('');
    setSelectedGrade('');
    setSearchQuery('');
    setCurrentPlaylist(null);
  };

  // Handle quiz answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answer
    });
  };

  // Submit quiz answers
  const submitQuiz = () => {
    if (!currentVideo || !currentVideo.quizzes) return;
    
    let correctAnswers = 0;
    currentVideo.quizzes.forEach(quiz => {
      if (quizAnswers[quiz.id] === quiz.answer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / currentVideo.quizzes.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  // Select playlist
  const selectPlaylist = (playlist) => {
    setCurrentPlaylist(playlist);
    setActiveTab('playlists');
  };

  // Clear watch history
  const clearWatchHistory = () => {
    if (window.confirm('Are you sure you want to clear your watch history?')) {
      setWatchHistory([]);
      localStorage.setItem('videoHistory', JSON.stringify([]));
    }
  };

  // Format timestamp for display
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    
    const diffSecs = Math.floor(diffMs / 1000);
    if (diffSecs < 60) return `${diffSecs} seconds ago`;
    
    const diffMins = Math.floor(diffSecs / 60);
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays} days ago`;
    
    return past.toLocaleDateString();
  };

  return (
    <div className={styles.videoLessonsContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>CBC Video Lessons</h1>
        <p className={styles.subtitle}>Explore educational videos aligned with the Competency-Based Curriculum</p>
      </div>

      {/* Video Player Section */}
      {currentVideo && (
        <div className={styles.videoPlayerSection}>
          <div className={styles.videoPlayerWrapper}>
            <iframe
              className={styles.videoPlayer}
              src={`https://www.youtube.com/embed/${currentVideo.youtubeId}`}
              title={currentVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className={styles.videoInfoPanel}>
            <div className={styles.videoTitleRow}>
              <h2 className={styles.videoTitle}>{currentVideo.title}</h2>
              <button 
                className={`${styles.bookmarkButton} ${bookmarks.includes(currentVideo.id) ? styles.bookmarked : ''}`}
                onClick={() => toggleBookmark(currentVideo.id)}
                aria-label={bookmarks.includes(currentVideo.id) ? "Remove bookmark" : "Add bookmark"}
              >
                {bookmarks.includes(currentVideo.id) ? "★" : "☆"}
              </button>
            </div>
            <div className={styles.videoMeta}>
              <span className={styles.subjectTag}>{currentVideo.subject}</span>
              <span className={styles.gradeTag}>{currentVideo.grade}</span>
              <span className={styles.durationTag}>{currentVideo.duration}</span>
            </div>
            <p className={styles.videoDescription}>{currentVideo.description}</p>
            <p className={styles.teacherInfo}>Taught by: {currentVideo.teacher}</p>
            
            {/* Video Actions */}
            <div className={styles.videoActions}>
              {!showQuiz && currentVideo.quizzes && currentVideo.quizzes.length > 0 && (
                <button 
                  className={styles.quizButton}
                  onClick={() => setShowQuiz(true)}
                >
                  Take Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Section */}
      {currentVideo && showQuiz && (
        <div className={styles.quizSection}>
          <h3 className={styles.quizTitle}>Quiz: {currentVideo.title}</h3>
          
          {quizSubmitted ? (
            <div className={styles.quizResults}>
              <div className={styles.quizScore}>
                <h4>Your Score: {quizScore}%</h4>
                <div className={styles.scoreBar}>
                  <div 
                    className={styles.scoreBarFill} 
                    style={{width: `${quizScore}%`}}
                  ></div>
                </div>
              </div>
              
              <div className={styles.quizAnswers}>
                {currentVideo.quizzes.map((quiz) => (
                  <div 
                    key={quiz.id}
                    className={`${styles.quizAnswerReview} ${
                      quizAnswers[quiz.id] === quiz.answer 
                        ? styles.correct 
                        : styles.incorrect
                    }`}
                  >
                    <p className={styles.quizQuestion}>{quiz.question}</p>
                    <p className={styles.yourAnswer}>
                      Your answer: {quizAnswers[quiz.id] || "Not answered"}
                    </p>
                    <p className={styles.correctAnswer}>
                      Correct answer: {quiz.answer}
                    </p>
                  </div>
                ))}
              </div>
              
              <button 
                className={styles.retakeButton}
                onClick={() => {
                  setQuizSubmitted(false);
                  setQuizAnswers({});
                }}
              >
                Retake Quiz
              </button>
            </div>
          ) : (
            <div className={styles.quizQuestions}>
              {currentVideo.quizzes.map((quiz, index) => (
                <div key={quiz.id} className={styles.quizQuestion}>
                  <p className={styles.questionText}>
                    <span className={styles.questionNumber}>{index + 1}.</span> {quiz.question}
                  </p>
                  <div className={styles.questionOptions}>
                    {quiz.options.map((option) => (
                      <label key={option} className={styles.optionLabel}>
                        <input
                          type="radio"
                          name={quiz.id}
                          value={option}
                          checked={quizAnswers[quiz.id] === option}
                          onChange={() => handleAnswerSelect(quiz.id, option)}
                          className={styles.optionInput}
                        />
                        <span className={styles.optionText}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              
              <button 
                className={styles.submitQuizButton}
                onClick={submitQuiz}
                disabled={Object.keys(quizAnswers).length < currentVideo.quizzes.length}
              >
                Submit Answers
              </button>
            </div>
          )}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className={styles.navTabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'all' ? styles.activeTab : ''}`}
          onClick={() => {
            setActiveTab('all');
            setCurrentPlaylist(null);
          }}
        >
          All Videos
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'bookmarks' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('bookmarks')}
        >
          Bookmarks ({bookmarks.length})
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'history' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Watch History
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'playlists' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('playlists')}
        >
          Playlists
        </button>
      </div>

      {/* Filters Section */}
      <div className={styles.filtersSection}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filterControls}>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Subjects</option>
            {SUBJECTS.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
          
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Grades</option>
            {GRADES.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          
          <button 
            onClick={resetFilters}
            className={styles.resetButton}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Playlists Section */}
      {activeTab === 'playlists' && !currentPlaylist && (
        <div className={styles.playlistsGrid}>
          {PLAYLISTS.map(playlist => (
            <div 
              key={playlist.id} 
              className={styles.playlistCard}
              onClick={() => selectPlaylist(playlist)}
            >
              <h3 className={styles.playlistName}>{playlist.name}</h3>
              <p className={styles.playlistDescription}>{playlist.description}</p>
              <p className={styles.playlistCount}>{playlist.videos.length} videos</p>
            </div>
          ))}
        </div>
      )}

      {/* Watch History Section */}
      {activeTab === 'history' && (
        <div className={styles.historyHeader}>
          <h3>Your Watch History</h3>
          {watchHistory.length > 0 && (
            <button 
              onClick={clearWatchHistory}
              className={styles.clearHistoryButton}
            >
              Clear History
            </button>
          )}
        </div>
      )}

      {/* Videos Grid */}
      <div className={styles.videosGrid}>
        {filteredVideos.length > 0 ? (
          filteredVideos.map(video => (
            <div 
              key={video.id} 
              className={styles.videoCard}
              onClick={() => handleVideoSelect(video)}
            >
              <div className={styles.thumbnailContainer}>
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className={styles.thumbnail}
                />
                <span className={styles.duration}>{video.duration}</span>
                {bookmarks.includes(video.id) && (
                  <span className={styles.bookmarkIcon}>★</span>
                )}
              </div>
              <div className={styles.videoCardContent}>
                <h3 className={styles.videoCardTitle}>{video.title}</h3>
                <div className={styles.videoCardMeta}>
                  <span className={styles.videoCardSubject}>{video.subject}</span>
                  <span className={styles.videoCardGrade}>{video.grade}</span>
                </div>
                <p className={styles.videoCardTeacher}>By {video.teacher}</p>
                
                {/* Show last watched time in history tab */}
                {activeTab === 'history' && (
                  <p className={styles.lastWatched}>
                    {formatTimeAgo(watchHistory.find(h => h.videoId === video.id)?.timestamp)}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <h3>No videos found</h3>
            {activeTab === 'bookmarks' && bookmarks.length === 0 ? (
              <p>You haven't bookmarked any videos yet</p>
            ) : activeTab === 'history' && watchHistory.length === 0 ? (
              <p>You haven't watched any videos yet</p>
            ) : (
              <p>Try adjusting your filters or search query</p>
            )}
            <button onClick={resetFilters} className={styles.resetButton}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoLessons;