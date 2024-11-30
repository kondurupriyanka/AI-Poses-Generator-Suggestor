import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { Toaster } from 'react-hot-toast';
import { useStore } from '../store/useStore';

const Layout: React.FC = () => {
  const { darkMode } = useStore();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-navy-900' : 'bg-navy-800'
    }`}>
      <Toaster />
      <Navigation />
      <main className="w-full max-w-7xl mx-auto px-6 py-8 space-y-8">
        <Outlet />
      </main>
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 mt-8 bg-navy-900">
        <div className="text-center text-sm text-white/60">
          <p>Powered by Advanced AI Technology</p>
          <p className="mt-2">© 2024 Virtual Sign Language Interpreter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;