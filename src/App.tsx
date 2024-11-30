import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Settings, Moon, Sun } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Camera from './components/Camera';
import Translation from './components/Translation';
import Suggestions from './components/Suggestions';
import { useStore } from './store/useStore';

function App() {
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gradient-to-b from-[#0B1120] to-[#0D1F3C]' : 'bg-gradient-to-b from-blue-50 to-indigo-100'
    }`}>
      <Toaster />
      
      <header className="w-full max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 bg-blue-500 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text animate-gradient">
              Virtual Sign Language Interpreter
            </h1>
          </motion.div>
          
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 bg-white/10 backdrop-blur-md rounded-lg"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/10 backdrop-blur-md rounded-lg"
            >
              <Settings className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-6 py-8 space-y-8">
        <Camera />
        <Translation />
        <Suggestions />
      </main>

      <footer className="w-full max-w-7xl mx-auto px-6 py-8 mt-8">
        <div className="text-center text-sm text-white/60">
          <p>Powered by Advanced AI Technology</p>
          <p className="mt-2">© 2024 Virtual Sign Language Interpreter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;