import React from 'react';
import Header from '../../LandingPageComponents/Header';

const About = () => {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-3  mt-[90px] bg-gray-50 shadow-lg rounded-xl">
        <section className="mb-12 p-6 bg-white shadow-md rounded-lg border border-gray-200">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">Who We Are</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Welcome to <span className="font-semibold text-[#0C43FF]">FreightEG</span>, the game-changing online bidding platform that is redefining transportation in India. Founded in December 2022 and headquartered at 203, Tower-2, DLF Corporate Green, Sector-74A, Gurgaon, we are committed to revolutionizing how transporters connect with vehicle owners and brokers, and manufacturers connect with their vendors. Our platform provides a seamless bridge between those in need of market vehicles for daily operations and manufacturers requiring reliable transportation for their goods. At FreightEG, we’re not just offering a service—we’re building a community where trust and transparency are at the forefront.
          </p>
        </section>

        <section className="mb-12 p-8 bg-white shadow-md rounded-lg border border-gray-200">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">Our Mission</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            At FreightEG, our mission is clear: to create a transparent and efficient logistics ecosystem that drastically reduces transportation costs, targeting a reduction to 10-12% of overall freight expenses. We are committed to eliminating corruption in freight hiring, increasing profitability for companies, and ensuring every logistics operation runs smoothly and transparently. With features like <span className="font-semibold text-[#0C43FF]">e-POD</span> (electronic Proof of Delivery) and a centralized bidding system, FreightEG empowers businesses to take control of their logistics with confidence and ease.
          </p>
        </section>

        <section className="mb-12 p-8 bg-white shadow-md rounded-lg border border-gray-200">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">Our Vision</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Our vision is ambitious yet achievable: to lower transportation costs in India to less than 10% of the country’s GDP. We plan to accomplish this by fostering a highly competitive and transparent market, driven by innovation and efficiency. Key features like <span className="font-semibold text-[#0C43FF]">FASTag tracking</span> provide real-time vehicle monitoring at toll plazas, while <span className="font-semibold text-[#0C43FF]">VAHAN</span> and <span className="font-semibold text-[#0C43FF]">SARATHI</span> system integrations streamline the verification of vehicle and driver documents online. These features are designed to reduce paperwork, enhance operational efficiency, and contribute to a more profitable and sustainable logistics industry.
          </p>
        </section>

        <section className="mb-12 p-8 bg-white shadow-md rounded-lg border border-gray-200">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">Trust: The Cornerstone of Our Platform</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            At FreightEG, we understand that trust is the lifeblood of logistics. That’s why we’ve built a platform where trust is not just a feature—it’s the foundation. We provide a secure environment where you can onboard and work with verified vendors, ensuring you receive the most accurate rates and fostering a higher level of trust in every transaction. For businesses with multiple branches, our platform offers a centralized control system, allowing you to manage all operations from a single dashboard with complete transparency. By focusing on trust, transparency, and innovation, FreightEG is more than just a platform—it’s your partner in building a reliable, efficient, and profitable future for your logistics operations.
          </p>
        </section>
      </div>
    </>
  );
}

export default About;
