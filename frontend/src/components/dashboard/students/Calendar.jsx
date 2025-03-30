import React, { useState } from 'react';
import styles from './Calendar.module.css';
import { format, addMonths, addWeeks, addDays, subMonths, subWeeks, 
  subDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  isSameMonth, isSameDay, isToday, parseISO, differenceInDays } from 'date-fns';
import { useAuth } from '../../../context/AuthContext';

const Calendar = () => {
  // Sample event data
  const sampleEvents = [
    {
      id: 1,
      title: 'Mathematics Test',
      type: 'exam',
      startDate: '2023-07-15T09:00:00',
      endDate: '2023-07-15T11:00:00',
      location: 'Room 301',
      description: 'End of term mathematics examination covering algebra, calculus, and statistics.',
      subject: 'Mathematics',
      color: '#FF5630'
    },
    {
      id: 2,
      title: 'History Assignment Due',
      type: 'assignment',
      startDate: '2023-07-18T23:59:00',
      endDate: '2023-07-18T23:59:00',
      location: 'Online Submission',
      description: 'Submit your research paper on World War II through the learning management system.',
      subject: 'History',
      color: '#36B37E'
    },
    {
      id: 3,
      title: 'Science Lab Session',
      type: 'class',
      startDate: '2023-07-20T14:00:00',
      endDate: '2023-07-20T16:00:00',
      location: 'Science Lab 2',
      description: 'Practical session on chemical reactions. Bring your lab coat and safety goggles.',
      subject: 'Science',
      color: '#00B8D9'
    },
    {
      id: 4,
      title: 'English Literature Discussion',
      type: 'meeting',
      startDate: '2023-07-22T10:00:00',
      endDate: '2023-07-22T11:30:00',
      location: 'Library Conference Room',
      description: 'Group discussion on Shakespeare\'s Macbeth. Come prepared having read Act III.',
      subject: 'English',
      color: '#6554C0'
    },
    {
      id: 5,
      title: 'Computer Science Project Deadline',
      type: 'assignment',
      startDate: '2023-07-25T17:00:00',
      endDate: '2023-07-25T17:00:00',
      location: 'Online Submission',
      description: 'Final deadline for submitting your programming project including source code and documentation.',
      subject: 'Computer Science',
      color: '#FFAB00'
    },
    {
      id: 6,
      title: 'Mathematics Tutorial',
      type: 'class',
      startDate: '2023-07-27T13:00:00',
      endDate: '2023-07-27T14:30:00',
      location: 'Room 105',
      description: 'Extra tutorial session focusing on preparation for the upcoming final examination.',
      subject: 'Mathematics',
      color: '#FF5630'
    },
    {
      id: 7,
      title: 'Study Group Meeting',
      type: 'meeting',
      startDate: '2023-07-28T16:00:00',
      endDate: '2023-07-28T18:00:00',
      location: 'Student Center',
      description: 'Weekly study group meeting to prepare for final exams.',
      subject: 'General',
      color: '#8993A4'
    }
  ];

  const { currentUser } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeView, setActiveView] = useState('month'); // 'month', 'week', 'day'
  const [events] = useState(sampleEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get first day of the month
  const monthStart = startOfMonth(currentDate);
  // Get last day of the month
  const monthEnd = endOfMonth(currentDate);
  // Get first day of the first week of the month view
  const startDateMonth = startOfWeek(monthStart);
  // Get last day of the last week of the month view
  const endDateMonth = endOfWeek(monthEnd);

  // Get first day of the week
  const weekStart = startOfWeek(currentDate);
  // Get last day of the week
  const weekEnd = endOfWeek(currentDate);

  // Navigation functions
  const prevPeriod = () => {
    if (activeView === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (activeView === 'week') {
      setCurrentDate(subWeeks(currentDate, 1));
    } else if (activeView === 'day') {
      setCurrentDate(subDays(currentDate, 1));
    }
  };

  const nextPeriod = () => {
    if (activeView === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (activeView === 'week') {
      setCurrentDate(addWeeks(currentDate, 1));
    } else if (activeView === 'day') {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const changeView = (view) => {
    setActiveView(view);
  };

  // Event handlers
  const onDateClick = (day) => {
    setSelectedDate(day);
    if (activeView !== 'day') {
      setCurrentDate(day);
      setActiveView('day');
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Format date for display
  const formatMonthTitle = (date) => {
    return format(date, 'MMMM yyyy');
  };

  const formatWeekTitle = (start, end) => {
    return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
  };

  const formatDayTitle = (date) => {
    return format(date, 'EEEE, MMMM d, yyyy');
  };

  // Helper functions
  const getEventIcon = (type) => {
    switch (type) {
      case 'exam':
        return '📝';
      case 'assignment':
        return '📘';
      case 'class':
        return '👨‍🏫';
      case 'meeting':
        return '👥';
      default:
        return '📅';
    }
  };

  const formatEventTime = (startDate, endDate) => {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    
    return `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
  };

  const formatEventDate = (date) => {
    const eventDate = parseISO(date);
    return format(eventDate, 'EEE, MMM d');
  };

  const getDaysUntilEvent = (date) => {
    const eventDate = parseISO(date);
    const today = new Date();
    
    return differenceInDays(eventDate, today);
  };

  // Generate calendar days for month view
  const renderDaysInMonth = () => {
    const rows = [];
    let days = [];
    let currentDay = startDateMonth;
    
    // Generate the header for days of the week
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      daysOfWeek.push(
        <div key={i} className={styles.weekDay}>
          {format(addDays(startOfWeek(new Date()), i), 'EEE')}
        </div>
      );
    }
    
    // Generate the days of the month
    while (currentDay <= endDateMonth) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = currentDay;
        const dayEvents = events.filter(event => 
          isSameDay(parseISO(event.startDate), cloneDay)
        );
        
        days.push(
          <div
            key={currentDay}
            className={`${styles.monthDay} 
              ${!isSameMonth(currentDay, monthStart) ? styles.otherMonth : ''} 
              ${isToday(currentDay) ? styles.today : ''} 
              ${isSameDay(currentDay, selectedDate) ? styles.selected : ''}`}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className={styles.dayNumber}>
              {format(currentDay, 'd')}
            </div>
            <div className={styles.dayEvents}>
              {dayEvents.slice(0, 2).map(event => (
                <div 
                  key={event.id}
                  className={styles.dayEvent}
                  style={{borderLeftColor: event.color}}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEventClick(event);
                  }}
                >
                  <div className={styles.eventTitle}>{event.title}</div>
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className={styles.moreEvents}>
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          </div>
        );
        currentDay = addDays(currentDay, 1);
      }
      rows.push(
        <div key={currentDay} className={styles.monthDays}>
          {days}
        </div>
      );
      days = [];
    }
    
    return (
      <div className={styles.monthView}>
        <div className={styles.weekDays}>
          {daysOfWeek}
        </div>
        {rows}
      </div>
    );
  };

  // Generate hours for week view
  const renderWeekView = () => {
    const hours = [];
    
    // Generate the header for days of the week
    const daysOfWeek = [<div key="time-header" className={styles.weekDayHeader}></div>];
    for (let i = 0; i < 7; i++) {
      const currentDay = addDays(weekStart, i);
      daysOfWeek.push(
        <div
          key={i}
          className={`${styles.weekDayHeader} 
            ${isToday(currentDay) ? styles.today : ''} 
            ${isSameDay(currentDay, selectedDate) ? styles.selected : ''}`}
          onClick={() => onDateClick(currentDay)}
        >
          {format(currentDay, 'EEE')}
          <div className={styles.weekDayNumber}>
            {format(currentDay, 'd')}
          </div>
        </div>
      );
    }
    
    // Generate the rows for each hour
    for (let hour = 7; hour < 20; hour++) {
      const hourCells = [
        <div key={`hour-${hour}`} className={styles.hourLabel}>
          {format(new Date().setHours(hour, 0, 0), 'h a')}
        </div>
      ];
      
      for (let i = 0; i < 7; i++) {
        const currentDay = addDays(weekStart, i);
        const hourEvents = events.filter(event => {
          const eventStart = parseISO(event.startDate);
          return isSameDay(eventStart, currentDay) && eventStart.getHours() === hour;
        });
        
        hourCells.push(
          <div
            key={`day-${i}-hour-${hour}`}
            className={styles.weekCell}
            onClick={() => onDateClick(currentDay)}
          >
            {hourEvents.map(event => (
              <div
                key={event.id}
                className={styles.weekEvent}
                style={{backgroundColor: event.color}}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEventClick(event);
                }}
              >
                {event.title}
              </div>
            ))}
          </div>
        );
      }
      
      hours.push(
        <div key={`hour-row-${hour}`} className={styles.hourRow}>
          {hourCells}
        </div>
      );
    }
    
    return (
      <div className={styles.weekView}>
        <div className={styles.weekHeader}>
          {daysOfWeek}
        </div>
        <div className={styles.weekGrid}>
          {hours}
        </div>
      </div>
    );
  };

  // Generate day view
  const renderDayView = () => {
    const hours = [];
    
    // Generate the rows for each hour
    for (let hour = 7; hour < 20; hour++) {
      const hourEvents = events.filter(event => {
        const eventStart = parseISO(event.startDate);
        return isSameDay(eventStart, selectedDate) && eventStart.getHours() === hour;
      });
      
      hours.push(
        <div key={`hour-row-${hour}`} className={styles.hourRow}>
          <div className={styles.hourLabel}>
            {format(new Date().setHours(hour, 0, 0), 'h a')}
          </div>
          <div className={styles.hourEvents}>
            {hourEvents.map(event => (
              <div
                key={event.id}
                className={styles.dayEvent}
                style={{borderLeftColor: event.color}}
                onClick={() => handleEventClick(event)}
              >
                <div className={styles.eventTime}>
                  {formatEventTime(event.startDate, event.endDate)}
                </div>
                <div className={styles.eventTitle}>{event.title}</div>
                <div className={styles.eventLocation}>{event.location}</div>
              </div>
            ))}
            {hourEvents.length === 0 && <div className={styles.noEvents}></div>}
          </div>
        </div>
      );
    }
    
    return (
      <div className={styles.dayView}>
        <div className={styles.dayHeader}>
          <h3>{formatDayTitle(selectedDate)}</h3>
        </div>
        <div className={styles.dayGrid}>
          {hours}
        </div>
      </div>
    );
  };

  // Upcoming events section
  const renderUpcomingEvents = () => {
    const today = new Date();
    const upcomingEvents = events
      .filter(event => new Date(event.startDate) >= today)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      .slice(0, 5);
    
    return (
      <div className={styles.upcomingEvents}>
        <h3 className={styles.upcomingEventsTitle}>Upcoming Events</h3>
        <div className={styles.eventsList}>
          {upcomingEvents.map(event => {
            const daysUntil = getDaysUntilEvent(event.startDate);
            let daysText = "";
            
            if (daysUntil === 0) {
              daysText = "Today";
            } else if (daysUntil === 1) {
              daysText = "Tomorrow";
            } else {
              daysText = `In ${daysUntil} days`;
            }
            
            return (
              <div 
                key={event.id} 
                className={styles.eventItem}
                onClick={() => handleEventClick(event)}
              >
                <div 
                  className={styles.eventColorDot}
                  style={{backgroundColor: event.color}}
                ></div>
                <div className={styles.eventInfo}>
                  <div className={styles.eventItemTitle}>
                    {getEventIcon(event.type)} {event.title}
                  </div>
                  <div className={styles.eventItemDate}>
                    {formatEventDate(event.startDate)} - {daysText}
                  </div>
                </div>
              </div>
            );
          })}
          {upcomingEvents.length === 0 && (
            <div>No upcoming events scheduled.</div>
          )}
        </div>
      </div>
    );
  };

  // Event detail modal
  const renderEventModal = () => {
    if (!selectedEvent) return null;
    
    const startDate = parseISO(selectedEvent.startDate);
    const endDate = parseISO(selectedEvent.endDate);
    
    return (
      <div className={styles.modalOverlay} onClick={closeModal}>
        <div 
          className={styles.eventModal} 
          onClick={e => e.stopPropagation()}
        >
          <div 
            className={styles.eventModalHeader}
            style={{backgroundColor: selectedEvent.color}}
          >
            <h3>{selectedEvent.title}</h3>
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>
          </div>
          <div className={styles.eventModalBody}>
            <div className={styles.eventDetail}>
              <div className={styles.eventDetailLabel}>Type</div>
              <div className={styles.eventDetailValue}>
                {getEventIcon(selectedEvent.type)} {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
              </div>
            </div>
            <div className={styles.eventDetail}>
              <div className={styles.eventDetailLabel}>Date & Time</div>
              <div className={styles.eventDetailValue}>
                {format(startDate, 'EEEE, MMMM d, yyyy')}
                <br />
                {format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}
              </div>
            </div>
            <div className={styles.eventDetail}>
              <div className={styles.eventDetailLabel}>Location</div>
              <div className={styles.eventDetailValue}>{selectedEvent.location}</div>
            </div>
            {selectedEvent.subject && (
              <div className={styles.eventDetail}>
                <div className={styles.eventDetailLabel}>Subject</div>
                <div className={styles.eventDetailValue}>{selectedEvent.subject}</div>
              </div>
            )}
            <div className={styles.eventDetail}>
              <div className={styles.eventDetailLabel}>Description</div>
              <div className={styles.eventDetailValue}>{selectedEvent.description}</div>
            </div>
          </div>
          <div className={styles.eventModalFooter}>
            <button className={styles.actionButton}>
              Add to Google Calendar
            </button>
            <button className={styles.actionButton}>
              Set Reminder
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render the calendar based on the active view
  const renderCalendar = () => {
    switch (activeView) {
      case 'month':
        return renderDaysInMonth();
      case 'week':
        return renderWeekView();
      case 'day':
        return renderDayView();
      default:
        return renderDaysInMonth();
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <h1 className={styles.calendarTitle}>
          {currentUser?.displayName ? `${currentUser.displayName}'s Calendar` : 'Academic Calendar'}
        </h1>
        <p className={styles.calendarSubtitle}>
          Keep track of your classes, exams, assignments, and important academic events
        </p>
      </div>
      
      <div className={styles.calendarControls}>
        <div className={styles.viewButtons}>
          <button 
            className={`${styles.viewButton} ${activeView === 'month' ? styles.activeView : ''}`}
            onClick={() => changeView('month')}
          >
            Month
          </button>
          <button 
            className={`${styles.viewButton} ${activeView === 'week' ? styles.activeView : ''}`}
            onClick={() => changeView('week')}
          >
            Week
          </button>
          <button 
            className={`${styles.viewButton} ${activeView === 'day' ? styles.activeView : ''}`}
            onClick={() => changeView('day')}
          >
            Day
          </button>
        </div>
        
        <div className={styles.currentPeriod}>
          {activeView === 'month' && formatMonthTitle(currentDate)}
          {activeView === 'week' && formatWeekTitle(weekStart, weekEnd)}
          {activeView === 'day' && formatDayTitle(currentDate)}
        </div>
        
        <div className={styles.navigationButtons}>
          <button 
            className={styles.todayButton}
            onClick={goToToday}
          >
            Today
          </button>
          <button 
            className={styles.navButton}
            onClick={prevPeriod}
          >
            &lt;
          </button>
          <button 
            className={styles.navButton}
            onClick={nextPeriod}
          >
            &gt;
          </button>
        </div>
      </div>
      
      <div className={styles.calendarContent}>
        {renderCalendar()}
      </div>
      
      {renderUpcomingEvents()}
      
      {isModalOpen && renderEventModal()}
    </div>
  );
};

export default Calendar; 