import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
  FaMoneyBillWave, 
  FaCalendarAlt, 
  FaChartLine, 
  FaDownload, 
  FaFilter,
  FaWallet,
  FaCreditCard,
  FaPaypal,
  FaMobileAlt,
  FaChevronDown,
  FaCheckCircle
} from 'react-icons/fa';
import styles from './Earnings.module.css';

const Earnings = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [earnings, setEarnings] = useState([]);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    pendingPayouts: 0,
    monthlyAverage: 0,
    lastPayout: 0,
    enrolledStudents: 0
  });
  const [timeFilter, setTimeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('earnings');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [showDropdown, setShowDropdown] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchEarnings();
  }, [timeFilter]);

  const fetchEarnings = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to get earnings data
      // For now, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockEarnings = generateMockEarnings();
      setEarnings(mockEarnings);
      
      // Calculate statistics
      calculateStats(mockEarnings);
    } catch (error) {
      console.error("Error fetching earnings:", error);
      setError("Failed to load earnings data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateMockEarnings = () => {
    // Generate 12 months of random earnings data
    const mockData = [];
    const today = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      
      // Generate between 1-4 transactions per month
      const transactionsCount = Math.floor(Math.random() * 4) + 1;
      
      for (let j = 0; j < transactionsCount; j++) {
        const day = Math.floor(Math.random() * 28) + 1;
        date.setDate(day);
        
        const courseNames = [
          "Complete Web Development Bootcamp",
          "Advanced Python Programming",
          "Introduction to Machine Learning",
          "Mathematics for Data Science",
          "English Language Mastery",
          "Kiswahili for Beginners",
          "Graphic Design Essentials"
        ];
        
        const amountBase = Math.floor(Math.random() * 5000) + 1000;
        const amount = Math.round(amountBase / 100) * 100; // Round to nearest 100
        
        mockData.push({
          id: `trx-${i}-${j}-${Date.now()}`,
          date: new Date(date),
          amount: amount,
          course: courseNames[Math.floor(Math.random() * courseNames.length)],
          status: Math.random() > 0.2 ? 'completed' : 'pending',
          students: Math.floor(Math.random() * 5) + 1
        });
      }
    }
    
    // Sort by date descending
    return mockData.sort((a, b) => b.date - a.date);
  };

  const calculateStats = (data) => {
    // For total earnings, we'll include both completed and pending
    const totalEarnings = data.reduce((sum, item) => sum + item.amount, 0);
    
    // Pending payouts are transactions with 'pending' status
    const pendingPayouts = data
      .filter(item => item.status === 'pending')
      .reduce((sum, item) => sum + item.amount, 0);
    
    // Get unique months in the data
    const uniqueMonths = [...new Set(data.map(item => 
      `${item.date.getFullYear()}-${item.date.getMonth()}`
    ))];
    
    // Monthly average based on available months (avoid division by zero)
    const monthlyAverage = uniqueMonths.length > 0 
      ? totalEarnings / uniqueMonths.length 
      : 0;
    
    // Last payout is the most recent completed transaction
    const completedTransactions = data.filter(item => item.status === 'completed');
    const lastPayout = completedTransactions.length > 0 
      ? completedTransactions[0].amount 
      : 0;
    
    // Count unique students
    const enrolledStudents = [...new Set(data.map(item => item.students))].reduce((a, b) => a + b, 0);
    
    setStats({
      totalEarnings,
      pendingPayouts,
      monthlyAverage,
      lastPayout,
      enrolledStudents
    });
  };

  const filterEarningsByTime = (filter) => {
    setTimeFilter(filter);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return `KSh ${amount.toLocaleString()}`;
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setShowDropdown(false);
  };

  const renderPaymentMethodIcon = (method) => {
    switch (method) {
      case 'mpesa':
        return <FaMobileAlt />;
      case 'bank':
        return <FaCreditCard />;
      case 'paypal':
        return <FaPaypal />;
      default:
        return <FaWallet />;
    }
  };

  const renderEmptyState = () => (
    <div className={styles.emptyState}>
      <FaMoneyBillWave className={styles.emptyStateIcon} />
      <h3>No Earnings Yet</h3>
      <p>Your earnings will appear here once you have students enrolled in your courses.</p>
    </div>
  );

  const renderStats = () => (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <div className={styles.statIcon}>
          <FaMoneyBillWave />
        </div>
        <div className={styles.statInfo}>
          <span className={styles.statLabel}>Total Earnings</span>
          <span className={styles.statValue}>{formatCurrency(stats.totalEarnings)}</span>
        </div>
      </div>
      
      <div className={styles.statCard}>
        <div className={styles.statIcon}>
          <FaWallet />
        </div>
        <div className={styles.statInfo}>
          <span className={styles.statLabel}>Pending Payouts</span>
          <span className={styles.statValue}>{formatCurrency(stats.pendingPayouts)}</span>
        </div>
      </div>
      
      <div className={styles.statCard}>
        <div className={styles.statIcon}>
          <FaChartLine />
        </div>
        <div className={styles.statInfo}>
          <span className={styles.statLabel}>Monthly Average</span>
          <span className={styles.statValue}>{formatCurrency(stats.monthlyAverage)}</span>
        </div>
      </div>
      
      <div className={styles.statCard}>
        <div className={styles.statIcon}>
          <FaCalendarAlt />
        </div>
        <div className={styles.statInfo}>
          <span className={styles.statLabel}>Last Payout</span>
          <span className={styles.statValue}>{formatCurrency(stats.lastPayout)}</span>
        </div>
      </div>
    </div>
  );

  const renderEarningsList = () => (
    <div className={styles.earningsTable}>
      <div className={styles.tableHeader}>
        <div className={styles.tableHeaderCell}>Date</div>
        <div className={styles.tableHeaderCell}>Course</div>
        <div className={styles.tableHeaderCell}>Students</div>
        <div className={styles.tableHeaderCell}>Amount</div>
        <div className={styles.tableHeaderCell}>Status</div>
      </div>
      
      <div className={styles.tableBody}>
        {earnings.map((earning) => (
          <div key={earning.id} className={styles.tableRow}>
            <div className={styles.tableCell}>{formatDate(earning.date)}</div>
            <div className={styles.tableCell}>{earning.course}</div>
            <div className={styles.tableCell}>{earning.students}</div>
            <div className={styles.tableCell}>{formatCurrency(earning.amount)}</div>
            <div className={styles.tableCell}>
              <span className={`${styles.status} ${styles[earning.status]}`}>
                {earning.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentMethods = () => (
    <div className={styles.paymentMethodsContainer}>
      <div className={styles.paymentMethodSelector}>
        <h3>Payment Method</h3>
        <div className={styles.paymentDropdown}>
          <div 
            className={styles.selectedMethod}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className={styles.methodIcon}>
              {renderPaymentMethodIcon(paymentMethod)}
            </span>
            <span className={styles.methodName}>
              {paymentMethod === 'mpesa' ? 'M-Pesa' : 
               paymentMethod === 'bank' ? 'Bank Transfer' :
               paymentMethod === 'paypal' ? 'PayPal' : 'Other'}
            </span>
            <FaChevronDown className={styles.dropdownIcon} />
          </div>
          
          {showDropdown && (
            <div className={styles.methodsDropdown}>
              <div 
                className={`${styles.methodOption} ${paymentMethod === 'mpesa' ? styles.selected : ''}`}
                onClick={() => handlePaymentMethodChange('mpesa')}
              >
                <FaMobileAlt className={styles.methodOptionIcon} />
                <span>M-Pesa</span>
                {paymentMethod === 'mpesa' && <FaCheckCircle className={styles.checkIcon} />}
              </div>
              
              <div 
                className={`${styles.methodOption} ${paymentMethod === 'bank' ? styles.selected : ''}`}
                onClick={() => handlePaymentMethodChange('bank')}
              >
                <FaCreditCard className={styles.methodOptionIcon} />
                <span>Bank Transfer</span>
                {paymentMethod === 'bank' && <FaCheckCircle className={styles.checkIcon} />}
              </div>
              
              <div 
                className={`${styles.methodOption} ${paymentMethod === 'paypal' ? styles.selected : ''}`}
                onClick={() => handlePaymentMethodChange('paypal')}
              >
                <FaPaypal className={styles.methodOptionIcon} />
                <span>PayPal</span>
                {paymentMethod === 'paypal' && <FaCheckCircle className={styles.checkIcon} />}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {paymentMethod === 'mpesa' && (
        <div className={styles.methodDetailsCard}>
          <h3>M-Pesa Details</h3>
          <div className={styles.detailsForm}>
            <div className={styles.formRow}>
              <label>Phone Number</label>
              <input type="text" placeholder="Enter M-Pesa number (e.g. 254712345678)" />
            </div>
            <div className={styles.formRow}>
              <label>Full Name</label>
              <input type="text" placeholder="Name as registered with M-Pesa" />
            </div>
            <button className={styles.saveButton}>
              <FaCheckCircle /> Save Payment Details
            </button>
            <p className={styles.paymentNote}>
              Payouts to M-Pesa are processed every Friday. Minimum payout amount is KSh 1,000.
            </p>
          </div>
        </div>
      )}
      
      {paymentMethod === 'bank' && (
        <div className={styles.methodDetailsCard}>
          <h3>Bank Account Details</h3>
          <div className={styles.detailsForm}>
            <div className={styles.formRow}>
              <label>Bank Name</label>
              <input type="text" placeholder="Enter your bank name" />
            </div>
            <div className={styles.formRow}>
              <label>Account Number</label>
              <input type="text" placeholder="Enter account number" />
            </div>
            <div className={styles.formRow}>
              <label>Account Holder Name</label>
              <input type="text" placeholder="Enter account holder name" />
            </div>
            <div className={styles.formRow}>
              <label>Branch Code</label>
              <input type="text" placeholder="Enter branch code" />
            </div>
            <button className={styles.saveButton}>
              <FaCheckCircle /> Save Payment Details
            </button>
            <p className={styles.paymentNote}>
              Bank transfers are processed within 3-5 business days. Minimum payout amount is KSh 5,000.
            </p>
          </div>
        </div>
      )}
      
      {paymentMethod === 'paypal' && (
        <div className={styles.methodDetailsCard}>
          <h3>PayPal Details</h3>
          <div className={styles.detailsForm}>
            <div className={styles.formRow}>
              <label>PayPal Email</label>
              <input type="email" placeholder="Enter PayPal email address" />
            </div>
            <button className={styles.saveButton}>
              <FaCheckCircle /> Save Payment Details
            </button>
            <p className={styles.paymentNote}>
              PayPal payouts are processed within 1-2 business days. International transaction fees may apply. Minimum payout amount is KSh 2,000.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  if (loading && !earnings.length) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner}></div>
        <p>Loading earnings data...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1><FaMoneyBillWave className={styles.headerIcon} /> Earnings Dashboard</h1>
          <p className={styles.subheader}>Track your income and manage payment methods</p>
        </div>
        
        <div className={styles.headerActions}>
          <button className={styles.downloadButton}>
            <FaDownload /> Download Statement
          </button>
        </div>
      </div>

      {error ? (
        <div className={styles.errorState}>
          <p>{error}</p>
          <button onClick={fetchEarnings} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      ) : (
        <>
          {renderStats()}
          
          <div className={styles.contentTabs}>
            <div 
              className={`${styles.tab} ${activeTab === 'earnings' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('earnings')}
            >
              <FaMoneyBillWave /> Earnings History
            </div>
            <div 
              className={`${styles.tab} ${activeTab === 'payments' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              <FaWallet /> Payment Methods
            </div>
          </div>
          
          {activeTab === 'earnings' && (
            <div className={styles.earningsSection}>
              <div className={styles.filtersBar}>
                <div className={styles.filterGroup}>
                  <span className={styles.filterLabel}><FaFilter /> Filter by: </span>
                  <div className={styles.filterOptions}>
                    <button 
                      className={`${styles.filterOption} ${timeFilter === 'all' ? styles.activeFilter : ''}`}
                      onClick={() => filterEarningsByTime('all')}
                    >
                      All Time
                    </button>
                    <button 
                      className={`${styles.filterOption} ${timeFilter === 'month' ? styles.activeFilter : ''}`}
                      onClick={() => filterEarningsByTime('month')}
                    >
                      This Month
                    </button>
                    <button 
                      className={`${styles.filterOption} ${timeFilter === 'year' ? styles.activeFilter : ''}`}
                      onClick={() => filterEarningsByTime('year')}
                    >
                      This Year
                    </button>
                  </div>
                </div>
              </div>
              
              {earnings.length > 0 ? renderEarningsList() : renderEmptyState()}
            </div>
          )}
          
          {activeTab === 'payments' && renderPaymentMethods()}
        </>
      )}
    </div>
  );
};

export default Earnings;