import React from 'react';
import { motion } from 'framer-motion';

interface CameraSettingsProps {
  zoom: number;
  handDetected: boolean;
  showSettings: boolean;
  onClose: () => void;
}

const CameraSettings: React.FC<CameraSettingsProps> = ({
  zoom,
  handDetected,
  showSettings,
  onClose,
}) => {
  if (!showSettings) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute bottom-20 left-4 right-4 bg-navy-900/90 backdrop-blur-md p-4 rounded-lg"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold">Camera Settings</h3>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white"
        >
          ✕
        </button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-white/80">Zoom Level</span>
          <span className="text-white">{zoom.toFixed(1)}x</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/80">Hand Detection</span>
          <span className={handDetected ? 'text-green-400' : 'text-red-400'}>
            {handDetected ? 'Detected' : 'Not Detected'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CameraSettings;