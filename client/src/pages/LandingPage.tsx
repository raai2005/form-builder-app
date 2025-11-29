import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Templates from '../components/Templates';
import Testimonials from '../components/Testimonials';
// import Pricing from '../components/Pricing';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="templates">
        <Templates />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      {/* <Pricing /> */}
      <div id="contact">
        <ContactUs />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
