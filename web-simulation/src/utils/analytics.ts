import { SignalState, SignalDataPoint, Analytics } from '../types';

export function calculateAnalytics(state: SignalState, recentData: SignalDataPoint[]): Analytics {
  const stressIndex = calculateStressIndex(state, recentData);
  const internalFocus = calculateInternalFocus(state);
  const externalVigilance = calculateExternalVigilance(state);
  const signalStability = calculateStability(recentData);
  const noiseRatio = state.noiseLevel / 100;
  const intentConfidence = calculateIntentConfidence(state);
  const alphaBetaRatio = calculateAlphaBetaRatio(state);
  const bandPowers = estimateBandPowers(state, recentData);

  return {
    stressIndex,
    internalFocus,
    externalVigilance,
    signalStability,
    noiseRatio,
    intentConfidence,
    alphaBetaRatio,
    bandPowers,
  };
}

function calculateStressIndex(state: SignalState, recentData: SignalDataPoint[]): number {
  let stress = 0;

  // Emotional state bias
  if (state.emotionalState === 'Stressed') stress += 0.65;
  else if (state.emotionalState === 'Urgent') stress += 0.85;
  else if (state.emotionalState === 'Calm') stress += 0.08;
  else if (state.emotionalState === 'Focused') stress += 0.25;
  else if (state.emotionalState === 'Fatigued') stress += 0.35;

  // Noise contribution (muscle tension, artifacts)
  stress += state.noiseLevel / 200;

  // Signal variability
  if (recentData.length > 10) {
    const variance = calculateVariance(recentData.slice(-10).map(d => d.frontal));
    stress += Math.min(variance / 5, 0.3);
  }

  // Add some controlled randomness
  stress += (Math.random() - 0.5) * 0.05;

  return Math.min(Math.max(stress, 0), 1);
}

function calculateInternalFocus(state: SignalState): number {
  let focus = 0.5;

  // Emotional state bias
  if (state.emotionalState === 'Focused') focus = 0.85;
  else if (state.emotionalState === 'Calm') focus = 0.75;
  else if (state.emotionalState === 'Stressed') focus = 0.3;
  else if (state.emotionalState === 'Fatigued') focus = 0.2;
  else if (state.emotionalState === 'Urgent') focus = 0.35;

  // Eyes closed INCREASES internal focus (reduces external distraction)
  if (state.eyeState === 'Closed') {
    focus *= 1.15;
  }

  // Active intent increases engagement
  if (state.cognitiveIntent !== 'Neutral') {
    focus += 0.08;
  }

  // Noise penalty
  focus -= state.noiseLevel / 300;

  // Controlled randomness
  focus += (Math.random() - 0.5) * 0.05;

  return Math.min(Math.max(focus, 0), 1);
}

function calculateExternalVigilance(state: SignalState): number {
  let vigilance = 0.5;

  // Emotional state bias
  if (state.emotionalState === 'Focused') vigilance = 0.8;
  else if (state.emotionalState === 'Urgent') vigilance = 0.75;
  else if (state.emotionalState === 'Calm') vigilance = 0.5;
  else if (state.emotionalState === 'Stressed') vigilance = 0.4;
  else if (state.emotionalState === 'Fatigued') vigilance = 0.15;

  // Eyes open INCREASES external vigilance
  if (state.eyeState === 'Open') {
    vigilance *= 1.15;
  } else {
    // Eyes closed reduces external awareness
    vigilance *= 0.8;
  }

  // Noise penalty
  vigilance -= state.noiseLevel / 300;

  // Controlled randomness
  vigilance += (Math.random() - 0.5) * 0.05;

  return Math.min(Math.max(vigilance, 0), 1);
}

function calculateStability(recentData: SignalDataPoint[]): number {
  if (recentData.length < 10) return 0.5;

  const recent = recentData.slice(-20);
  const variance = calculateVariance(recent.map(d => d.frontal));
  
  let stability = Math.max(0, 1 - variance / 3);

  // Add slight randomness
  stability += (Math.random() - 0.5) * 0.03;

  return Math.min(Math.max(stability, 0), 1);
}

function calculateIntentConfidence(state: SignalState): number {
  if (state.cognitiveIntent === 'Neutral') return 0.1 + Math.random() * 0.05;

  let confidence = 0.55;

  // State quality affects confidence
  if (state.emotionalState === 'Focused') confidence += 0.22;
  if (state.emotionalState === 'Calm') confidence += 0.18;
  if (state.emotionalState === 'Stressed') confidence -= 0.18;
  if (state.emotionalState === 'Fatigued') confidence -= 0.25;

  // Noise penalty
  if (state.noiseLevel > 50) confidence -= 0.2;
  
  // Signal strength bonus
  if (state.signalStrength > 70) confidence += 0.12;

  // Controlled randomness
  confidence += (Math.random() - 0.5) * 0.08;

  return Math.min(Math.max(confidence, 0), 1);
}

function calculateAlphaBetaRatio(state: SignalState): number {
  let ratio = 1.0;

  // Emotional state bias
  if (state.emotionalState === 'Calm') ratio = 2.2;
  else if (state.emotionalState === 'Focused') ratio = 0.65;
  else if (state.emotionalState === 'Stressed') ratio = 0.45;
  else if (state.emotionalState === 'Fatigued') ratio = 2.8;
  else if (state.emotionalState === 'Urgent') ratio = 0.35;

  // Eyes closed significantly increases alpha (robust effect)
  if (state.eyeState === 'Closed') {
    ratio *= 1.6;
  } else {
    ratio *= 0.85;
  }

  // Add slight randomness
  ratio *= (0.95 + Math.random() * 0.1);

  return Math.max(ratio, 0.1);
}

function estimateBandPowers(state: SignalState, recentData: SignalDataPoint[]): {
  delta: number;
  theta: number;
  alpha: number;
  beta: number;
  gamma: number;
} {
  // Approximate band powers based on state (simplified estimation)
  const basePowers = {
    Calm: { delta: 0.12, theta: 0.18, alpha: 0.45, beta: 0.18, gamma: 0.07 },
    Focused: { delta: 0.06, theta: 0.12, alpha: 0.22, beta: 0.45, gamma: 0.15 },
    Stressed: { delta: 0.08, theta: 0.15, alpha: 0.12, beta: 0.42, gamma: 0.23 },
    Fatigued: { delta: 0.18, theta: 0.38, alpha: 0.28, beta: 0.12, gamma: 0.04 },
    Urgent: { delta: 0.05, theta: 0.10, alpha: 0.10, beta: 0.38, gamma: 0.37 },
  };

  let powers = { ...basePowers[state.emotionalState] };

  // Eyes closed modulates alpha strongly
  if (state.eyeState === 'Closed') {
    powers.alpha *= 1.5;
    powers.beta *= 0.85;
  } else {
    powers.alpha *= 0.75;
    powers.beta *= 1.1;
  }

  // Normalize to sum to 1
  const total = Object.values(powers).reduce((a, b) => a + b, 0);
  Object.keys(powers).forEach(key => {
    powers[key as keyof typeof powers] /= total;
  });

  // Add slight randomness
  Object.keys(powers).forEach(key => {
    powers[key as keyof typeof powers] *= (0.95 + Math.random() * 0.1);
  });

  // Normalize again
  const total2 = Object.values(powers).reduce((a, b) => a + b, 0);
  Object.keys(powers).forEach(key => {
    powers[key as keyof typeof powers] /= total2;
  });

  return powers;
}

function calculateVariance(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
  return squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
}
