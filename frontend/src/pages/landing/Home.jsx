import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

// Placeholder imports until these components are fully implemented
const Hero = () => <div className="hero-section placeholder-content"><h2>Hero Section</h2><p>Welcome to Elimu Tuts</p></div>;
const Features = () => <div className="features-section placeholder-content"><h2>Features Section</h2><p>Our platform features</p></div>;
const AboutUs = () => <div className="about-section placeholder-content"><h2>About Us Section</h2><p>Learn about our mission</p></div>;
const Testimonials = () => <div className="testimonials-section placeholder-content"><h2>Testimonials Section</h2><p>What our users say</p></div>;
const PricingSection = () => <div className="pricing-section placeholder-content"><h2>Pricing Section</h2><p>Our subscription plans</p></div>;
const ContactUs = () => <div className="contact-section placeholder-content"><h2>Contact Us Section</h2><p>Get in touch with us</p></div>;

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      
      <main>
        <Hero />
        <Features />
        <AboutUs />
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