import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component will scroll the window to the top whenever the location changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useLayoutEffect(() => {
    // Scroll to top with smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  // This component doesn't render anything
  return null;
};

export default ScrollToTop; 