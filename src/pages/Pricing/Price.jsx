import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from '../../LandingPageComponents/Header';

import "./Price.css";

const Price = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlanTypes, setSelectedPlanTypes] = useState({
    Basic: "Monthly",
    Standard: "Monthly",
    Premium: "Monthly",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://freighteg.in/freightapi/get_subscription"
        );
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
    const selectedType = selectedPlanTypes[planName];
    const companyId = localStorage.getItem("userID");

    try {
      const product = getPlanDetails(planName, selectedType);

      if (!product) {
        alert("Plan not found. Please try again.");
        return;
      }

      const orderData = {
        amount: product.offer_price * 100, // Razorpay accepts amount in paisa
        currency: "INR",
        receipt: `receipt_${product._id}`,
        partial_payment: false,
        first_payment_min_amount: 0,
        notes: {
          company_id: companyId,
          payment_for: "subscription",
          quantity: 1,
          gst: 18,
          total_amount: product.offer_price * 1.18,
        },
      };

      const response = await axios.post(
        "https://fastagtracking.com/customulip/razorpayorder",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const order = response.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: 'Fastagtracking',
        image:'https://fastagtracking.com/static/media/logo2.c6341f740d920f8131f9.png',
        description: product.name,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verificationData = {
              order_id: order.id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const verifyResponse = await axios.post(
              "https://fastagtracking.com/verifyPayment",
              verificationData,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (verifyResponse.data.success) {
              const userResponse = await axios.get(
                `https://fastagtracking.com/customulip/company/${companyId}`
              );

              const { maxApiHit, apiHit } = userResponse.data;
              const newMaxApiHit = (maxApiHit-apiHit) + product.maxBid;
              const newApiHit = apiHit + product.maxBid;

              await axios.put(
                `https://fastagtracking.com/customulip/company/${companyId}`,
                {
                  maxApiHit: newMaxApiHit,
                  apiHit: 0,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              alert("Payment Verified Successfully!");
            } else {
              alert(verifyResponse.data.message || "Payment verification failed.");
            }
          } catch (error) {
            alert(
              error.response?.data?.message ||
                error.message ||
                "Payment verification failed. Please try again."
            );
          }
        },
        prefill: {
          name: "", 
          email: "", 
          contact: "", 
        },
        theme: {
          color: "#5E81F4",
        },
      };

      if (window.Razorpay) {
        const razor = new window.Razorpay(options);

        razor.on("payment.failed", function (response) {
          console.log("Payment failed response:", response);
          alert(`Payment failed: ${response.error.description}`);
        });

        razor.open();
      } else {
        console.error("Razorpay SDK not loaded.");
      }
    } catch (error) {
      console.error("Error in payment process:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
      <>
      <Header/>
    <section className="plans__container flex justify-center  items-center min-h-screen  ">
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
                    <div
                      className={`card__icon ${
                        plan && plan.name === "Basic"
                          ? "symbol symbol--rounded"
                          : plan && plan.name === "Standard"
                          ? "symbol"
                          : ""
                      }`}
                    ></div>
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
                        planType === "Monthly"
                          ? "plan-button--active"
                          : ""
                      }`}
                      onClick={() =>
                        handlePlanTypeChange(planName, "Monthly")
                      }
                    >
                      Monthly
                    </button>
                    <button
                      className={`plan-button ${
                        planType === "Quarterly"
                          ? "plan-button--active"
                          : ""
                      }`}
                      onClick={() =>
                        handlePlanTypeChange(planName, "Quarterly")
                      }
                    >
                      Quarterly
                    </button>
                    <button
                      className={`plan-button ${
                        planType === "Yearly"
                          ? "plan-button--active"
                          : ""
                      }`}
                      onClick={() =>
                        handlePlanTypeChange(planName, "Yearly")
                      }
                    >
                      Yearly
                    </button>
                  </div>
                  <div className="card__desc">
                    {plan ? (
                      <>
                        Actual Price{" "}
                        <span className="actual-price">₹{plan.actual_price}</span>
                      </>
                    ) : (
                      "Not Available"
                    )}
                  </div>
                </div>
                {plan && (
                  <>
                    <div className="price">
                      ₹{plan.offer_price}
                      <span className="spann">
                        / {planType}
                      </span>
                    </div>
                    <ul className="featureList">
                      <li>Max Bids :  {plan.maxBid} </li>
                      {/* <li>Upto {plan.maxBid} VAHAN Search</li>
                      <li>Upto {plan.maxBid} SARATHI Search</li>
                      <li
                        className={plan.name === "Basic" ? "disabled" : ""}
                      >
                        API for ERP and SAP
                      </li> */}
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
            );
          })}
        </div>
      </div>
    </section>
    
    </>
  );
};

export default Price;
