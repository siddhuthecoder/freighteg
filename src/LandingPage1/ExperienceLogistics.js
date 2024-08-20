import React from "react";

const ExperienceLogistics = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold text-indigo-900 mb-4">
            Logistics Simplified.
            <br />
            Wherever You Are.
          </h2>
          <a
            href="https://play.google.com/store/apps/details?id=com.superprocure"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://www.superprocure.com/wp-content/uploads/2023/10/google-play-badge.png"
              alt="Get it on Google Play"
              className="h-12"
            />
          </a>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://www.superprocure.com/wp-content/uploads/2023/10/googleDwnImg.png"
            alt="SuperProcure on multiple devices"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default ExperienceLogistics;
