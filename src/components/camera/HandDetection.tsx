import React, { useEffect, useCallback } from 'react';
import * as handpose from '@tensorflow-models/handpose';
import { drawHand, calculateHandGesture } from '../../utils/handUtils';
import toast from 'react-hot-toast';

interface HandDetectionProps {
  model: handpose.HandPose | null;
  videoElement: HTMLVideoElement | null;
  canvasContext: CanvasRenderingContext2D | null;
  onHandDetected: (detected: boolean) => void;
  onConfidenceUpdate: (confidence: number) => void;
  onGestureDetected: (gesture: string) => void;
  isRecording: boolean;
}

const HandDetection: React.FC<HandDetectionProps> = ({
  model,
  videoElement,
  canvasContext,
  onHandDetected,
  onConfidenceUpdate,
  onGestureDetected,
  isRecording,
}) => {
  const detect = useCallback(async () => {
    if (!model || !videoElement || !canvasContext) return;

    try {
      const predictions = await model.estimateHands(videoElement);
      
      if (predictions.length > 0) {
        onHandDetected(true);
        const confidence = predictions[0].score * 100;
        onConfidenceUpdate(confidence);
        
        drawHand(predictions, canvasContext);

        if (confidence > 85) {
          const gesture = calculateHandGesture(predictions[0].landmarks);
          onGestureDetected(gesture);
          toast.success(`Gesture detected: ${gesture}`, {
            duration: 1000,
            position: 'bottom-center',
          });
        }
      } else {
        onHandDetected(false);
        canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
      }
    } catch (error) {
      console.error('Hand detection error:', error);
      toast.error('Error detecting hand gestures');
    }
  }, [model, videoElement, canvasContext, onHandDetected, onConfidenceUpdate, onGestureDetected]);

  useEffect(() => {
    let animationFrame: number;
    
    const runDetection = () => {
      if (isRecording) {
        detect();
        animationFrame = requestAnimationFrame(runDetection);
      }
    };

    if (isRecording) {
      runDetection();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isRecording, detect]);

  return null;
};

export default HandDetection;