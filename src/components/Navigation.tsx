import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, Mic2, Video, BookOpen, BarChart3, Moon, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';

const Navigation: React.FC = () => {
  const { darkMode, toggleDarkMode } = useStore();

  const links = [
    { to: '/', icon: <HomeIcon className="w-5 h-5" />, label: 'Home' },
    { to: '/speak', icon: <Mic2 className="w-5 h-5" />, label: 'Speak' },
    { to: '/record', icon: <Video className="w-5 h-5" />, label: 'Record' },
    { to: '/gestures', icon: <BookOpen className="w-5 h-5" />, label: 'Gestures' },
    { to: '/analysis', icon: <BarChart3 className="w-5 h-5" />, label: 'Analysis' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-navy-900/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              SignAI
            </h1>
            <div className="flex items-center gap-4">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="p-2 bg-white/10 rounded-lg"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-white/80" />
            )}
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;