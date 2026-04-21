import React from "react";
import { BsRobot, BsGithub, BsLinkedin } from "react-icons/bs";

function Footer() {
  return (
    <div className="relative bg-[#0B0F19] text-white pt-20 pb-10 px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(0,255,150,0.15),transparent_60%)]"></div>

      <div className="relative max-w-6xl mx-auto">

        {/* TOP CTA */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Crack Your{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Dream Job?
            </span>
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto mb-6">
            Start practicing with AI-powered interviews and boost your confidence today.
          </p>

          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold shadow-lg hover:scale-105 transition">
            Start Now
          </button>
        </div>

        {/* MAIN FOOTER */}
        <div className="grid md:grid-cols-3 gap-10 border-t border-white/10 pt-10">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-black shadow-lg">
                <BsRobot size={18} />
              </div>

              <h2 className="font-semibold text-lg">
                Intervi
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  .AI
                </span>
              </h2>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              AI-powered interview preparation platform helping you improve
              communication, technical depth and confidence with real-time feedback.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer">Interview Practice</li>
              <li className="hover:text-white cursor-pointer">Analytics</li>
              <li className="hover:text-white cursor-pointer">Pricing</li>
              <li className="hover:text-white cursor-pointer">Resume AI</li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Connect</h3>

            <div className="flex gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition">
                <BsGithub />
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition">
                <BsLinkedin />
              </div>
            </div>

            <p className="text-gray-500 text-sm mt-4">
              © {new Date().getFullYear()} Intervi.AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;