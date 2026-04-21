import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
} from "react-icons/fa";
import axios from "axios";
import { ServerUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Step1SetUp({ onStart }) {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");
  const [resumeFile, setResumeFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");

  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;
    setAnalyzing(true);

    const formdata = new FormData();
    formdata.append("resume", resumeFile);

    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/resume",
        formdata,
        { withCredentials: true }
      );

      setRole(result.data.role || "");
      setExperience(result.data.experience || "");
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");

      setAnalysisDone(true);
      setAnalyzing(false);
    } catch (error) {
      console.log(error);
      setAnalyzing(false);
    }
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/generate-questions",
        { role, experience, mode, resumeText, projects, skills },
        { withCredentials: true }
      );

      if (userData) {
        dispatch(
          setUserData({
            ...userData,
            credits: result.data.creditsLeft,
          })
        );
      }

      setLoading(false);
      onStart(result.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-white flex items-center justify-center px-4 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#1a2a6c,transparent_40%),radial-gradient(circle_at_80%_0%,#0f9b0f,transparent_30%)] opacity-20"></div>

      <div className="relative w-full max-w-6xl grid md:grid-cols-2 gap-6">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10"
        >
          <h2 className="text-3xl font-bold mb-6">
            AI Interview{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Setup
            </span>
          </h2>

          <p className="text-gray-400 mb-10">
            Configure your interview and let AI generate personalized questions.
          </p>

          <div className="space-y-5">
            {[
              { icon: <FaUserTie />, text: "Role-based Questions" },
              { icon: <FaMicrophoneAlt />, text: "Voice AI Interaction" },
              { icon: <FaChartLine />, text: "Performance Insights" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                <span className="text-green-400">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10"
        >
          <h2 className="text-2xl font-semibold mb-6">
            Configure Interview
          </h2>

          <div className="space-y-5">

            {/* ROLE */}
            <input
              placeholder="Enter Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-400"
            />

            {/* EXPERIENCE */}
            <input
              placeholder="Experience (e.g. 2 years)"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-400"
            />

            {/* MODE */}
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            >
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
            </select>

            {/* RESUME UPLOAD */}
            {!analysisDone && (
              <div
                onClick={() =>
                  document.getElementById("resumeUpload").click()
                }
                className="border border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:bg-white/5 transition"
              >
                <FaFileUpload className="mx-auto text-3xl text-green-400 mb-2" />

                <input
                  id="resumeUpload"
                  type="file"
                  hidden
                  accept="application/pdf"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />

                <p className="text-gray-400">
                  {resumeFile
                    ? resumeFile.name
                    : "Upload Resume (Optional)"}
                </p>

                {resumeFile && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadResume();
                    }}
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-black rounded-lg"
                  >
                    {analyzing ? "Analyzing..." : "Analyze Resume"}
                  </button>
                )}
              </div>
            )}

            {/* ANALYSIS RESULT */}
            {analysisDone && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-green-400 mb-2 font-medium">
                  AI Resume Insights
                </p>

                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s, i) => (
                      <span
                        key={i}
                        className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* START BUTTON */}
            <motion.button
              onClick={handleStart}
              disabled={!role || !experience || loading}
              whileHover={{ scale: 1.03 }}
              className="w-full py-3 rounded-xl font-semibold 
              bg-gradient-to-r from-green-400 to-blue-500 text-black"
            >
              {loading ? "Starting..." : "Start Interview"}
            </motion.button>

          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Step1SetUp;