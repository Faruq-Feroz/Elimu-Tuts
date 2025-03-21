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
import Testimonials from '../../components/landing/Testimonials';
import PricingSection from '../../components/landing/Pricing';
import ContactUs from '../../components/landing/ContactUs';

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
        <Testimonials />
        <PricingSection />
        <ContactUs />
      </main>
      
      <div className="navigation-links container">
        <h3>Test Navigation Links:</h3>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/student">Student Dashboard</Link></li>
          <li><Link to="/tutor">Tutor Dashboard</Link></li>
          <li><Link to="/parent">Parent Dashboard</Link></li>
        </ul>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;