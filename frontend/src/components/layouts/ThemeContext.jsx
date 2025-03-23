import { createContext, useContext, useEffect, useState } from 'react';

// Create ThemeContext
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Get initial theme from localStorage or default to false
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    // Store preference in localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easy usage
export const useTheme = () => useContext(ThemeContext);
