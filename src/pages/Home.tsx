import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Sparkles, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      title: 'AI-Powered Recognition',
      description: 'Advanced machine learning models for accurate sign language interpretation',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-blue-400" />,
      title: 'Real-time Translation',
      description: 'Instant conversion of signs to text and speech',
    },
    {
      icon: <Wand2 className="w-6 h-6 text-pink-400" />,
      title: 'Gesture Learning',
      description: 'Interactive tutorials to learn and practice sign language',
    },
  ];

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-white">
          Virtual Sign Language Interpreter
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Breaking communication barriers with advanced AI technology
        </p>
        <Link
          to="/record"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
          >
            <div className="p-3 bg-white/10 rounded-lg w-fit">{feature.icon}</div>
            <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-2 text-white/60">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;