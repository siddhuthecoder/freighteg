// src/LandingPage/LandingPage.js
import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Services from "./Services";
import SupplyChain from "./SupplyChain";
import Features from "./Features";
import AboutCompany from "./AboutCompany";
import TopFeatures from "./TopFeatures";
import OurProduct from "./OurProduct";
import ExperienceLogistics from "./ExperienceLogistics";
import Footer from "./Footer";

function LandingPage() {
  return (
    <div>
      <Header />
      <Hero />
      <Services />
      <SupplyChain />
      <Features />
      <AboutCompany />
      <TopFeatures />
      <OurProduct />
      <ExperienceLogistics />
      <Footer />
    </div>
  );
}

export default LandingPage;
