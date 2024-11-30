import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Copy, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

const Translation: React.FC = () => {
  const { language, confidence, translation, isRecording } = useStore();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(translation);
    setCopied(true);
    toast.success('Translation copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    const speech = new SpeechSynthesisUtterance(translation);
    window.speechSynthesis.speak(speech);
    toast.success('Playing audio translation');
  };

  useEffect(() => {
    if (isRecording) {
      const translations = [
        "Hello! How are you today?",
        "I'm doing great, thank you!",
        "Nice to meet you!",
        "Have a wonderful day!"
      ];
      
      const interval = setInterval(() => {
        const randomTranslation = translations[Math.floor(Math.random() * translations.length)];
        useStore.getState().setTranslation(randomTranslation);
        useStore.getState().setConfidence(85 + Math.random() * 14);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isRecording]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Live Translation</h3>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSpeak}
            className="p-2 bg-white/10 rounded-lg"
          >
            <Volume2 className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="p-2 bg-white/10 rounded-lg"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-400" />
            ) : (
              <Copy className="w-5 h-5 text-white" />
            )}
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={translation}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-4"
        >
          <p className="text-lg text-white">
            {translation || "Start recording to see translations..."}
          </p>
        </motion.div>
      </AnimatePresence>
      
      <div className="mt-4 flex gap-2">
        <span className="px-3 py-1 text-sm bg-blue-500/20 text-blue-200 rounded-full">
          {language}
        </span>
        <span className="px-3 py-1 text-sm bg-green-500/20 text-green-200 rounded-full">
          {confidence.toFixed(1)}% Confidence
        </span>
      </div>
    </motion.div>
  );
};

export default Translation;