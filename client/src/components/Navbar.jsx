import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import AuthModel from "./AuthModel";

function Navbar() {
  const { userData } = useSelector((state) => state.user);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      setShowCreditPopup(false);
      setShowUserPopup(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 w-full px-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3 
        bg-white/5 backdrop-blur-xl border border-white/10 
        rounded-full shadow-[0_0_40px_rgba(0,0,0,0.3)]"
      >
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="p-2 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-black shadow-lg">
            <BsRobot size={18} />
          </div>

          <h1 className="hidden md:block text-lg font-semibold tracking-wide invert">
            Intervi
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              .AI
            </span>
          </h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 relative">

          {/* CREDITS */}
          <div className="relative">
            <button
              onClick={() => {
                if (!userData) return setShowAuth(true);
                setShowCreditPopup(!showCreditPopup);
                setShowUserPopup(false);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full 
              bg-white/5 border border-white/10 backdrop-blur-xl 
              hover:bg-white/10 transition"
            >
              <BsCoin className="text-yellow-400" />
              <span>{userData?.credits || 0}</span>
            </button>

            {showCreditPopup && (
              <div className="absolute right-0 mt-4 w-64 
              bg-[#0B0F19] border border-white/10 backdrop-blur-xl 
              rounded-2xl p-5 shadow-[0_0_30px_rgba(0,255,150,0.1)]">

                <p className="text-sm text-gray-400 mb-4">
                  Need more credits to continue interviews?
                </p>

                <button
                  onClick={() => navigate("/pricing")}
                  className="w-full py-2 rounded-lg 
                  bg-gradient-to-r from-green-400 to-blue-500 
                  text-black font-semibold"
                >
                  Buy Credits
                </button>
              </div>
            )}
          </div>

          {/* USER */}
          <div className="relative">
            <button
              onClick={() => {
                if (!userData) return setShowAuth(true);
                setShowUserPopup(!showUserPopup);
                setShowCreditPopup(false);
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center 
              bg-gradient-to-r from-purple-500 to-blue-500 text-white 
              shadow-lg hover:scale-105 transition"
            >
              {userData ? (
                userData.name.slice(0, 1).toUpperCase()
              ) : (
                <FaUserAstronaut size={16} />
              )}
            </button>

            {showUserPopup && (
              <div className="absolute right-0 mt-4 w-52 
              bg-[#0B0F19] border border-white/10 backdrop-blur-xl 
              rounded-2xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">

                <p className="text-sm text-green-400 mb-3 font-medium">
                  {userData?.name}
                </p>

                <button
                  onClick={() => navigate("/history")}
                  className="w-full text-left text-sm py-2 text-gray-300 hover:text-white"
                >
                  Interview History
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left text-sm py-2 flex items-center gap-2 text-red-400"
                >
                  <HiOutlineLogout size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </div>
  );
}

export default Navbar;