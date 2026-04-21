import React, { useState } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { ServerUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Pricing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter",
      price: "₹100",
      credits: 150,
      description: "Great for consistent practice.",
      features: [
        "150 Credits",
        "Detailed Feedback",
        "Analytics",
        "Full History",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "₹500",
      credits: 650,
      description: "Best for serious job preparation.",
      features: [
        "650 Credits",
        "Advanced AI Feedback",
        "Skill Insights",
        "Priority Processing",
      ],
      badge: "Most Popular",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id);

      const amount =
        plan.id === "basic" ? 100 :
        plan.id === "pro" ? 500 : 0;

      const result = await axios.post(
        ServerUrl + "/api/payment/order",
        {
          planId: plan.id,
          amount,
          credits: plan.credits,
        },
        { withCredentials: true }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "Intervi.AI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,

        handler: async function (response) {
          const verify = await axios.post(
            ServerUrl + "/api/payment/verify",
            response,
            { withCredentials: true }
          );
          dispatch(setUserData(verify.data.user));
          alert("Payment Successful 🎉");
          navigate("/");
        },

        theme: { color: "#22c55e" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      setLoadingPlan(null);
    } catch (error) {
      console.log(error);
      setLoadingPlan(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-white py-20 px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#1a2a6c,transparent_40%),radial-gradient(circle_at_80%_0%,#0f9b0f,transparent_30%)] opacity-20"></div>

      <div className="relative max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-16 flex items-start gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
          >
            <FaArrowLeft />
          </button>

          <div className="text-center w-full">
            <h1 className="text-4xl font-bold">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Plan
              </span>
            </h1>
            <p className="text-gray-400 mt-3">
              Simple, transparent pricing for everyone.
            </p>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const isPro = plan.id === "pro";

            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -6 }}
                className={`relative p-[1px] rounded-3xl ${
                  isPro
                    ? "bg-gradient-to-br from-purple-500/40 to-blue-500/30"
                    : "bg-gradient-to-br from-green-400/20 to-blue-500/20"
                }`}
              >
                <div
                  className={`rounded-3xl p-8 backdrop-blur-xl border ${
                    isSelected
                      ? "border-green-400/40 bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >

                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute top-5 right-5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full">
                      {plan.badge}
                    </div>
                  )}

                  {/* Name */}
                  <h3 className="text-xl font-semibold">{plan.name}</h3>

                  {/* Price */}
                  <div className="mt-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <p className="text-gray-400 mt-1">
                      {plan.credits} Credits
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 mt-4 text-sm">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <div className="mt-6 space-y-3">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-400" />
                        <span className="text-sm text-gray-300">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* BUTTON */}
                  {!plan.default && (
                    <button
                      disabled={loadingPlan === plan.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        isSelected
                          ? handlePayment(plan)
                          : setSelectedPlan(plan.id);
                      }}
                      className={`w-full mt-8 py-3 rounded-xl font-semibold transition ${
                        isSelected
                          ? "bg-gradient-to-r from-green-400 to-blue-500 text-black"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      {loadingPlan === plan.id
                        ? "Processing..."
                        : isSelected
                        ? "Proceed to Pay"
                        : "Select Plan"}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Pricing;