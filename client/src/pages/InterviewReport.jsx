import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";
import Step3Report from "../components/Step3Report";
import { motion } from "framer-motion";
import { BsRobot } from "react-icons/bs";

function InterviewReport() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await axios.get(
          ServerUrl + "/api/interview/report/" + id,
          { withCredentials: true }
        );
        setReport(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReport();
  }, []);

  // 🔥 PREMIUM LOADING STATE
  if (!report) {
    return (
      <div className="relative min-h-screen bg-[#0B0F19] text-white flex items-center justify-center overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1a2a6c,transparent_40%),radial-gradient(circle_at_70%_0%,#0f9b0f,transparent_30%)] opacity-20"></div>

        <div className="relative text-center">

          {/* AI Icon Animation */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 text-black shadow-lg">
              <BsRobot size={28} />
            </div>
          </motion.div>

          {/* Title */}
          <h2 className="text-2xl font-semibold mb-2">
            Generating Your AI Report...
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-sm mb-6">
            Analyzing your answers, confidence & performance
          </p>

          {/* Animated Loader */}
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  delay: dot * 0.2,
                }}
                className="w-3 h-3 bg-green-400 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ✅ REPORT VIEW WITH SMOOTH ENTRY
  return (
    <div className="bg-[#0B0F19] min-h-screen text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Step3Report report={report} />
      </motion.div>
    </div>
  );
}

export default InterviewReport;