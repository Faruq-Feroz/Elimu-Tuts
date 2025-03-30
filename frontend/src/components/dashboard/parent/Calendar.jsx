import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Calendar.module.css';
import { 
  FiCalendar, 
  FiClock, 
  FiBookOpen, 
  FiVideo,
  FiUsers,
  FiCheckCircle,
  FiAlertCircle,
  FiChevronLeft, 
  FiChevronRight,
  FiFilter,
  FiPlusCircle
} from 'react-icons/fi';

const Calendar = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const childIdFromUrl = searchParams.get('child');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [allChildren, setAllChildren] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [filterType, setFilterType] = useState('all');
  const [calendarEvents, setCalendarEvents] = useState([]);
  
  // Mock children data
  const mockChildren = [
    {
      id: '1',
      name: 'David Smith',
      avatar: 'https://ui-avatars.com/api/?name=David+Smith&background=random&color=fff',
      events: [
        {
          id: 'e1',
          title: 'Mathematics Module Test',
          date: '2023-04-15',
          time: '10:00 AM',
          type: 'test',
          subject: 'Mathematics',
          description: 'End of module assessment covering algebraic equations and geometry',
          status: 'upcoming'
        },
        {
          id: 'e2',
          title: 'Science Project Submission',
          date: '2023-04-20',
          time: '11:59 PM',
          type: 'assignment',
          subject: 'Science',
          description: 'Submit your completed ecosystem project with all observations',
          status: 'upcoming'
        },
        {
          id: 'e3',
          title: 'Virtual Group Discussion',
          date: '2023-04-10',
          time: '3:00 PM',
          type: 'live',
          subject: 'English',
          description: 'Live session to discuss the novel "Things Fall Apart" with your classmates',
          status: 'upcoming'
        },
        {
          id: 'e4',
          title: 'Parent-Teacher Meeting',
          date: '2023-04-25',
          time: '4:30 PM',
          type: 'meeting',
          subject: 'General',
          description: 'Virtual meeting to discuss your child\'s progress this term',
          status: 'upcoming'
        },
        {
          id: 'e5',
          title: 'Mathematics Assignment',
          date: '2023-04-05',
          time: '11:59 PM',
          type: 'assignment',
          subject: 'Mathematics',
          description: 'Complete the practice problems on quadratic equations',
          status: 'completed',
          score: '85%',
          feedback: 'Good work! Remember to check your signs when factoring.'
        }
      ]
    },
    {
      id: '2',
      name: 'Sarah Smith',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Smith&background=random&color=fff',
      events: [
        {
          id: 'e1',
          title: 'English Reading Assessment',
          date: '2023-04-18',
          time: '9:00 AM',
          type: 'test',
          subject: 'English',
          description: 'Reading comprehension and vocabulary assessment',
          status: 'upcoming'
        },
        {
          id: 'e2',
          title: 'Art Project Submission',
          date: '2023-04-22',
          time: '11:59 PM',
          type: 'assignment',
          subject: 'Art',
          description: 'Submit your cultural heritage artwork with artist statement',
          status: 'upcoming'
        }
      ]
    }
  ];

  // Initialize data on component mount
  useEffect(() => {
    setLoading(true);
    try {
      // Set all children data
      setAllChildren(mockChildren);
      
      // Determine which child to show
      let childToShow;
      
      if (childIdFromUrl) {
        // If a specific child is requested via URL, show that child
        childToShow = mockChildren.find(child => child.id === childIdFromUrl);
      } else if (mockChildren.length > 0) {
        // Otherwise show the first child
        childToShow = mockChildren[0];
      }
      
      if (childToShow) {
        setSelectedChild(childToShow);
        setCalendarEvents(childToShow.events);
      } else {
        setError('No child data found');
      }
    } catch (err) {
      console.error('Error initializing calendar data:', err);
      setError('Failed to load calendar data');
    } finally {
      setLoading(false);
    }
  }, [childIdFromUrl]);

  // Handle child selection change
  const handleChildChange = (childId) => {
    const child = allChildren.find(c => c.id === childId);
    setSelectedChild(child);
    setCalendarEvents(child.events);
  };

  // Handle month navigation
  const prevMonth = () => {
    const date = new Date(selectedMonth);
    date.setMonth(date.getMonth() - 1);
    setSelectedMonth(date);
  };

  const nextMonth = () => {
    const date = new Date(selectedMonth);
    date.setMonth(date.getMonth() + 1);
    setSelectedMonth(date);
  };

  const today = () => {
    setSelectedMonth(new Date());
  };

  // Filter events by type
  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  // Get filtered events
  const getFilteredEvents = () => {
    if (filterType === 'all') {
      return calendarEvents;
    }
    return calendarEvents.filter(event => event.type === filterType);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();
    
    // Get first day of month and last day of month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Get number of days in month
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Create array for all days in the calendar view
    const days = [];
    
    // Add empty days for days before first day of month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({
        date: null,
        day: '',
        events: []
      });
    }
    
    // Add days of the month with their events
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      
      // Find events for this day
      const dayEvents = getFilteredEvents().filter(event => event.date === dateString);
      
      days.push({
        date: date,
        day: day,
        events: dayEvents
      });
    }
    
    // Add empty days at the end to complete the grid if necessary
    const totalDaysToShow = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;
    for (let i = days.length; i < totalDaysToShow; i++) {
      days.push({
        date: null,
        day: '',
        events: []
      });
    }
    
    return days;
  };

  // Get readable month and year
  const getMonthYearString = () => {
    const options = { month: 'long', year: 'numeric' };
    return selectedMonth.toLocaleDateString('en-US', options);
  };

  // Get weekday names
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get event status class
  const getEventStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return styles.completed;
      case 'overdue':
        return styles.overdue;
      case 'upcoming':
      default:
        return styles.upcoming;
    }
  };

  // Get event type icon
  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'test':
        return <FiBookOpen />;
      case 'live':
        return <FiVideo />;
      case 'meeting':
        return <FiUsers />;
      case 'assignment':
      default:
        return <FiClock />;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading calendar...</p>
      </div>
    );
  }

  // Error state
  if (error || !selectedChild) {
    return (
      <div className={styles.errorContainer}>
        <FiAlertCircle size={48} />
        <h2>Oops! Something went wrong</h2>
        <p>{error || 'Calendar data not found'}</p>
      </div>
    );
  }

  return (
    <div className={styles.calendarContainer}>
      {/* Header with children selector */}
      {allChildren.length > 1 && (
        <div className={styles.childSelector}>
          <h3>Select Child:</h3>
          <div className={styles.childrenTabs}>
            {allChildren.map(child => (
              <button
                key={child.id}
                className={selectedChild?.id === child.id ? styles.activeChild : ''}
                onClick={() => handleChildChange(child.id)}
              >
                <img 
                  src={child.avatar} 
                  alt={child.name} 
                  className={styles.childAvatar}
                />
                <span>{child.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Calendar controls */}
      <div className={styles.calendarControls}>
        <div className={styles.monthNavigation}>
          <button onClick={prevMonth} className={styles.navButton}>
            <FiChevronLeft />
          </button>
          <h2>{getMonthYearString()}</h2>
          <button onClick={nextMonth} className={styles.navButton}>
            <FiChevronRight />
          </button>
        </div>
        <div className={styles.controlActions}>
          <button onClick={today} className={styles.todayButton}>
            Today
          </button>
          <div className={styles.filterDropdown}>
            <button className={styles.filterButton}>
              <FiFilter /> Filter <span className={styles.filterCount}>{getFilteredEvents().length}</span>
            </button>
            <div className={styles.filterMenu}>
              <button 
                className={filterType === 'all' ? styles.activeFilter : ''}
                onClick={() => handleFilterChange('all')}
              >
                All Events
              </button>
              <button 
                className={filterType === 'test' ? styles.activeFilter : ''}
                onClick={() => handleFilterChange('test')}
              >
                <FiBookOpen /> Tests & Quizzes
              </button>
              <button 
                className={filterType === 'assignment' ? styles.activeFilter : ''}
                onClick={() => handleFilterChange('assignment')}
              >
                <FiClock /> Assignments
              </button>
              <button 
                className={filterType === 'live' ? styles.activeFilter : ''}
                onClick={() => handleFilterChange('live')}
              >
                <FiVideo /> Live Sessions
              </button>
              <button 
                className={filterType === 'meeting' ? styles.activeFilter : ''}
                onClick={() => handleFilterChange('meeting')}
              >
                <FiUsers /> Meetings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar grid */}
      <div className={styles.calendar}>
        <div className={styles.weekdays}>
          {weekdays.map((day, index) => (
            <div key={index} className={styles.weekday}>{day}</div>
          ))}
        </div>
        <div className={styles.days}>
          {generateCalendarDays().map((day, index) => (
            <div 
              key={index} 
              className={`${styles.day} ${!day.date ? styles.emptyDay : ''} ${
                day.date && day.date.toDateString() === new Date().toDateString() ? styles.today : ''
              }`}
            >
              <div className={styles.dayNumber}>{day.day}</div>
              <div className={styles.dayEvents}>
                {day.events.slice(0, 3).map(event => (
                  <div 
                    key={event.id} 
                    className={`${styles.eventDot} ${getEventStatusClass(event.status)}`}
                    title={`${event.title} - ${event.time}`}
                  ></div>
                ))}
                {day.events.length > 3 && (
                  <div className={styles.moreEvents}>+{day.events.length - 3}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming events list */}
      <div className={styles.upcomingEvents}>
        <h3>
          <FiCalendar /> Upcoming Events 
          <span className={styles.upcomingCount}>
            {getFilteredEvents().filter(e => e.status === 'upcoming').length}
          </span>
        </h3>
        <div className={styles.eventsList}>
          {getFilteredEvents()
            .filter(event => event.status === 'upcoming')
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(event => (
              <div key={event.id} className={styles.eventCard}>
                <div className={styles.eventDate}>
                  <div className={styles.month}>
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                  <div className={styles.day}>
                    {new Date(event.date).getDate()}
                  </div>
                </div>
                <div className={styles.eventContent}>
                  <div className={styles.eventHeader}>
                    <h4>{event.title}</h4>
                    <div className={`${styles.eventType} ${styles[event.type]}`}>
                      {getEventTypeIcon(event.type)} {event.type}
                    </div>
                  </div>
                  <div className={styles.eventDetails}>
                    <div className={styles.eventTime}>
                      <FiClock /> {event.time} • {event.subject}
                    </div>
                    <p className={styles.eventDescription}>{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          {getFilteredEvents().filter(e => e.status === 'upcoming').length === 0 && (
            <div className={styles.noEvents}>
              <p>No upcoming events for the selected filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Completed events section */}
      <div className={styles.completedEvents}>
        <h3>
          <FiCheckCircle /> Completed Activities 
          <span className={styles.completedCount}>
            {getFilteredEvents().filter(e => e.status === 'completed').length}
          </span>
        </h3>
        <div className={styles.eventsList}>
          {getFilteredEvents()
            .filter(event => event.status === 'completed')
            .map(event => (
              <div key={event.id} className={`${styles.eventCard} ${styles.completedCard}`}>
                <div className={styles.eventDate}>
                  <div className={styles.month}>
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                  <div className={styles.day}>
                    {new Date(event.date).getDate()}
                  </div>
                </div>
                <div className={styles.eventContent}>
                  <div className={styles.eventHeader}>
                    <h4>{event.title}</h4>
                    {event.score && (
                      <div className={styles.eventScore}>
                        Score: {event.score}
                      </div>
                    )}
                  </div>
                  <div className={styles.eventDetails}>
                    <div className={styles.eventSubject}>
                      <FiBookOpen /> {event.subject}
                    </div>
                    {event.feedback && (
                      <p className={styles.eventFeedback}><strong>Feedback:</strong> {event.feedback}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          {getFilteredEvents().filter(e => e.status === 'completed').length === 0 && (
            <div className={styles.noEvents}>
              <p>No completed events for the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar; 