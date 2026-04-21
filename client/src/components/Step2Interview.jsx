import React, { useEffect, useRef, useState } from 'react'
import maleVideo from "../assets/videos/male-ai.mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer'
import { motion } from "motion/react"
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import axios from "axios"
import { ServerUrl } from '../App'
import { BsArrowRight } from 'react-icons/bs'

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData;

  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    questions[0]?.timeLimit || 60
  );

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);
  const currentQuestion = questions[currentIndex];

  /* ---------------- VOICE SETUP ---------------- */
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      const femaleVoice = voices.find(v =>
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("samantha")
      );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      const maleVoice = voices.find(v =>
        v.name.toLowerCase().includes("david") ||
        v.name.toLowerCase().includes("mark")
      );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      setSelectedVoice(voices[0]);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

  /* ---------------- SPEAK ---------------- */
  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const humanText = text
        .replace(/,/g, ", ... ")
        .replace(/\./g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);
      utterance.voice = selectedVoice;
      utterance.rate = 0.92;
      utterance.pitch = 1.05;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic();
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAIPlaying(false);

        if (isMicOn) startMic();

        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    });
  };

  /* ---------------- INTRO + QUESTIONS ---------------- */
  useEffect(() => {
    if (!selectedVoice) return;

    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(`Hi ${userName}, it's great to meet you today.`);
        await speakText("Let's begin your interview.");
        setIsIntroPhase(false);
      } else if (currentQuestion) {
        await new Promise(r => setTimeout(r, 800));
        await speakText(currentQuestion.question);
        if (isMicOn) startMic();
      }
    };

    runIntro();
  }, [selectedVoice, isIntroPhase, currentIndex]);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (isIntroPhase || !currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isIntroPhase, currentIndex]);

  useEffect(() => {
    if (!isIntroPhase && currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit || 60);
    }
  }, [currentIndex]);

  /* ---------------- SPEECH RECOGNITION ---------------- */
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;

      setAnswer(prev => prev + " " + transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  const startMic = () => {
    if (recognitionRef.current && !isAIPlaying) {
      try {
        recognitionRef.current.start();
      } catch { }
    }
  };

  const stopMic = () => {
    recognitionRef.current?.stop();
  };

  const toggleMic = () => {
    isMicOn ? stopMic() : startMic();
    setIsMicOn(!isMicOn);
  };

  /* ---------------- SUBMIT ---------------- */
  const submitAnswer = async () => {
    if (isSubmitting) return;

    stopMic();
    setIsSubmitting(true);

    try {
      const res = await axios.post(
        ServerUrl + "/api/interview/submit-answer",
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
          timeTaken: currentQuestion.timeLimit - timeLeft,
        },
        { withCredentials: true }
      );

      setFeedback(res.data.feedback);
      speakText(res.data.feedback);
    } catch (err) {
      console.log(err);
    }

    setIsSubmitting(false);
  };

  const handleNext = async () => {
    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }

    await speakText("Next question.");
    setCurrentIndex(currentIndex + 1);
  };

  const finishInterview = async () => {
    stopMic();

    try {
      const res = await axios.post(
        ServerUrl + "/api/interview/finish",
        { interviewId },
        { withCredentials: true }
      );

      onFinish(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (timeLeft === 0 && !feedback) {
      submitAnswer();
    }
  }, [timeLeft]);

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-7xl min-h-[80vh] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col lg:flex-row overflow-hidden shadow-2xl shadow-black/30">

        {/* LEFT PANEL */}
        <div className="w-full lg:w-[35%] p-6 border-r border-white/10 flex flex-col items-center space-y-6">

          <video
            src={videoSource}
            ref={videoRef}
            muted
            className="rounded-2xl"
          />

          {subtitle && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-gray-300 text-center">
              {subtitle}
            </div>
          )}

          <div className="w-full bg-white/5 border border-white/10 rounded-xl p-5">
            <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col p-6">

          <h2 className="text-xl font-semibold text-green-400 mb-4">
            AI Smart Interview
          </h2>

          {!isIntroPhase && (
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-4">
              {currentQuestion?.question}
            </div>
          )}

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer..."
            className="flex-1 bg-transparent border border-white/10 rounded-xl p-4 outline-none text-white placeholder-gray-500"
          />

          {feedback && <div className="mt-4 bg-green-500/10 border border-green-400/30 p-4 rounded-xl grid grid grid-cols-[3fr_1fr] ">
            <p>{feedback}</p>

            <button
              onClick={handleNext}
              className="w-full mt-3 bg-gradient-to-r from-green-400 to-blue-500 text-black py-2 rounded-xl flex gap-2 items-center justify-center"
            >
              Next <BsArrowRight />
            </button>
          </div>}
          <div className="flex gap-4 mt-4">

            <button
              onClick={toggleMic}
              className={`w-12 h-12 flex items-center justify-center rounded-full ${isMicOn ? "bg-green-500" : "bg-red-500"
                }`}
            >
              {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </button>

            <button
              onClick={submitAnswer}
              className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 text-black rounded-xl"
            >
              Submit
            </button>
          </div>


        </div>
      </div>
    </div>
  );
}

export default Step2Interview;