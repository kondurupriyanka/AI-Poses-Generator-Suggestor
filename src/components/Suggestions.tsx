import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Lightbulb, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';

const Suggestions: React.FC = () => {
  const { isRecording } = useStore();

  const suggestions = [
    {
      icon: <AlertCircle className="w-5 h-5 text-yellow-300" />,
      text: "Move your hand slightly higher for better recognition"
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-yellow-300" />,
      text: "Try to sign at a moderate pace for optimal accuracy"
    },
    {
      icon: <Sun className="w-5 h-5 text-yellow-300" />,
      text: "Ensure good lighting for optimal performance"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-900 to-purple-900"
    >
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="w-6 h-6 text-yellow-300" />
        <h3 className="text-xl font-semibold text-white">Suggestions</h3>
      </div>
      
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center gap-3"
          >
            {suggestion.icon}
            <p className="text-white">{suggestion.text}</p>
          </motion.div>
        ))}

        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-green-500/20 rounded-xl border border-green-500/30"
          >
            <p className="text-green-300 text-center">
              AI model is actively learning from your signs to improve accuracy
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Suggestions;