import React from "react";
import Modal from "react-modal";
import axios from "axios";
import "./price.css";

const BidModal = ({ isOpen, onRequestClose }) => {
  const [plans, setPlans] = React.useState([]);
  const [selectedPlanTypes, setSelectedPlanTypes] = React.useState({
    Basic: "Monthly",
    Standard: "Monthly",
    Premium: "Monthly",
  });

  React.useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "https://freighteg.in/freightapi/get_subscription"
        );
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanTypeChange = (planName, planType) => {
    setSelectedPlanTypes((prevState) => ({
      ...prevState,
      [planName]: planType,
    }));
  };

  const calculateDiscount = (actualPrice, offerPrice) => {
    const discount = ((actualPrice - offerPrice) / actualPrice) * 100;
    return Math.round(discount);
  };

  const getPlanDetails = (planName, planType) => {
    const planTypeData = plans.find((plan) => plan.plan_type === planType);
    if (planTypeData) {
      return planTypeData.plans.find((plan) => plan.name === planName);
    }
    return null;
  };

  const handleGetStarted = async (planName) => {
    // Implement the "Get Started" logic here, similar to the one in the Price component.
    // This is just a placeholder function.
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Bid"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Add Bid</h2>
        <div className="plans">
          <div className="planItem__container">
            {["Basic", "Standard", "Premium"].map((planName) => {
              const planType = selectedPlanTypes[planName];
              const plan = getPlanDetails(planName, planType);
              const discountPercentage = plan
                ? calculateDiscount(plan.actual_price, plan.offer_price)
                : 0;

              return (
                <div
                  key={plan ? plan._id : planName}
                  className={`planItem planItem--${
                    plan && plan.name === "Premium" ? "entp" : ""
                  }`}
                >
                  <div className="card">
                    <div className="card__header">
                      <h2>{planName}</h2>
                      {plan && discountPercentage > 0 && (
                        <div className="discount-badge">
                          {discountPercentage}% OFF
                        </div>
                      )}
                    </div>
                    <div className="plan-buttons">
                      <button
                        className={`plan-button ${
                          planType === "Monthly" ? "plan-button--active" : ""
                        }`}
                        onClick={() =>
                          handlePlanTypeChange(planName, "Monthly")
                        }
                      >
                        Monthly
                      </button>
                      <button
                        className={`plan-button ${
                          planType === "Quarterly" ? "plan-button--active" : ""
                        }`}
                        onClick={() =>
                          handlePlanTypeChange(planName, "Quarterly")
                        }
                      >
                        Quarterly
                      </button>
                      <button
                        className={`plan-button ${
                          planType === "Yearly" ? "plan-button--active" : ""
                        }`}
                        onClick={() => handlePlanTypeChange(planName, "Yearly")}
                      >
                        Yearly
                      </button>
                    </div>
                    <div className="card__desc">
                      {plan ? (
                        <>
                          Actual Price{" "}
                          <span className="actual-price">
                            ₹{plan.actual_price}
                          </span>
                        </>
                      ) : (
                        "Not Available"
                      )}
                    </div>
                    {plan && (
                      <>
                        <div className="price">
                          ₹{plan.offer_price}
                          <span className="spann">/ {planType}</span>
                        </div>
                        <ul className="featureList">
                          <li>Max Bids : {plan.maxBid}</li>
                        </ul>
                        <button
                          className="button button--blue"
                          onClick={() => handleGetStarted(planName)}
                        >
                          <span className="text-white">Get Now</span> 
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          onClick={onRequestClose}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg ml-4"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default BidModal;
