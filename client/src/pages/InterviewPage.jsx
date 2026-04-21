
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Step1SetUp from "../components/Step1SetUp";
import Step2Interview from "../components/Step2Interview";
import Step3Report from "../components/Step3Report";

function InterviewPage() {
  const [step, setStep] = useState(1);
  const [interviewData, setInterviewData] = useState(null);

  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#1a2a6c,transparent_40%),radial-gradient(circle_at_80%_0%,#0f9b0f,transparent_30%)] opacity-20"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            AI Interview{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Session
            </span>
          </h1>
          <p className="text-gray-400 mt-2">
            Complete all steps to generate your performance report
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div className="flex justify-between items-center mb-12 relative">

          {/* Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2"></div>

          {[1, 2, 3].map((s) => (
            <div key={s} className="relative z-10 flex flex-col items-center">
              
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition
                ${
                  step >= s
                    ? "bg-gradient-to-r from-green-400 to-blue-500 text-black shadow-lg"
                    : "bg-white/10 text-gray-400"
                }`}
              >
                {s}
              </div>

              <span className="text-xs text-gray-400 mt-2">
                {s === 1 && "Setup"}
                {s === 2 && "Interview"}
                {s === 3 && "Report"}
              </span>
            </div>
          ))}
        </div>

        {/* STEP CONTAINER */}
        <div className="relative p-[1px] rounded-3xl bg-gradient-to-br from-green-400/20 to-blue-500/20">

          <div className="bg-[#0B0F19] border border-white/10 backdrop-blur-xl rounded-3xl p-6 min-h-[400px]">

            <AnimatePresence mode="wait">

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                >
                  <Step1SetUp
                    onStart={(data) => {
                      setInterviewData(data);
                      setStep(2);
                    }}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                >
                  <Step2Interview
                    interviewData={interviewData}
                    onFinish={(report) => {
                      setInterviewData(report);
                      setStep(3);
                    }}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                >
                  <Step3Report report={interviewData} />
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewPage;