"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import tasks from "@/data/question";

export const RandomQuestion: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);
  const [infiniteMode, setInfiniteMode] = useState<boolean>(false);
  const [showCongrats, setShowCongrats] = useState<boolean>(false);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState(false);

  const remainingQuestions = tasks.length - usedQuestions.length;

  const getRandomQuestion = useCallback(() => {
    if (!isStarted) {
      setIsStarted(true);
    }

    if (infiniteMode) {
      const randomIndex = Math.floor(Math.random() * tasks.length);
      setCurrentQuestion(tasks[randomIndex]);
      return;
    }

    if (remainingQuestions === 0) {
      setShowPrompt(true);
      return;
    }

    const unusedQuestions = tasks.filter((q) => !usedQuestions.includes(q));

    if (unusedQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
      const newQuestion = unusedQuestions[randomIndex];

      setCurrentQuestion(newQuestion);
      setUsedQuestions((prev) => [...prev, newQuestion]);

      if (unusedQuestions.length === 1) {
        setTimeout(() => setShowPrompt(true), 1000);
      }
    }
  }, [usedQuestions, infiniteMode, remainingQuestions, isStarted]);

  const handleContinueChoice = (choice: boolean) => {
    if (choice) {
      setInfiniteMode(true);
      setShowPrompt(false);
      getRandomQuestion();
    } else {
      setShowPrompt(false);
      setShowCongrats(true);
    }
  };

  const closeTab = () => {
    window.close();
    if (!window.closed) {
      window.location.href = "about:blank";
    }
  };

  return (
    <div className="h-[80vh] bg-[#1a1f2e] p-4 flex flex-col items-center justify-center w-[80vw]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="bg-[#1e2536]/80 rounded-lg shadow-xl p-6">
          <div className="space-y-1 flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-red-700" />
            </div>
            <h2 className="text-2xl font-bold text-white text-center">
              Love & Bond Game
            </h2>
            <p className="text-zinc-400 text-center">
              Explore your relationship through exciting questions!
            </p>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {!isStarted ? (
                <motion.div
                  key="start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center text-zinc-300 py-4"
                >
                  Click the button to start the game!
                </motion.div>
              ) : (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-[#252b3d] rounded-lg p-6 text-center"
                >
                  <p className="text-lg text-white">{currentQuestion}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              <button
                onClick={getRandomQuestion}
                className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 text-white 
                  transition-all duration-200 flex items-center justify-center gap-2 rounded-lg"
              >
                <Sparkles className="w-5 h-5" />
                Get Random Question
              </button>

              {!infiniteMode && !showPrompt && !showCongrats && (
                <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Questions remaining: {remainingQuestions}
                </div>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-[#1e2536] p-6 rounded-lg shadow-xl">
                <p className="mb-4 text-white">
                  You&apos;ve completed all questions! Would you like to continue
                  playing? yeah
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => handleContinueChoice(true)}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 
                      transition-all duration-200"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleContinueChoice(false)}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                      transition-all duration-200"
                  >
                    No
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {showCongrats && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="bg-[#1e2536] p-8 rounded-lg shadow-xl text-center max-w-md mx-4"
              >
                <motion.div
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  className="mb-6"
                >
                  <span className="text-6xl">🎉</span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-bold mb-4 text-white"
                >
                  Congratulations!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 text-zinc-300"
                >
                  You have successfully completed the game! Thank you for
                  playing!
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeTab}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                    transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Close Game
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
