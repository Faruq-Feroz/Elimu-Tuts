import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import styles from './Hero.module.css';
import Hero1 from '../../assets/Hero/Hero1.jpg';


const HeroSection = () => {
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

  return (
    <section className={styles.heroSection}>
      <Carousel 
        fade 
        interval={5000} 
        className={styles.carousel}
        prevIcon={<BsArrowLeft className={`${styles.carouselControl} ${styles.carouselControlPrev}`} />}
        nextIcon={<BsArrowRight className={`${styles.carouselControl} ${styles.carouselControlNext}`} />}
      >
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index} className={styles.carouselItem}>
            <div className={styles.carouselImageContainer}>
              <img className={styles.carouselImage} src={item.image} alt={item.title} />
              <div className={styles.imageOverlay}></div>
            </div>
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
              </motion.div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroSection;