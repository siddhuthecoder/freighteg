import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        isSticky ? "sticky top-0 shadow-md" : ""
      } bg-white transition-all duration-300 z-50`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="logo flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">FreightEG</h1>
            <p className="text-sm">Effortless Transport Solutions</p>
          </div>
          <nav className="hidden md:flex flex-grow justify-center">
            <ul className="flex space-x-4">
            <li>
            <Link to="/"> <a href="#" className="hover:text-blue-600">
                 Home
                </a>
                </Link>
              </li>
              <li>
              <Link to="/about">  <a href="#" className="hover:text-blue-600">
                About Us
                </a>
                </Link>
              </li>
              <li>
              <Link to="/pricing">
                <a href="#" className="hover:text-blue-600">
                  Pricing
                </a>
                </Link>
              </li>
              
              <li>
              <Link to="/contact"> 
                <a href="#" className="hover:text-blue-600">
                  Contact
                </a>
                </Link>
              </li>
              
            </ul>
          </nav>
          <div className="buttons flex-shrink-0">
            <Link to="/login">
              <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded mr-2">
                Log In
              </button>
            </Link>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Book A Demo
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
