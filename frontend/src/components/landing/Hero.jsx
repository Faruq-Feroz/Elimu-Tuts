import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import styles from './Hero.module.css';
import Hero1 from '../../assets/Hero/Hero1.jpg';

const HeroSection = () => {
  // State for controlling image loading
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Preload images
  useEffect(() => {
    // Create array of image URLs to preload
    const imageUrls = [
      "https://blog.gradely.co/wp-content/uploads/2020/11/online-class-pix.jpg",
      Hero1,
      'https://media.gettyimages.com/id/1401178950/photo/african-man-sitting-inside-a-library-alone-doing-research-man-working-on-a-project-young-man.jpg?s=612x612&w=0&k=20&c=SAl-9_vsLragc7JvOvmW86lu0SOQ7dB828sYe2LMrAU='
    ];
    
    // Preload images
    let loadedCount = 0;
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setImagesLoaded(true);
        }
      };
    });
    
    // Set loaded to true after 2 seconds even if images haven't loaded
    const timeout = setTimeout(() => {
      setImagesLoaded(true);
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const carouselItems = [
    {
      image: "https://blog.gradely.co/wp-content/uploads/2020/11/online-class-pix.jpg",
      smallText: 'Accessible Education',
      title: 'LEARN WITH ELIMU TUTS',
      description: 'Unlock quality CBC-aligned education from anywhere in Kenya.'
    },
    {
      image: Hero1,
      smallText: 'Empowering Students',
      title: 'YOUR LEARNING JOURNEY STARTS HERE',
      description: 'Discover interactive lessons, quizzes, and resources tailored to your needs.'
    },
    {
      image: 'https://media.gettyimages.com/id/1401178950/photo/african-man-sitting-inside-a-library-alone-doing-research-man-working-on-a-project-young-man.jpg?s=612x612&w=0&k=20&c=SAl-9_vsLragc7JvOvmW86lu0SOQ7dB828sYe2LMrAU=',
      smallText: 'Connecting Educators',
      title: 'TEACH AND EARN WITH ELIMU TUTS',
      description: 'Join our platform to share your expertise and reach students across the nation.'
    }
  ];

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  // Custom navigation button components
  const CustomPrevButton = ({ onClick }) => (
    <button 
      onClick={onClick} 
      className={styles.carouselControlBtn}
      aria-label="Previous slide"
    >
      <BsArrowLeft />
    </button>
  );

  const CustomNextButton = ({ onClick }) => (
    <button 
      onClick={onClick} 
      className={styles.carouselControlBtn}
      aria-label="Next slide"
    >
      <BsArrowRight />
    </button>
  );
  
  // Simple loading placeholder
  if (!imagesLoaded) {
    return (
      <section className={styles.heroSection}>
        <div className={styles.loadingPlaceholder}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingText}>Loading Elimu Tuts...</div>
            <div className={styles.loadingSubtext}>
              First load might take up to a minute while our server wakes up.
            </div>
            <div className={styles.loadingSpinner}></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.heroSection}>
      <Carousel 
        fade 
        interval={5000} 
        className={styles.carousel}
        prevIcon={null}
        nextIcon={null}
        indicators={true}
        activeIndex={activeIndex}
        onSelect={(index) => setActiveIndex(index)}
      >
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index} className={styles.carouselItem}>
            <div className={styles.carouselImageContainer}>
              <img 
                className={styles.carouselImage} 
                src={item.image} 
                alt={item.title}
                loading="lazy" 
              />
              <div className={styles.imageOverlay}></div>
            </div>
            
            {/* Only render content for active item to reduce initial load time */}
            {index === activeIndex && (
              <div className={styles.carouselContent}>
                <motion.div
                  className={styles.contentWrapper}
                  variants={fadeInUpVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.p 
                    className={styles.smallText}
                    variants={fadeInUpVariants}
                    transition={{ duration: 0.6 }}
                  >
                    {item.smallText}
                  </motion.p>
                  <motion.h1 
                    className={styles.mainTitle}
                    variants={fadeInUpVariants}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {item.title}
                  </motion.h1>
                  <motion.p 
                    className={styles.description}
                    variants={fadeInUpVariants}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {item.description}
                  </motion.p>
                  <motion.div 
                    className={styles.buttonContainer}
                    variants={fadeInUpVariants}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Link to="/courses">
                      <motion.button 
                        className={styles.primaryButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Explore Our Courses
                      </motion.button>
                    </Link>
                  </motion.div>

                  {/* Carousel controls positioned below the button */}
                  <motion.div 
                    className={styles.carouselControls}
                    variants={fadeInUpVariants}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <CustomPrevButton onClick={() => document.querySelector('.carousel-control-prev').click()} />
                    <CustomNextButton onClick={() => document.querySelector('.carousel-control-next').click()} />
                  </motion.div>
                </motion.div>
              </div>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroSection;
