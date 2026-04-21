import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

function Step3Report({ report }) {
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading Report...</p>
      </div>
    );
  }
  const navigate = useNavigate()
  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;


  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let currentY = 25;

    // ================= TITLE =================
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(34, 197, 94);
    doc.text("AI Interview Performance Report", pageWidth / 2, currentY, {
      align: "center",
    });

    currentY += 5;

    // underline
    doc.setDrawColor(34, 197, 94);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);

    currentY += 15;

    // ================= FINAL SCORE BOX =================
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `Final Score: ${finalScore}/10`,
      pageWidth / 2,
      currentY + 12,
      { align: "center" }
    );

    currentY += 30;

    // ================= SKILLS BOX =================
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");

    doc.setFontSize(12);

    doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 10);
    doc.text(`Communication: ${communication}`, margin + 10, currentY + 18);
    doc.text(`Correctness: ${correctness}`, margin + 10, currentY + 26);

    currentY += 45;

    // ================= ADVICE =================
    let advice = "";

    if (finalScore >= 8) {
      advice =
        "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
    } else if (finalScore >= 5) {
      advice =
        "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
    } else {
      advice =
        "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220);
    doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);

    doc.setFont("helvetica", "bold");
    doc.text("Professional Advice", margin + 10, currentY + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
    doc.text(splitAdvice, margin + 10, currentY + 20);

    currentY += 50;

    // ================= QUESTION TABLE =================
    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["#", "Question", "Score", "Feedback"]],
      body: questionWiseScore.map((q, i) => [
        `${i + 1}`,
        q.question,
        `${q.score}/10`,
        q.feedback,
      ]),
      styles: {
        fontSize: 9,
        cellPadding: 5,
        valign: "top",
      },
      headStyles: {
        fillColor: [34, 197, 94],
        textColor: 255,
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" }, // index
        1: { cellWidth: 55 }, // question
        2: { cellWidth: 20, halign: "center" }, // score
        3: { cellWidth: "auto" }, // feedback
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251],
      },
    });


    doc.save("AI_Interview_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/history")}
            className="p-3 rounded-full bg-white/10 border border-white/10 hover:bg-white/20"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Report
            </h1>
            <p className="text-gray-400 text-sm">
              Performance insights powered by AI
            </p>
          </div>
        </div>

        <button
          onClick={downloadPDF}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-black px-6 py-3 rounded-xl font-semibold"
        >
          Download PDF
        </button>
      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="space-y-6">

          {/* SCORE */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">
            <p className="text-gray-400 mb-4">Overall Score</p>

            <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              {score}/10
            </div>

            <p className="text-gray-400 mt-2">{performanceText}</p>
          </div>

          {/* SKILLS */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <h3 className="mb-4 font-semibold">Skill Breakdown</h3>

            {skills.map((s, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{s.label}</span>
                  <span className="text-green-400">{s.value}</span>
                </div>

                <div className="bg-white/10 h-2 rounded-full">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full"
                    style={{ width: `${s.value * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-6">

          {/* CHART */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <h3 className="mb-4 font-semibold">Performance Trend</h3>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionScoreData}>
                  <CartesianGrid stroke="#1f2937" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[0, 10]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#22c55e"
                    fill="url(#colorScore)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* BREAKDOWN */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <h3 className="mb-6 font-semibold">Detailed Feedback</h3>

            <div className="space-y-5">
              {questionWiseScore.map((q, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <div className="flex justify-between mb-3">
                    <p className="text-gray-400 text-sm">
                      Question {i + 1}
                    </p>

                    <span className="text-green-400 font-semibold">
                      {q.score}/10
                    </span>
                  </div>

                  <p className="font-medium mb-3">
                    {q.question}
                  </p>

                  <div className="bg-green-500/10 border border-green-400/30 p-3 rounded-lg">
                    <p className="text-green-300 text-sm">
                      {q.feedback || "No feedback available"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Step3Report
