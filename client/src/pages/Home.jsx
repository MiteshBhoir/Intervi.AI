import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthModel from "../components/AuthModel";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";

// images
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-white overflow-hidden ">

      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#1a2a6c,transparent_40%),radial-gradient(circle_at_80%_0%,#0f9b0f,transparent_30%)] opacity-20"></div>


      <div className="relative z-10 px-6 py-40 max-w-7xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-40">
          <div className="flex justify-center mb-6">
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl px-4 py-2 rounded-full flex items-center gap-2 text-sm text-gray-300">
              <HiSparkles className="text-green-400" />
              AI Powered Interview Platform
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >
            Crack Interviews with{" "}
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              AI Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg"
          >
            Practice real-world interviews with adaptive AI, voice interaction,
            and performance analytics.
          </motion.p>

          <div className="flex justify-center gap-6 mt-10 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!userData) return setShowAuth(true);
                navigate("/interview");
              }}
              className="relative px-10 py-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold shadow-lg"
            >
              Start Interview
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                if (!userData) return setShowAuth(true);
                navigate("/history");
              }}
              className="border border-white/20 px-10 py-3 rounded-full hover:bg-white/10 transition"
            >
              View History
            </motion.button>
          </div>
        </div>

        {/* STEPS */}
        <div className="grid md:grid-cols-3 gap-10 mb-40">
          {[
            {
              icon: <BsRobot />,
              title: "Role Selection",
              desc: "AI adapts difficulty based on your role & experience",
            },
            {
              icon: <BsMic />,
              title: "Voice Interview",
              desc: "Real-time conversation with smart follow-ups",
            },
            {
              icon: <BsClock />,
              title: "Timed Simulation",
              desc: "Practice under real interview pressure",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:shadow-[0_0_40px_rgba(0,255,150,0.15)] transition"
            >
              <div className="text-green-400 text-3xl mb-4 flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* FEATURES */}
        <div className="mb-40">
          <h2 className="text-4xl font-bold text-center mb-16">
            Advanced{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              AI Features
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                image: evalImg,
                title: "AI Evaluation",
                desc: "Analyze answers with detailed feedback",
                icon: <BsBarChart />,
              },
              {
                image: resumeImg,
                title: "Resume Based",
                desc: "Personalized questions from your resume",
                icon: <BsFileEarmarkText />,
              },
              {
                image: pdfImg,
                title: "PDF Reports",
                desc: "Download detailed performance insights",
                icon: <BsFileEarmarkText />,
              },
              {
                image: analyticsImg,
                title: "Analytics",
                desc: "Track progress with smart dashboards",
                icon: <BsBarChart />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="relative p-[1px] rounded-3xl bg-gradient-to-br from-green-400/30 to-blue-500/20"
              >
                <div className="bg-[#0B0F19] rounded-3xl p-8 backdrop-blur-xl border border-white/10">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <img
                      src={item.image}
                      alt=""
                      className="w-40 rounded-xl border border-white/10"
                    />
                    <div>
                      <div className="text-green-400 mb-2">{item.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MODES */}
        <div className="mb-40">
          <h2 className="text-4xl font-bold text-center mb-16">
            Interview{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Modes
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              { img: hrImg, title: "HR Mode", desc: "Behavioral interviews" },
              { img: techImg, title: "Technical", desc: "Deep tech questions" },
              {
                img: confidenceImg,
                title: "Confidence AI",
                desc: "Voice & tone analysis",
              },
              { img: creditImg, title: "Credits", desc: "Unlock premium usage" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
                <img
                  src={item.img}
                  alt=""
                  className="w-24 h-24 object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </div>
  );
}

export default Home;