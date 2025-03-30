import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      
      <main className="container">
        <div className="placeholder-content">
          <h1>About Elimu Tuts</h1>
          <p>This is the About page for Elimu Tuts e-learning platform.</p>
          <p>Our mission is to bridge educational gaps across Kenya through technology, making quality education available to all students regardless of location or socioeconomic status.</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;