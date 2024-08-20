import React from "react";
import { Link } from "react-router-dom";

const FooterColumn = ({ title, items }) => (
  <div className="mb-8 md:mb-0">
    <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
    <ul>
      {items.map((item, index) => (
        <li key={index} className="mb-2">
          <a href="#" className="text-gray-300 hover:text-white text-sm">
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const footerData = {
    // Solutions: [
    //   "Freight Sourcing",
    //   "Indent Allocation",
    //   "In Plant Logistics",
    //   "Shipment Tracking",
    //   "Proof of Delivery",
    //   "Freight Accounting",
    //   "Indian Freight Index",
    // ],
    // Industry: [
    //   "Metal & Pipes Logistics",
    //   "FMCG, FMCD & FMEG Logistics",
    //   "Chemicals Logistics",
    //   "EPC & Construction Logistics",
    //   "Engineering & Heavy Machinery Logistics",
    //   "Agriculture & Animal Feeds",
    // ],
    // Resources: ["Case Studies", "Blogs", "Certification Courses", "Pricing"],
    // Company: ["About Us", "TMS", "Career", "Terms of Use", "Disclaimer"],
    Company:["About Us" , "Pricing "]
  };

  return (
    <footer className="bg-indigo-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {Object.entries(footerData).map(([title, items]) => (
            <FooterColumn key={title} title={title} items={items} />
          ))}
          <div>
            <h3 className="text-2xl font-bold mb-4">FreightEG</h3>
            <p className="text-sm mb-4">Transportation Management Simplified</p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
            <h4 className="text-lg font-semibold mb-2">Contact Info</h4>
            <p className="text-sm mb-2 flex items-center">
              <i className="fas fa-map-marker-alt mr-2"></i>
              428/38 Pyramid House, Rajiv Colony, Sector -33,
              Gurgaon, Haryana 122001
            </p>
            <p className="text-sm mb-2 flex items-center">
              <i className="fas fa-phone-alt mr-2"></i>
              +91 96719 66994
            </p>
            <p className="text-sm flex items-center">
              <i className="fas fa-envelope mr-2"></i>
              hello@freighteg.com
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-wrap justify-between items-center">
          <p className="text-sm">
            &copy; 2024 FreightEG | All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/terms-and-conditions"
              className="text-sm text-gray-300 hover:text-white"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/privacy-policy"
              className="text-sm text-gray-300 hover:text-white"
            >
              Privacy Policy
            </Link>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.superprocure"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://www.superprocure.com/wp-content/uploads/2023/10/google-play-badge.png"
              alt="Get it on Google Play"
              className="h-8"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
