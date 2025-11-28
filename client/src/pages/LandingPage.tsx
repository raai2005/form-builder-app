import React from 'react';
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
      <Hero />
      <Features />
      <HowItWorks />
      <Templates />
      <Testimonials />
      {/* <Pricing /> */}
      <ContactUs />
      <Footer />
    </div>
  );
};

export default LandingPage;
