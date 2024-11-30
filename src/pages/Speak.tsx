import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2, StopCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Speak: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const handleStartListening = () => {
    setIsListening(!isListening);
    toast.success(isListening ? 'Stopped listening' : 'Started listening');
    
    // Simulate speech recognition
    if (!isListening) {
      const phrases = [
        "Hello, how are you?",
        "Nice to meet you",
        "Thank you",
        "Have a great day"
      ];
      const interval = setInterval(() => {
        setTranscript(phrases[Math.floor(Math.random() * phrases.length)]);
      }, 2000);
      return () => clearInterval(interval);
    }
  };

  const handleSpeak = () => {
    if (transcript) {
      const speech = new SpeechSynthesisUtterance(transcript);
      window.speechSynthesis.speak(speech);
      toast.success('Playing audio');
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-white">Voice Translation</h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Speak naturally and let AI translate to sign language
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
      >
        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartListening}
            className={`p-8 rounded-full ${
              isListening ? 'bg-red-500' : 'bg-blue-500'
            }`}
          >
            {isListening ? (
              <StopCircle className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </motion.button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-xl">
            <p className="text-white text-lg">
              {transcript || "Start speaking to see the translation..."}
            </p>
          </div>

          {transcript && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSpeak}
              className="w-full p-3 bg-blue-500 rounded-lg text-white flex items-center justify-center gap-2"
            >
              <Volume2 className="w-5 h-5" />
              Play Audio
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Speak;