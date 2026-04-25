export type CognitiveIntent = 'Yes' | 'No' | 'Help' | 'Left' | 'Right' | 'Neutral';
export type EmotionalState = 'Calm' | 'Stressed' | 'Fatigued' | 'Focused' | 'Urgent';
export type EyeState = 'Open' | 'Closed';

export interface SignalState {
  cognitiveIntent: CognitiveIntent;
  emotionalState: EmotionalState;
  eyeState: EyeState;
  noiseLevel: number;
  signalStrength: number;
  isRunning: boolean;
  blinkTrigger: number;
  jawClenchTrigger: number;
}

export interface SignalDataPoint {
  time: number;
  frontal: number;
  motor: number;
  temporal: number;
  occipital: number;
  physiological: number;
}

export interface Analytics {
  stressIndex: number;
  internalFocus: number;
  externalVigilance: number;
  signalStability: number;
  noiseRatio: number;
  intentConfidence: number;
  alphaBetaRatio: number;
  bandPowers: {
    delta: number;
    theta: number;
    alpha: number;
    beta: number;
    gamma: number;
  };
}
