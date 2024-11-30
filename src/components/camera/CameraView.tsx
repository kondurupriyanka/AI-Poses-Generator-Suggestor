import React from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, Settings } from 'lucide-react';

interface CameraViewProps {
  webcamRef: React.RefObject<Webcam>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  zoom: number;
  setZoom: (zoom: number) => void;
  setShowSettings: (show: boolean) => void;
}

const CameraView: React.FC<CameraViewProps> = ({
  webcamRef,
  canvasRef,
  zoom,
  setZoom,
  setShowSettings,
}) => {
  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user"
  };

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
          className="p-2 bg-white/10 backdrop-blur-md rounded-lg"
        >
          <ZoomIn className="w-6 h-6 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setZoom(prev => Math.max(prev - 0.1, 1))}
          className="p-2 bg-white/10 backdrop-blur-md rounded-lg"
        >
          <ZoomOut className="w-6 h-6 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSettings(true)}
          className="p-2 bg-white/10 backdrop-blur-md rounded-lg"
        >
          <Settings className="w-6 h-6 text-white" />
        </motion.button>
      </div>

      <div className="relative">
        <Webcam
          ref={webcamRef}
          audio={false}
          className="rounded-xl w-full aspect-video object-cover"
          style={{ transform: `scale(${zoom})` }}
          mirrored
          videoConstraints={videoConstraints}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          width={640}
          height={480}
          style={{ transform: `scale(${zoom})` }}
        />
      </div>
    </div>
  );
};

export default CameraView;