import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar, 
  FaReply, 
  FaFilter, 
  FaSearch,
  FaThumbsUp,
  FaFlag,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimes,
  FaCopy,
  FaChevronDown,
  FaChevronUp,
  FaBook
} from 'react-icons/fa';
import styles from './Reviews.module.css';

const Reviews = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratings: [0, 0, 0, 0, 0], // 5 stars to 1 star
    positivePercentage: 0
  });
  const [filter, setFilter] = useState('all'); // all, positive, negative, unanswered
  const [sortBy, setSortBy] = useState('date-desc'); // date-desc, date-asc, rating-high, rating-low
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [courses, setCourses] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchReviews();
    fetchCourses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [reviews, filter, sortBy, searchQuery, selectedCourse]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      // In a real app, fetch reviews from API
      // For now, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      const mockReviews = generateMockReviews();
      setReviews(mockReviews);
      
      // Calculate statistics
      calculateStats(mockReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      // In a real app, fetch courses from API
      // For now, we'll use mock data
      const mockCourses = [
        { id: '1', title: 'Advanced Mathematics' },
        { id: '2', title: 'English Literature' },
        { id: '3', title: 'Introduction to Physics' },
        { id: '4', title: 'History of Kenya' },
        { id: '5', title: 'Web Development Fundamentals' }
      ];
      setCourses(mockCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const generateMockReviews = () => {
    const mockReviews = [];
    const courseIds = ['1', '2', '3', '4', '5'];
    const courseNames = [
      'Advanced Mathematics', 
      'English Literature', 
      'Introduction to Physics', 
      'History of Kenya', 
      'Web Development Fundamentals'
    ];
    const studentNames = [
      'Samuel Maina', 
      'Rachel Otieno', 
      'Daniel Kamau', 
      'Elizabeth Wanjiku', 
      'Michael Odhiambo',
      'Grace Muthoni',
      'James Kariuki',
      'Sarah Njeri'
    ];
    const reviewContent = [
      'This course was incredibly helpful. The instructor explained complex concepts in a simple way.',
      'I learned a lot in this course. The materials were well-organized and easy to follow.',
      'The instructor was knowledgeable but sometimes went too fast through important topics.',
      'Great course! I especially enjoyed the practical examples and exercises.',
      'The content was good but needed more interactive elements.',
      'Very informative and well-structured. Would recommend to others.',
      'I struggled with some concepts but the instructor was patient and helpful.',
      'Excellent course! The instructor was engaging and made learning enjoyable.',
      'The course was too basic for my level. Expected more advanced content.',
      'Good value for money. Learned practical skills I can apply immediately.'
    ];
    
    const today = new Date();
    
    // Generate 30 random reviews
    for (let i = 0; i < 30; i++) {
      const randomCourseIndex = Math.floor(Math.random() * courseIds.length);
      const courseId = courseIds[randomCourseIndex];
      const courseName = courseNames[randomCourseIndex];
      
      const studentName = studentNames[Math.floor(Math.random() * studentNames.length)];
      const content = reviewContent[Math.floor(Math.random() * reviewContent.length)];
      
      // Random rating between 1-5 (weighted towards higher ratings)
      const rating = Math.floor(Math.random() * 5) + 1;
      const weighted = Math.min(5, Math.max(1, Math.floor(rating * 0.7 + 1.5)));
      
      // Random date within the last 3 months
      const reviewDate = new Date(today);
      reviewDate.setDate(today.getDate() - Math.floor(Math.random() * 90));
      
      // About 60% of reviews have replies
      const hasReply = Math.random() > 0.4;
      
      mockReviews.push({
        id: `review-${i}`,
        courseId,
        courseName,
        studentId: `student-${Math.floor(Math.random() * 100)}`,
        studentName,
        rating: weighted,
        content,
        date: reviewDate,
        helpful: Math.floor(Math.random() * 20),
        reply: hasReply ? {
          content: `Thank you for your feedback, ${studentName.split(' ')[0]}! I appreciate your insights and will continue to improve the course.`,
          date: new Date(reviewDate.getTime() + Math.floor(Math.random() * 48) * 3600000) // 0-48 hours later
        } : null,
        reported: Math.random() < 0.05, // 5% of reviews are reported
        hidden: Math.random() < 0.03 // 3% of reviews are hidden
      });
    }
    
    return mockReviews;
  };

  const calculateStats = (reviewsData) => {
    const validReviews = reviewsData.filter(review => !review.hidden);
    
    if (validReviews.length === 0) {
      setStats({
        totalReviews: 0,
        averageRating: 0,
        ratings: [0, 0, 0, 0, 0],
        positivePercentage: 0
      });
      return;
    }
    
    // Calculate average rating
    const totalRating = validReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / validReviews.length;
    
    // Count ratings by star (index 0 = 5 stars, index 4 = 1 star)
    const ratings = [0, 0, 0, 0, 0];
    validReviews.forEach(review => {
      ratings[5 - review.rating]++;
    });
    
    // Calculate positive percentage (4-5 stars)
    const positiveReviews = validReviews.filter(review => review.rating >= 4).length;
    const positivePercentage = (positiveReviews / validReviews.length) * 100;
    
    setStats({
      totalReviews: validReviews.length,
      averageRating,
      ratings,
      positivePercentage
    });
  };

  const applyFilters = () => {
    let result = [...reviews];
    
    // Filter by visibility
    result = result.filter(review => !review.hidden);
    
    // Filter by course
    if (selectedCourse !== 'all') {
      result = result.filter(review => review.courseId === selectedCourse);
    }
    
    // Apply filter type
    switch (filter) {
      case 'positive':
        result = result.filter(review => review.rating >= 4);
        break;
      case 'negative':
        result = result.filter(review => review.rating <= 2);
        break;
      case 'unanswered':
        result = result.filter(review => !review.reply);
        break;
      case 'reported':
        result = result.filter(review => review.reported);
        break;
      default:
        // 'all' - no filtering
        break;
    }
    
    // Apply search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(review => 
        review.content.toLowerCase().includes(query) || 
        review.studentName.toLowerCase().includes(query) ||
        review.courseName.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'date-desc':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'rating-high':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-low':
        result.sort((a, b) => a.rating - b.rating);
        break;
      default:
        // Default to newest first
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    setFilteredReviews(result);
  };

  const handleReplySubmit = (reviewId) => {
    if (replyText.trim() === '') return;
    
    // In a real app, send reply to API
    // For now, update local state
    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          reply: {
            content: replyText,
            date: new Date()
          }
        };
      }
      return review;
    });
    
    setReviews(updatedReviews);
    setReplyText('');
    setReplyingTo(null);
  };

  const handleReportReview = (reviewId) => {
    if (window.confirm('Are you sure you want to report this review?')) {
      // In a real app, send report to API
      // For now, update local state
      const updatedReviews = reviews.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            reported: true
          };
        }
        return review;
      });
      
      setReviews(updatedReviews);
    }
  };

  const handleHideReview = (reviewId) => {
    if (window.confirm('Are you sure you want to hide this review?')) {
      // In a real app, send hide request to API
      // For now, update local state
      const updatedReviews = reviews.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            hidden: true
          };
        }
        return review;
      });
      
      setReviews(updatedReviews);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className={styles.star} />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className={styles.star} />);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className={styles.star} />);
    }
    
    return stars;
  };

  const renderRatingBars = () => {
    return stats.ratings.map((count, index) => {
      const starNumber = 5 - index;
      const percentage = stats.totalReviews > 0 
        ? (count / stats.totalReviews) * 100 
        : 0;
      
      return (
        <div key={starNumber} className={styles.ratingBar}>
          <div className={styles.ratingLabel}>{starNumber} stars</div>
          <div className={styles.ratingBarOuter}>
            <div 
              className={styles.ratingBarInner} 
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className={styles.ratingCount}>{count}</div>
        </div>
      );
    });
  };

  const toggleReplyForm = (reviewId) => {
    if (replyingTo === reviewId) {
      setReplyingTo(null);
      setReplyText('');
    } else {
      setReplyingTo(reviewId);
      setReplyText('');
    }
  };

  const getReplyTemplate = (reviewId) => {
    const review = reviews.find(r => r.id === reviewId);
    if (!review) return '';
    
    const templates = [
      `Thank you for your feedback, ${review.studentName.split(' ')[0]}! I appreciate your insights and will consider them to improve the course.`,
      `Hello ${review.studentName.split(' ')[0]}, thank you for taking the time to review the course. I'm glad you found it helpful.`,
      `I appreciate your feedback, ${review.studentName.split(' ')[0]}. Thank you for highlighting both the strengths and areas for improvement.`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  };

  const renderReviews = () => {
    if (filteredReviews.length === 0) {
      return (
        <div className={styles.emptyState}>
          <FaStar className={styles.emptyStateIcon} />
          <h3>No reviews found</h3>
          <p>
            {searchQuery 
              ? 'Try adjusting your search or filters'
              : filter !== 'all'
                ? 'Try changing your filter selection'
                : 'When students review your courses, they will appear here'}
          </p>
        </div>
      );
    }
    
    return filteredReviews.map(review => (
      <div 
        key={review.id} 
        className={`${styles.reviewCard} ${review.reported ? styles.reportedReview : ''}`}
      >
        {review.reported && (
          <div className={styles.reportBadge}>
            <FaExclamationTriangle /> Reported
          </div>
        )}
        
        <div className={styles.reviewHeader}>
          <div className={styles.reviewerInfo}>
            <div className={styles.reviewerName}>{review.studentName}</div>
            <div className={styles.reviewDate}>{formatDate(review.date)}</div>
          </div>
          <div className={styles.reviewRating}>
            {renderStars(review.rating)}
          </div>
        </div>
        
        <div className={styles.courseInfo}>
          <FaBook className={styles.courseIcon} />
          {review.courseName}
        </div>
        
        <div className={styles.reviewContent}>{review.content}</div>
        
        <div className={styles.reviewActions}>
          <div className={styles.helpfulCount}>
            <FaThumbsUp /> {review.helpful} students found this helpful
          </div>
          
          <div className={styles.actionButtons}>
            {!review.reply && (
              <button 
                className={styles.replyButton}
                onClick={() => toggleReplyForm(review.id)}
              >
                <FaReply /> Reply
              </button>
            )}
            
            {!review.reported && (
              <button 
                className={styles.reportButton}
                onClick={() => handleReportReview(review.id)}
              >
                <FaFlag /> Report
              </button>
            )}
            
            <button 
              className={styles.hideButton}
              onClick={() => handleHideReview(review.id)}
            >
              <FaTimes /> Hide
            </button>
          </div>
        </div>
        
        {review.reply && (
          <div className={styles.replyContainer}>
            <div className={styles.replyHeader}>
              <div className={styles.replyAuthor}>
                <strong>Your reply</strong> • {formatDate(review.reply.date)}
              </div>
              <button 
                className={styles.editReplyButton}
                onClick={() => {
                  setReplyingTo(review.id);
                  setReplyText(review.reply.content);
                }}
              >
                Edit
              </button>
            </div>
            <div className={styles.replyContent}>{review.reply.content}</div>
          </div>
        )}
        
        {replyingTo === review.id && (
          <div className={styles.replyForm}>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              className={styles.replyTextarea}
              rows="3"
            />
            <div className={styles.replyFormActions}>
              <button 
                className={styles.templateButton}
                onClick={() => setReplyText(getReplyTemplate(review.id))}
              >
                <FaCopy /> Use Template
              </button>
              <div>
                <button 
                  className={styles.cancelReplyButton}
                  onClick={() => toggleReplyForm(review.id)}
                >
                  Cancel
                </button>
                <button 
                  className={styles.submitReplyButton}
                  onClick={() => handleReplySubmit(review.id)}
                  disabled={replyText.trim() === ''}
                >
                  {review.reply ? 'Update Reply' : 'Post Reply'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1><FaStar className={styles.headerIcon} /> Reviews</h1>
          <p className={styles.subheader}>
            {currentUser?.displayName 
              ? `Manage student feedback for your courses, ${currentUser.displayName}`
              : 'Manage student feedback for your courses'}
          </p>
        </div>
      </div>

      <div className={styles.statsSection}>
        <div className={styles.overallRating}>
          <div className={styles.ratingNumber}>{stats.averageRating.toFixed(1)}</div>
          <div className={styles.ratingStars}>{renderStars(stats.averageRating)}</div>
          <div className={styles.ratingCount}>{stats.totalReviews} reviews</div>
          <div className={styles.positivePercentage}>
            <FaThumbsUp className={styles.thumbIcon} />
            {stats.positivePercentage.toFixed(0)}% positive
          </div>
        </div>
        
        <div className={styles.ratingBars}>
          {renderRatingBars()}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filterControls}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              <FaFilter /> Filter:
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Reviews</option>
              <option value="positive">Positive (4-5 ★)</option>
              <option value="negative">Negative (1-2 ★)</option>
              <option value="unanswered">Unanswered</option>
              <option value="reported">Reported</option>
            </select>
          </div>
          
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Course:</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Courses</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Sort:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="rating-high">Highest Rating</option>
              <option value="rating-low">Lowest Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.reviewsContainer}>
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading reviews...</p>
          </div>
        ) : (
          <>
            <div className={styles.reviewsCount}>
              Showing {filteredReviews.length} of {reviews.filter(r => !r.hidden).length} reviews
            </div>
            <div className={styles.reviewsList}>
              {renderReviews()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reviews;