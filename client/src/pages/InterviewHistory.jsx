import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

function InterviewHistory() {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyInterviews = async () => {
      try {
        const result = await axios.get(
          ServerUrl + "/api/interview/get-interview",
          { withCredentials: true }
        );
        setInterviews(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMyInterviews();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-white py-16 px-4">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#1a2a6c,transparent_40%),radial-gradient(circle_at_80%_0%,#0f9b0f,transparent_30%)] opacity-20"></div>

      <div className="relative max-w-5xl mx-auto py-20">

        {/* HEADER */}
        <div className="mb-12 flex items-start gap-4 flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-4xl font-bold">
              Interview{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                History
              </span>
            </h1>
            <p className="text-gray-400 mt-2">
              Track your performance and improve over time
            </p>
          </div>
        </div>

        {/* EMPTY STATE */}
        {interviews.length === 0 ? (
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-3xl text-center">
            <p className="text-gray-400">
              No interviews yet. Start your first AI interview 🚀
            </p>
          </div>
        ) : (
          <div className="grid gap-6">

            {interviews.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(`/report/${item._id}`)}
                className="cursor-pointer relative p-[1px] rounded-3xl bg-gradient-to-br from-green-400/20 to-blue-500/20"
              >
                <div className="bg-[#0B0F19] border border-white/10 backdrop-blur-xl rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">

                  {/* LEFT */}
                  <div>
                    <h3 className="text-xl font-semibold">
                      {item.role}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      {item.experience} • {item.mode}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-6">

                    {/* SCORE */}
                    <div className="text-right">
                      <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                        {item.finalScore || 0}/10
                      </p>
                      <p className="text-xs text-gray-400">
                        Score
                      </p>
                    </div>

                    {/* STATUS */}
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-medium ${
                        item.status === "completed"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewHistory;