import React from 'react'
import Header from './Header'
import Hero from './Hero'
import './index.css'
import Does from './Does'
import Apart from './Apart'
import About from './About'
import Features from './Features'
import Footer from './Footer'
import FooterNote from './FooterNote'
import LayerAnimation from './animation/LayerAnimation'
import Layer1 from './animation/Layer1'
const MainPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <LayerAnimation />
      <Does />
      <Apart />
      <About />
      <Features />
      <Footer />
      <FooterNote />
    </div>
  )
}

export default MainPage
