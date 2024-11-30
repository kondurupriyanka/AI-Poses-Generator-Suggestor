import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Book, Award, Video, X, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

const Gestures: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const lessons = [
    {
      title: 'Basic Greetings',
      description: 'Learn common greeting signs like "Hello", "Goodbye", and "Thank you"',
      level: 'Beginner',
      duration: '10 mins',
      icon: <Book className="w-6 h-6 text-blue-400" />,
      videoUrl: 'https://www.youtube.com/embed/_c--P6VRTUo',
      youtubeUrl: 'https://www.youtube.com/watch?v=_c--P6VRTUo'
    },
    {
      title: 'Numbers & Counting',
      description: 'Master numbers from 1-20 and basic counting gestures',
      level: 'Beginner',
      duration: '15 mins',
      icon: <Book className="w-6 h-6 text-green-400" />,
      videoUrl: 'https://www.youtube.com/embed/iHOyIMGF0q4',
      youtubeUrl: 'https://www.youtube.com/watch?v=iHOyIMGF0q4'
    },
    {
      title: 'Common Phrases',
      description: 'Essential phrases for everyday communication',
      level: 'Intermediate',
      duration: '20 mins',
      icon: <Book className="w-6 h-6 text-purple-400" />,
      videoUrl: 'https://www.youtube.com/embed/0FcwzMq4iWg',
      youtubeUrl: 'https://www.youtube.com/watch?v=0FcwzMq4iWg'
    },
    {
      title: 'Advanced Communication',
      description: 'Complex conversations and advanced sign language techniques',
      level: 'Advanced',
      duration: '25 mins',
      icon: <Video className="w-6 h-6 text-pink-400" />,
      videoUrl: 'https://www.youtube.com/embed/NdK97BAt3V0',
      youtubeUrl: 'https://www.youtube.com/watch?v=NdK97BAt3V0'
    }
  ];

  const handleStartLesson = (lesson: typeof lessons[0]) => {
    setActiveVideo(`${lesson.videoUrl}?autoplay=1&rel=0`);
    toast.success(`Starting ${lesson.title}`);
  };

  const handleOpenYoutube = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Learn Sign Language
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Interactive lessons to help you master sign language
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {lessons.map((lesson, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-navy-900 backdrop-blur-lg border border-white/10"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/10 rounded-lg">
                {lesson.icon}
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-sm bg-blue-500/20 text-blue-200 rounded-full">
                  {lesson.level}
                </span>
                <span className="px-3 py-1 text-sm bg-purple-500/20 text-purple-200 rounded-full">
                  {lesson.duration}
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-2">
              {lesson.title}
            </h3>
            <p className="text-white/60 mb-4">{lesson.description}</p>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStartLesson(lesson)}
                className="flex-1 p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Start Lesson
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOpenYoutube(lesson.youtubeUrl)}
                className="p-3 bg-white/10 rounded-lg text-white"
                title="Open in YouTube"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </motion.button>
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full rounded-lg"
                  src={activeVideo}
                  title="Lesson Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
      >
        <div className="flex items-center gap-4">
          <Award className="w-8 h-8 text-yellow-400" />
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
              Track Your Progress
            </h3>
            <p className="text-white/60">Complete lessons to earn certificates and track your learning journey</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Gestures;