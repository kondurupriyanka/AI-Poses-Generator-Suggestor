import { fingerJoints } from './constants';

interface Prediction {
  landmarks: number[][];
  score: number;
}

interface GesturePattern {
  name: string;
  check: (landmarks: number[][]) => boolean;
}

const gesturePatterns: GesturePattern[] = [
  {
    name: 'Hello',
    check: (landmarks) => {
      const thumb = landmarks[4];
      const index = landmarks[8];
      return Math.abs(thumb[1] - index[1]) < 30;
    }
  },
  {
    name: 'Thank You',
    check: (landmarks) => {
      const palm = landmarks[0];
      const fingertips = [landmarks[4], landmarks[8], landmarks[12], landmarks[16], landmarks[20]];
      return fingertips.every(tip => tip[1] < palm[1]);
    }
  },
  {
    name: 'Good Morning',
    check: (landmarks) => {
      const palm = landmarks[0];
      const fingertips = [landmarks[8], landmarks[12]];
      return fingertips.every(tip => tip[1] < palm[1] - 100);
    }
  }
];

export const drawHand = (predictions: Prediction[], ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  predictions.forEach((prediction) => {
    const landmarks = prediction.landmarks;

    // Draw joints
    landmarks.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point[0], point[1], 5, 0, 3 * Math.PI);
      ctx.fillStyle = '#00ff00';
      ctx.fill();
    });

    // Draw connections
    fingerJoints.forEach((finger) => {
      finger.forEach((joint, index) => {
        if (index === 0) return;

        const [x1, y1] = landmarks[finger[index - 1]];
        const [x2, y2] = landmarks[joint];

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });
  });
};

export const calculateHandGesture = (landmarks: number[][]): string => {
  for (const pattern of gesturePatterns) {
    if (pattern.check(landmarks)) {
      return pattern.name;
    }
  }
  return "Unknown Gesture";
};