import React, { useState, useEffect } from 'react';
import { FiDownload, FiCalendar, FiCreditCard, FiFileText, FiFilter, FiSearch, FiChevronDown, FiAlertCircle } from 'react-icons/fi';
import styles from './Payments.module.css';

const Payments = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payments, setPayments] = useState([]);
  const [upcomingPayments, setUpcomingPayments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [newPayment, setNewPayment] = useState({
    method: 'mpesa',
    amount: '',
    description: '',
    childName: ''
  });

  // Mock payment data with Kenyan context
  const mockPayments = [
    {
      id: 'PAY-12345',
      date: '2023-09-05',
      amount: 15000,
      description: 'Term 3 Tuition Fee - Wambui Mwangi',
      status: 'paid',
      paymentMethod: 'M-Pesa',
      transactionId: 'MPE3456789',
      receiptUrl: '#'
    },
    {
      id: 'PAY-12346',
      date: '2023-09-05',
      amount: 5000,
      description: 'Music Lessons - Wambui Mwangi',
      status: 'paid',
      paymentMethod: 'M-Pesa',
      transactionId: 'MPE3456790',
      receiptUrl: '#'
    },
    {
      id: 'PAY-12347',
      date: '2023-08-15',
      amount: 3500,
      description: 'Science Lab Materials - Gitau Mwangi',
      status: 'paid',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN7891234',
      receiptUrl: '#'
    },
    {
      id: 'PAY-12348',
      date: '2023-07-20',
      amount: 15000,
      description: 'Term 2 Tuition Fee - Wambui Mwangi',
      status: 'paid',
      paymentMethod: 'M-Pesa',
      transactionId: 'MPE7654321',
      receiptUrl: '#'
    },
    {
      id: 'PAY-12349',
      date: '2023-07-20',
      amount: 15000,
      description: 'Term 2 Tuition Fee - Gitau Mwangi',
      status: 'paid',
      paymentMethod: 'Bank Transfer',
      transactionId: 'BTF8765432',
      receiptUrl: '#'
    },
    {
      id: 'PAY-12350',
      date: '2023-06-10',
      amount: 4500,
      description: 'Mathematics Online Course - Gitau Mwangi',
      status: 'paid',
      paymentMethod: 'M-Pesa',
      transactionId: 'MPE1234567',
      receiptUrl: '#'
    },
    {
      id: 'PAY-12351',
      date: '2023-05-15',
      amount: 2000,
      description: 'Kiswahili Literature Books - Wambui Mwangi',
      status: 'paid',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN4567890',
      receiptUrl: '#'
    }
  ];

  // Mock upcoming payments
  const mockUpcomingPayments = [
    {
      id: 'UP-12345',
      dueDate: '2023-12-15',
      amount: 15000,
      description: 'Term 1 Tuition Fee - Wambui Mwangi',
      status: 'pending'
    },
    {
      id: 'UP-12346',
      dueDate: '2023-12-15',
      amount: 15000,
      description: 'Term 1 Tuition Fee - Gitau Mwangi',
      status: 'pending'
    },
    {
      id: 'UP-12347',
      dueDate: '2023-11-30',
      amount: 3000,
      description: 'Computer Lab Access Fee - Gitau Mwangi',
      status: 'pending'
    }
  ];

  // Initialize data on component mount
  useEffect(() => {
    setLoading(true);
    try {
      // Set payments data
      setPayments(mockPayments);
      setUpcomingPayments(mockUpcomingPayments);
    } catch (err) {
      console.error('Error loading payment data:', err);
      setError('Failed to load payment data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter payments based on search query and filters
  const getFilteredPayments = () => {
    return payments.filter(payment => {
      // Filter by search query
      const matchesSearch = payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by payment status
      const matchesStatusFilter = filter === 'all' || payment.status === filter;

      // Filter by date
      const paymentDate = new Date(payment.date);
      const currentDate = new Date();
      let matchesDateFilter = true;

      if (dateFilter === 'lastMonth') {
        const lastMonth = new Date();
        lastMonth.setMonth(currentDate.getMonth() - 1);
        matchesDateFilter = paymentDate >= lastMonth && paymentDate <= currentDate;
      } else if (dateFilter === 'last3Months') {
        const last3Months = new Date();
        last3Months.setMonth(currentDate.getMonth() - 3);
        matchesDateFilter = paymentDate >= last3Months && paymentDate <= currentDate;
      } else if (dateFilter === 'last6Months') {
        const last6Months = new Date();
        last6Months.setMonth(currentDate.getMonth() - 6);
        matchesDateFilter = paymentDate >= last6Months && paymentDate <= currentDate;
      }

      return matchesSearch && matchesStatusFilter && matchesDateFilter;
    });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Handle date filter change
  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  // Format amount as Kenyan Shillings
  const formatAmount = (amount) => {
    return `KSh ${amount.toLocaleString('en-KE')}`;
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

  // Handle new payment input changes
  const handleNewPaymentChange = (e) => {
    const { name, value } = e.target;
    setNewPayment({
      ...newPayment,
      [name]: value
    });
  };

  // Handle payment submission
  const handleSubmitPayment = (e) => {
    e.preventDefault();
    // Would normally send to API here
    console.log('Submitting payment:', newPayment);
    
    // Close modal and reset form
    setShowAddPaymentModal(false);
    setNewPayment({
      method: 'mpesa',
      amount: '',
      description: '',
      childName: ''
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading payment information...</p>
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
    <div className={styles.paymentsContainer}>
      <div className={styles.paymentHeader}>
        <h2>Payments</h2>
        <p>Manage your payments and see transaction history</p>
      </div>
      
      {/* Payment Summary Cards */}
      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <FiCreditCard />
          </div>
          <div className={styles.summaryInfo}>
            <h3>Total Paid (2023)</h3>
            <p className={styles.summaryAmount}>
              {formatAmount(mockPayments.reduce((total, payment) => total + payment.amount, 0))}
            </p>
          </div>
        </div>
        
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <FiCalendar />
          </div>
          <div className={styles.summaryInfo}>
            <h3>Upcoming Payments</h3>
            <p className={styles.summaryAmount}>
              {formatAmount(mockUpcomingPayments.reduce((total, payment) => total + payment.amount, 0))}
            </p>
          </div>
        </div>
        
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <FiFileText />
          </div>
          <div className={styles.summaryInfo}>
            <h3>Last Payment</h3>
            <p className={styles.summaryAmount}>
              {formatAmount(mockPayments[0].amount)}
              <span className={styles.summaryDate}>{formatDate(mockPayments[0].date)}</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Upcoming Payments Section */}
      <div className={styles.upcomingPaymentsSection}>
        <div className={styles.sectionHeader}>
          <h3>Upcoming Payments</h3>
          <button 
            className={styles.addPaymentButton}
            onClick={() => setShowAddPaymentModal(true)}
          >
            Make a Payment
          </button>
        </div>
        
        <div className={styles.upcomingPaymentsList}>
          {upcomingPayments.length === 0 ? (
            <div className={styles.noPayments}>
              <p>No upcoming payments scheduled</p>
            </div>
          ) : (
            upcomingPayments.map(payment => (
              <div key={payment.id} className={styles.upcomingPaymentItem}>
                <div className={styles.upcomingPaymentInfo}>
                  <h4>{payment.description}</h4>
                  <div className={styles.upcomingPaymentMeta}>
                    <span className={styles.upcomingPaymentDue}>
                      Due: {formatDate(payment.dueDate)}
                    </span>
                  </div>
                </div>
                <div className={styles.upcomingPaymentAmount}>
                  {formatAmount(payment.amount)}
                </div>
                <button className={styles.payNowButton}>
                  Pay Now
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Payment History Section */}
      <div className={styles.paymentHistorySection}>
        <div className={styles.sectionHeader}>
          <h3>Payment History</h3>
        </div>
        
        {/* Search and Filters */}
        <div className={styles.filtersContainer}>
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} />
            <input 
              type="text"
              placeholder="Search payments..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label htmlFor="status-filter">Status:</label>
              <select 
                id="status-filter" 
                value={filter}
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <label htmlFor="date-filter">Period:</label>
              <select 
                id="date-filter"
                value={dateFilter}
                onChange={handleDateFilterChange}
              >
                <option value="all">All Time</option>
                <option value="lastMonth">Last Month</option>
                <option value="last3Months">Last 3 Months</option>
                <option value="last6Months">Last 6 Months</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Payment History Table */}
        <div className={styles.paymentHistoryTableContainer}>
          <table className={styles.paymentHistoryTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Transaction ID</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredPayments().length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.noPaymentsCell}>
                    No payment records found
                  </td>
                </tr>
              ) : (
                getFilteredPayments().map(payment => (
                  <tr key={payment.id}>
                    <td>{formatDate(payment.date)}</td>
                    <td className={styles.descriptionCell}>{payment.description}</td>
                    <td className={styles.amountCell}>{formatAmount(payment.amount)}</td>
                    <td>{payment.paymentMethod}</td>
                    <td className={styles.transactionCell}>{payment.transactionId}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[payment.status]}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <a href={payment.receiptUrl} className={styles.downloadButton}>
                        <FiDownload /> PDF
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add Payment Modal */}
      {showAddPaymentModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Make a Payment</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setShowAddPaymentModal(false)}
              >
                &times;
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <form onSubmit={handleSubmitPayment}>
                <div className={styles.formGroup}>
                  <label htmlFor="childName">Child's Name</label>
                  <select
                    id="childName"
                    name="childName"
                    value={newPayment.childName}
                    onChange={handleNewPaymentChange}
                    required
                  >
                    <option value="">Select a child</option>
                    <option value="Wambui Mwangi">Wambui Mwangi</option>
                    <option value="Gitau Mwangi">Gitau Mwangi</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="description">Payment Description</label>
                  <select
                    id="description"
                    name="description"
                    value={newPayment.description}
                    onChange={handleNewPaymentChange}
                    required
                  >
                    <option value="">Select payment type</option>
                    <option value="Tuition Fee">Tuition Fee</option>
                    <option value="Extra-curricular Activities">Extra-curricular Activities</option>
                    <option value="Learning Materials">Learning Materials</option>
                    <option value="Online Course">Online Course</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="amount">Amount (KSh)</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={newPayment.amount}
                    onChange={handleNewPaymentChange}
                    placeholder="Enter amount"
                    min="1"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Payment Method</label>
                  <div className={styles.paymentMethodOptions}>
                    <div className={styles.paymentMethodOption}>
                      <input
                        type="radio"
                        id="method-mpesa"
                        name="method"
                        value="mpesa"
                        checked={newPayment.method === 'mpesa'}
                        onChange={handleNewPaymentChange}
                      />
                      <label htmlFor="method-mpesa" className={styles.methodLabel}>
                        <div className={styles.methodIcon}>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png" alt="M-Pesa" />
                        </div>
                        <span>M-Pesa</span>
                      </label>
                    </div>
                    
                    <div className={styles.paymentMethodOption}>
                      <input
                        type="radio"
                        id="method-card"
                        name="method"
                        value="card"
                        checked={newPayment.method === 'card'}
                        onChange={handleNewPaymentChange}
                      />
                      <label htmlFor="method-card" className={styles.methodLabel}>
                        <div className={styles.methodIcon}>
                          <FiCreditCard />
                        </div>
                        <span>Credit/Debit Card</span>
                      </label>
                    </div>
                    
                    <div className={styles.paymentMethodOption}>
                      <input
                        type="radio"
                        id="method-bank"
                        name="method"
                        value="bank"
                        checked={newPayment.method === 'bank'}
                        onChange={handleNewPaymentChange}
                      />
                      <label htmlFor="method-bank" className={styles.methodLabel}>
                        <div className={styles.methodIcon}>
                          <FiCreditCard />
                        </div>
                        <span>Bank Transfer</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className={styles.formActions}>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={() => setShowAddPaymentModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={styles.confirmButton}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments; 