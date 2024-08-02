// MainPage.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import './index.css';
import Does from './Does';
import Apart from './Apart';
import About from './About';
import Features from './Features';
import Footer from './Footer';
import FooterNote from './FooterNote';
import LayerAnimation from './animation/LayerAnimation';
import Layer1 from './animation/Layer1';
import Loading from './Loading';

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); // 3 seconds

    // Clean up the timer if the component unmounts before 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // return <Loading />;
  }

  return (
    <div>
      <Header />
      <Hero />
      {/* <LayerAnimation /> */}
      <Does />
      <Apart />
      <About />
      <Features />
      <Footer />
      <FooterNote />
    </div>
  );
};
export default MainPage;
