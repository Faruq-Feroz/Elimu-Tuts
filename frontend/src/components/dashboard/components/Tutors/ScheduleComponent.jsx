import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUserGraduate, 
  FaVideo, 
  FaChalkboardTeacher,
  FaTrash, 
  FaEdit, 
  FaPlus, 
  FaFilter,
  FaSave,
  FaTimes,
  FaChevronLeft, 
  FaChevronRight
} from 'react-icons/fa';
import styles from './ScheduleComponent.module.css';

const ScheduleComponent = () => {
  // Using useAuth to get the current user information - will be used later for API calls
  // and personalization features
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'day', 'week', 'month'
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'class', 'meeting', 'personal'
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'class',
    description: '',
    students: [],
    course: '',
    link: '',
    color: '#4a6cf7'
  });
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchEvents();
  }, [selectedDate, filter]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // In a real app, fetch events from API
      // For now, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      const mockEvents = generateMockEvents();
      
      // Filter events based on selected filter and date range
      let filteredEvents = mockEvents;
      if (filter !== 'all') {
        filteredEvents = mockEvents.filter(event => event.type === filter);
      }
      
      // Further filter based on date range for the selected view
      const dateRange = getDateRangeForView();
      filteredEvents = filteredEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= dateRange.start && eventDate <= dateRange.end;
      });
      
      setEvents(filteredEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockEvents = () => {
    const mockEvents = [];
    const today = new Date();
    const courseNames = [
      "Mathematics: Algebra",
      "English Grammar",
      "Introduction to Physics",
      "Biology Fundamentals",
      "History of Kenya",
      "Chemistry Basics"
    ];
    const studentNames = [
      "James Kamau",
      "Sarah Ochieng",
      "David Muthoni",
      "Grace Wangari",
      "Michael Omondi",
      "Mercy Njeri"
    ];
    
    // Generate events across a 2 week span (past week + current week + next week)
    for (let i = -7; i < 14; i++) {
      const eventDate = new Date(today);
      eventDate.setDate(today.getDate() + i);
      
      // Decide how many events for this day (0-3)
      const eventCount = Math.floor(Math.random() * 4);
      
      for (let j = 0; j < eventCount; j++) {
        // Random start hour between 8 AM and 6 PM
        const startHour = Math.floor(Math.random() * 10) + 8;
        const eventType = ['class', 'meeting', 'personal'][Math.floor(Math.random() * 3)];
        
        // Random duration between 1-2 hours
        const durationHours = Math.random() > 0.5 ? 1 : 2;
        
        // Format time as strings
        const startTime = `${startHour.toString().padStart(2, '0')}:00`;
        const endTime = `${(startHour + durationHours).toString().padStart(2, '0')}:00`;
        
        // Generate random students (1-3)
        const studentCount = Math.floor(Math.random() * 3) + 1;
        const students = [];
        for (let k = 0; k < studentCount; k++) {
          students.push(studentNames[Math.floor(Math.random() * studentNames.length)]);
        }
        
        // Pick random course
        const course = courseNames[Math.floor(Math.random() * courseNames.length)];
        
        // Generate event ID
        const id = `event-${i}-${j}-${Date.now()}`;
        
        // Assign color based on event type
        let color;
        let description;
        
        switch (eventType) {
          case 'class':
            color = '#4a6cf7'; // blue
            description = `Teaching session for ${course}`;
            break;
          case 'meeting':
            color = '#28a745'; // green
            description = `Meeting with ${students.join(', ')}`;
            break;
          case 'personal':
            color = '#ffc107'; // yellow
            description = 'Personal time block';
            break;
          default:
            color = '#4a6cf7';
            description = 'Scheduled event';
        }
        
        mockEvents.push({
          id,
          title: eventType === 'class' 
            ? `${course} Class` 
            : eventType === 'meeting' 
              ? `Student Meeting` 
              : `Personal Time`,
          date: eventDate.toISOString().split('T')[0],
          startTime,
          endTime,
          type: eventType,
          description,
          students: eventType !== 'personal' ? students : [],
          course: eventType === 'class' ? course : '',
          link: eventType !== 'personal' ? 'https://zoom.us/j/meetingid' : '',
          color
        });
      }
    }
    
    return mockEvents;
  };

  const getDateRangeForView = () => {
    const currentDate = new Date(selectedDate);
    let start, end;
    
    switch (viewMode) {
      case 'day':
        start = new Date(currentDate);
        end = new Date(currentDate);
        break;
      case 'week':
        // Start from Sunday of the current week
        start = new Date(currentDate);
        start.setDate(currentDate.getDate() - currentDate.getDay());
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        break;
      case 'month':
        start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        break;
      default:
        start = new Date(currentDate);
        end = new Date(currentDate);
    }
    
    return { start, end };
  };

  const handlePrevPeriod = () => {
    const newDate = new Date(selectedDate);
    
    switch (viewMode) {
      case 'day':
        newDate.setDate(selectedDate.getDate() - 1);
        break;
      case 'week':
        newDate.setDate(selectedDate.getDate() - 7);
        break;
      case 'month':
        newDate.setMonth(selectedDate.getMonth() - 1);
        break;
    }
    
    setSelectedDate(newDate);
  };

  const handleNextPeriod = () => {
    const newDate = new Date(selectedDate);
    
    switch (viewMode) {
      case 'day':
        newDate.setDate(selectedDate.getDate() + 1);
        break;
      case 'week':
        newDate.setDate(selectedDate.getDate() + 7);
        break;
      case 'month':
        newDate.setMonth(selectedDate.getMonth() + 1);
        break;
    }
    
    setSelectedDate(newDate);
  };

  const handleAddEvent = () => {
    // Set default date and time in the form
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      title: '',
      date: today,
      startTime: '09:00',
      endTime: '10:00',
      type: 'class',
      description: '',
      students: [],
      course: '',
      link: '',
      color: '#4a6cf7'
    });
    
    setShowAddModal(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      type: event.type,
      description: event.description,
      students: event.students,
      course: event.course,
      link: event.link,
      color: event.color
    });
    
    setShowEditModal(true);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      // In a real app, delete event from API
      // For now, remove it from local state
      setEvents(events.filter(event => event.id !== eventId));
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Update color based on type
    if (name === 'type') {
      let color;
      switch (value) {
        case 'class':
          color = '#4a6cf7';
          break;
        case 'meeting':
          color = '#28a745';
          break;
        case 'personal':
          color = '#ffc107';
          break;
        default:
          color = '#4a6cf7';
      }
      
      setFormData(prev => ({
        ...prev,
        color
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, save event to API
    // For now, add or update it in local state
    const newEvent = {
      id: selectedEvent ? selectedEvent.id : `event-${Date.now()}`,
      ...formData
    };
    
    if (selectedEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? newEvent : event
      ));
      setShowEditModal(false);
    } else {
      // Add new event
      setEvents([...events, newEvent]);
      setShowAddModal(false);
    }
    
    // Reset form
    setFormData({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      type: 'class',
      description: '',
      students: [],
      course: '',
      link: '',
      color: '#4a6cf7'
    });
    
    setSelectedEvent(null);
  };

  const formatDateRange = () => {
    const { start, end } = getDateRangeForView();
    
    switch (viewMode) {
      case 'day':
        return `${days[start.getDay()]}, ${months[start.getMonth()]} ${start.getDate()}, ${start.getFullYear()}`;
      case 'week':
        return `${months[start.getMonth()]} ${start.getDate()} - ${months[end.getMonth()]} ${end.getDate()}, ${start.getFullYear()}`;
      case 'month':
        return `${months[start.getMonth()]} ${start.getFullYear()}`;
      default:
        return '';
    }
  };

  const renderDayView = () => {
    const hoursOfDay = [];
    for (let i = 8; i <= 21; i++) {
      hoursOfDay.push(`${i}:00`);
    }
    
    const currentDate = selectedDate.toISOString().split('T')[0];
    const dayEvents = events.filter(event => event.date === currentDate);
    
    return (
      <div className={styles.dayView}>
        <div className={styles.timeColumn}>
          {hoursOfDay.map(hour => (
            <div key={hour} className={styles.timeSlot}>
              <span className={styles.timeLabel}>{hour}</span>
            </div>
          ))}
        </div>
        <div className={styles.eventsColumn}>
          {hoursOfDay.map(hour => {
            const hourEvents = dayEvents.filter(event => event.startTime === hour);
            return (
              <div key={hour} className={styles.eventTimeSlot}>
                {hourEvents.map(event => (
                  <div 
                    key={event.id} 
                    className={styles.eventCard}
                    style={{ backgroundColor: event.color }}
                  >
                    <div className={styles.eventTime}>
                      {event.startTime} - {event.endTime}
                    </div>
                    <div className={styles.eventTitle}>{event.title}</div>
                    {event.type === 'class' && (
                      <div className={styles.eventCourse}>{event.course}</div>
                    )}
                    <div className={styles.eventActions}>
                      <button 
                        className={styles.editButton}
                        onClick={() => handleEditEvent(event)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className={styles.deleteButton}
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const { start } = getDateRangeForView();
    const weekDays = [];
    
    // Create array with the 7 days of the week
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      weekDays.push(day);
    }
    
    return (
      <div className={styles.weekView}>
        <div className={styles.weekHeader}>
          {weekDays.map(day => (
            <div key={day.toISOString()} className={styles.weekDay}>
              <div className={styles.dayName}>{days[day.getDay()].substring(0, 3)}</div>
              <div 
                className={`${styles.dayNumber} ${
                  day.toDateString() === new Date().toDateString() ? styles.today : ''
                }`}
              >
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.weekBody}>
          {weekDays.map(day => {
            const dayStr = day.toISOString().split('T')[0];
            const dayEvents = events.filter(event => event.date === dayStr);
            
            return (
              <div key={dayStr} className={styles.dayColumn}>
                {dayEvents.length > 0 ? (
                  dayEvents.map(event => (
                    <div 
                      key={event.id} 
                      className={styles.weekEventCard}
                      style={{ backgroundColor: event.color }}
                      onClick={() => handleEditEvent(event)}
                    >
                      <div className={styles.eventTime}>
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className={styles.eventTitle}>{event.title}</div>
                      {event.type === 'class' && event.course && (
                        <div className={styles.eventCourse}>{event.course}</div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className={styles.noEvents}>No events</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const { start } = getDateRangeForView();
    const daysInMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(start.getFullYear(), start.getMonth(), 1).getDay();
    
    // Create array for all days in the month plus padding
    const monthDays = [];
    
    // Add empty days for padding at start
    for (let i = 0; i < firstDayOfMonth; i++) {
      monthDays.push(null);
    }
    
    // Add all days in month
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(start.getFullYear(), start.getMonth(), i);
      monthDays.push(day);
    }
    
    // Group days into weeks
    const monthWeeks = [];
    for (let i = 0; i < monthDays.length; i += 7) {
      monthWeeks.push(monthDays.slice(i, i + 7));
    }
    
    // If the last week is not complete, add null padding
    const lastWeek = monthWeeks[monthWeeks.length - 1];
    if (lastWeek.length < 7) {
      for (let i = lastWeek.length; i < 7; i++) {
        lastWeek.push(null);
      }
    }
    
    return (
      <div className={styles.monthView}>
        <div className={styles.monthHeader}>
          {days.map(day => (
            <div key={day} className={styles.monthDay}>
              {day.substring(0, 3)}
            </div>
          ))}
        </div>
        <div className={styles.monthBody}>
          {monthWeeks.map((week, weekIndex) => (
            <div key={weekIndex} className={styles.monthWeek}>
              {week.map((day, dayIndex) => {
                if (!day) {
                  return <div key={`empty-${dayIndex}`} className={styles.emptyDay}></div>;
                }
                
                const dayStr = day.toISOString().split('T')[0];
                const dayEvents = events.filter(event => event.date === dayStr);
                const isToday = day.toDateString() === new Date().toDateString();
                
                return (
                  <div 
                    key={dayStr} 
                    className={`${styles.monthDayCell} ${isToday ? styles.today : ''}`}
                  >
                    <div className={styles.monthDayNumber}>{day.getDate()}</div>
                    <div className={styles.monthDayEvents}>
                      {dayEvents.slice(0, 3).map(event => (
                        <div 
                          key={event.id} 
                          className={styles.monthEventBadge}
                          style={{ backgroundColor: event.color }}
                          onClick={() => handleEditEvent(event)}
                        >
                          {event.title.substring(0, 15)}{event.title.length > 15 ? '...' : ''}
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className={styles.moreEvents}>+{dayEvents.length - 3} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderViewContent = () => {
    switch (viewMode) {
      case 'day':
        return renderDayView();
      case 'week':
        return renderWeekView();
      case 'month':
        return renderMonthView();
      default:
        return null;
    }
  };

  const renderEventForm = () => {
    return (
      <form onSubmit={handleFormSubmit} className={styles.eventForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            required
            placeholder="Enter event title"
          />
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleFormChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="type">Event Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleFormChange}
              required
            >
              <option value="class">Class</option>
              <option value="meeting">Meeting</option>
              <option value="personal">Personal</option>
            </select>
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="startTime">Start Time</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleFormChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="endTime">End Time</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleFormChange}
              required
            />
          </div>
        </div>
        
        {formData.type === 'class' && (
          <div className={styles.formGroup}>
            <label htmlFor="course">Course</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleFormChange}
              placeholder="Enter course name"
            />
          </div>
        )}
        
        {(formData.type === 'class' || formData.type === 'meeting') && (
          <div className={styles.formGroup}>
            <label htmlFor="link">Meeting Link</label>
            <input
              type="text"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleFormChange}
              placeholder="Enter meeting URL"
            />
          </div>
        )}
        
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            placeholder="Add details about this event"
            rows="3"
          />
        </div>
        
        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            <FaSave /> {selectedEvent ? 'Update Event' : 'Save Event'}
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setSelectedEvent(null);
            }}
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1><FaCalendarAlt className={styles.headerIcon} /> Schedule</h1>
          <p className={styles.subheader}>
            {currentUser?.displayName ? `Manage your classes and meetings, ${currentUser.displayName}` : 'Manage your classes and meetings'}
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <button
            className={styles.addButton}
            onClick={handleAddEvent}
          >
            <FaPlus /> Add Event
          </button>
        </div>
      </div>

      <div className={styles.calendarControls}>
        <div className={styles.periodNavigation}>
          <button 
            className={styles.navButton}
            onClick={handlePrevPeriod}
          >
            <FaChevronLeft />
          </button>
          <h2 className={styles.currentPeriod}>{formatDateRange()}</h2>
          <button 
            className={styles.navButton}
            onClick={handleNextPeriod}
          >
            <FaChevronRight />
          </button>
        </div>
        
        <div className={styles.viewControls}>
          <div className={styles.viewSwitcher}>
            <button 
              className={`${styles.viewButton} ${viewMode === 'day' ? styles.activeView : ''}`}
              onClick={() => setViewMode('day')}
            >
              Day
            </button>
            <button 
              className={`${styles.viewButton} ${viewMode === 'week' ? styles.activeView : ''}`}
              onClick={() => setViewMode('week')}
            >
              Week
            </button>
            <button 
              className={`${styles.viewButton} ${viewMode === 'month' ? styles.activeView : ''}`}
              onClick={() => setViewMode('month')}
            >
              Month
            </button>
          </div>
          
          <div className={styles.filterControls}>
            <span className={styles.filterLabel}><FaFilter /> Filter:</span>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Events</option>
              <option value="class">Classes</option>
              <option value="meeting">Meetings</option>
              <option value="personal">Personal</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.calendarContainer}>
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading your schedule...</p>
          </div>
        ) : (
          renderViewContent()
        )}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2><FaPlus /> Add New Event</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setShowAddModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className={styles.modalBody}>
              {renderEventForm()}
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {showEditModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2><FaEdit /> Edit Event</h2>
              <button 
                className={styles.closeButton}
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedEvent(null);
                }}
              >
                <FaTimes />
              </button>
            </div>
            <div className={styles.modalBody}>
              {renderEventForm()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleComponent;