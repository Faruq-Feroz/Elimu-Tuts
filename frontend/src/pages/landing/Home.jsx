import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

// Import placeholders individually
import Hero from '../../components/landing/Hero';
import AboutUs from '../../components/landing/AboutUs';
import Learning from '../../components/landing/Features';
import FeatureCards from '../../components/landing/FeatureCards';
import PopularSubjects from '../../components/landing/Subjects';
import PopularCourses from '../../components/landing/Courses';
import ElimuTutsBanner from '../../components/landing/ElimuTutsBanner';
import FAQ from '../../components/landing/FAQ';


const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      
      <main>
        <Hero />
        <AboutUs />
        <Learning />
        <FeatureCards />
        <PopularSubjects/>
        <PopularCourses />
        <ElimuTutsBanner />
        <FAQ />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
