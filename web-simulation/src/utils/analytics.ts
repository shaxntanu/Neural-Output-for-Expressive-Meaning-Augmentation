import { SignalState, SignalDataPoint, Analytics } from '../types';

export function calculateAnalytics(state: SignalState, recentData: SignalDataPoint[]): Analytics {
  const stressIndex = calculateStressIndex(state, recentData);
  const focusLevel = calculateFocusLevel(state);
  const signalStability = calculateStability(recentData);
  const noiseRatio = state.noiseLevel / 100;
  const intentConfidence = calculateIntentConfidence(state);
  const alphaBetaRatio = calculateAlphaBetaRatio(state);

  return {
    stressIndex,
    focusLevel,
    signalStability,
    noiseRatio,
    intentConfidence,
    alphaBetaRatio,
  };
}

function calculateStressIndex(state: SignalState, recentData: SignalDataPoint[]): number {
  let stress = 0;

  if (state.emotionalState === 'Stressed') stress += 0.7;
  else if (state.emotionalState === 'Urgent') stress += 0.9;
  else if (state.emotionalState === 'Calm') stress += 0.1;
  else if (state.emotionalState === 'Focused') stress += 0.3;
  else if (state.emotionalState === 'Fatigued') stress += 0.4;

  stress += state.noiseLevel / 200;

  if (recentData.length > 10) {
    const variance = calculateVariance(recentData.slice(-10).map(d => d.frontal));
    stress += Math.min(variance / 5, 0.3);
  }

  return Math.min(Math.max(stress, 0), 1);
}

function calculateFocusLevel(state: SignalState): number {
  let focus = 0.5;

  if (state.emotionalState === 'Focused') focus = 0.85;
  else if (state.emotionalState === 'Calm') focus = 0.7;
  else if (state.emotionalState === 'Stressed') focus = 0.3;
  else if (state.emotionalState === 'Fatigued') focus = 0.2;
  else if (state.emotionalState === 'Urgent') focus = 0.4;

  if (state.eyeState === 'Closed') focus *= 0.8;
  if (state.cognitiveIntent !== 'Neutral') focus += 0.1;

  focus -= state.noiseLevel / 300;

  return Math.min(Math.max(focus, 0), 1);
}

function calculateStability(recentData: SignalDataPoint[]): number {
  if (recentData.length < 10) return 0.5;

  const recent = recentData.slice(-20);
  const variance = calculateVariance(recent.map(d => d.frontal));
  
  return Math.max(0, 1 - variance / 3);
}

function calculateIntentConfidence(state: SignalState): number {
  if (state.cognitiveIntent === 'Neutral') return 0.1;

  let confidence = 0.6;

  if (state.emotionalState === 'Focused') confidence += 0.2;
  if (state.emotionalState === 'Calm') confidence += 0.15;
  if (state.emotionalState === 'Stressed') confidence -= 0.2;
  if (state.noiseLevel > 50) confidence -= 0.2;
  if (state.signalStrength > 70) confidence += 0.1;

  return Math.min(Math.max(confidence, 0), 1);
}

function calculateAlphaBetaRatio(state: SignalState): number {
  let ratio = 1.0;

  if (state.emotionalState === 'Calm') ratio = 2.5;
  else if (state.emotionalState === 'Focused') ratio = 0.6;
  else if (state.emotionalState === 'Stressed') ratio = 0.4;
  else if (state.emotionalState === 'Fatigued') ratio = 3.0;
  else if (state.emotionalState === 'Urgent') ratio = 0.3;

  if (state.eyeState === 'Closed') ratio *= 1.5;

  return Math.max(ratio, 0.1);
}

function calculateVariance(values: number[]): number {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
  return squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
}
