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
import Loading from './Loading';
import { motion } from 'framer-motion';

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeoutDuration = window.innerWidth < 900 ? 3500 : 5000;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, timeoutDuration);

    // Clean up the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, []);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className='bg-[rgb(242,_244,_248)]'>
      <Header />
      <Hero />
    {/* <LayerAnimation />
      <Does />
      <Apart />
      <About />
      <Features />
      */}
    <Footer /> 
      <FooterNote />
    </div>
  );
};

export default MainPage;
