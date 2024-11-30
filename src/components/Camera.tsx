import React, { useCallback, useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera as CameraIcon, RefreshCw } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs';
import CameraView from './camera/CameraView';
import CameraSettings from './camera/CameraSettings';
import HandDetection from './camera/HandDetection';

const Camera: React.FC = () => {
  const { isRecording, toggleRecording, setConfidence, setTranslation } = useStore();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<handpose.HandPose | null>(null);
  const [zoom, setZoom] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [handDetected, setHandDetected] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await handpose.load();
        setModel(loadedModel);
        toast.success('AI Model loaded successfully');
      } catch (error) {
        toast.error('Failed to load AI model');
        console.error('Model loading error:', error);
      }
    };
    loadModel();
  }, []);

  const handleStartRecording = useCallback(() => {
    if (!model) {
      toast.error('AI Model not loaded yet');
      return;
    }
    toggleRecording();
    toast.success(isRecording ? 'Recording stopped' : 'Recording started', {
      icon: isRecording ? '⏹️' : '⏺️',
      position: 'bottom-center',
    });
  }, [isRecording, toggleRecording, model]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-900 to-blue-900 p-1"
      >
        <CameraView
          webcamRef={webcamRef}
          canvasRef={canvasRef}
          zoom={zoom}
          setZoom={setZoom}
          setShowSettings={setShowSettings}
        />

        <AnimatePresence>
          <CameraSettings
            zoom={zoom}
            handDetected={handDetected}
            showSettings={showSettings}
            onClose={() => setShowSettings(false)}
          />
        </AnimatePresence>

        <HandDetection
          model={model}
          videoElement={webcamRef.current?.video ?? null}
          canvasContext={canvasRef.current?.getContext('2d') ?? null}
          onHandDetected={setHandDetected}
          onConfidenceUpdate={setConfidence}
          onGestureDetected={setTranslation}
          isRecording={isRecording}
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartRecording}
            className={`mx-auto flex items-center justify-center w-16 h-16 rounded-full ${
              isRecording ? 'bg-red-500' : 'bg-blue-500'
            }`}
          >
            <CameraIcon className="w-8 h-8 text-white" />
          </motion.button>
        </div>

        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm text-white">Recording</span>
          </div>
        )}

        {!model && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-white">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span>Loading AI Model...</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Camera;