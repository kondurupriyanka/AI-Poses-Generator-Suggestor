import React from 'react';
import { motion } from 'framer-motion';
import Camera from '../components/Camera';
import Translation from '../components/Translation';
import Suggestions from '../components/Suggestions';

const Record: React.FC = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-white">Sign Language Recording</h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Record sign language gestures for real-time translation
        </p>
      </motion.div>

      <Camera />
      <Translation />
      <Suggestions />
    </div>
  );
};

export default Record;