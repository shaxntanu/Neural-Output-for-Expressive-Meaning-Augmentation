import { SignalState, SignalDataPoint } from '../types';

// Frequency band definitions
const BANDS = {
  delta: { min: 1, max: 4, center: 2.5 },
  theta: { min: 4, max: 8, center: 6 },
  alpha: { min: 8, max: 12, center: 10 },
  beta: { min: 13, max: 30, center: 20 },
  gamma: { min: 30, max: 45, center: 35 },
};

// Band power weights for each emotional state (probabilistic tendencies)
const STATE_BAND_WEIGHTS = {
  Calm: { delta: 0.1, theta: 0.2, alpha: 0.5, beta: 0.15, gamma: 0.05 },
  Focused: { delta: 0.05, theta: 0.1, alpha: 0.2, beta: 0.5, gamma: 0.15 },
  Stressed: { delta: 0.1, theta: 0.15, alpha: 0.1, beta: 0.45, gamma: 0.2 },
  Fatigued: { delta: 0.2, theta: 0.4, alpha: 0.25, beta: 0.1, gamma: 0.05 },
  Urgent: { delta: 0.05, theta: 0.1, alpha: 0.1, beta: 0.4, gamma: 0.35 },
};

export class SignalGenerator {
  private time = 0;
  private blinkTime = -1;
  private jawClenchTime = -1;
  private phaseOffsets: { [key: string]: number } = {};

  constructor() {
    // Initialize random phase offsets for each band to add variability
    Object.keys(BANDS).forEach(band => {
      this.phaseOffsets[band] = Math.random() * Math.PI * 2;
    });
  }

  generateSignal(state: SignalState): SignalDataPoint {
    this.time += 0.05;

    const frontal = this.generateFrontalChannel(state);
    const motor = this.generateMotorChannel(state);
    const temporal = this.generateTemporalChannel(state);
    const occipital = this.generateOccipitalChannel(state);
    const physiological = this.generatePhysiologicalChannel(state);

    return {
      time: this.time,
      frontal,
      motor,
      temporal,
      occipital,
      physiological,
    };
  }

  triggerBlink() {
    this.blinkTime = this.time;
  }

  triggerJawClench() {
    this.jawClenchTime = this.time;
  }

  private generateBandMix(
    weights: { delta: number; theta: number; alpha: number; beta: number; gamma: number },
    amplitude: number,
    channelPhaseShift: number = 0
  ): number {
    let signal = 0;

    // Generate each frequency band component
    Object.entries(BANDS).forEach(([bandName, band]) => {
      const weight = weights[bandName as keyof typeof weights];
      const freq = band.center;
      const phase = this.phaseOffsets[bandName] + channelPhaseShift;
      
      // Add some frequency jitter for realism
      const freqJitter = (Math.random() - 0.5) * 0.5;
      
      signal += Math.sin(this.time * (freq + freqJitter) + phase) * weight * amplitude;
    });

    return signal;
  }

  private applyStateBias(
    baseWeights: { delta: number; theta: number; alpha: number; beta: number; gamma: number },
    state: SignalState
  ): { delta: number; theta: number; alpha: number; beta: number; gamma: number } {
    const stateWeights = STATE_BAND_WEIGHTS[state.emotionalState];
    
    // Blend base weights with state-specific weights
    return {
      delta: (baseWeights.delta + stateWeights.delta) / 2,
      theta: (baseWeights.theta + stateWeights.theta) / 2,
      alpha: (baseWeights.alpha + stateWeights.alpha) / 2,
      beta: (baseWeights.beta + stateWeights.beta) / 2,
      gamma: (baseWeights.gamma + stateWeights.gamma) / 2,
    };
  }

  private generateFrontalChannel(state: SignalState): number {
    const amplitude = state.signalStrength / 100;
    const noise = (state.noiseLevel / 100) * (Math.random() - 0.5) * 2;

    // Base band mixture
    let weights = this.applyStateBias(
      { delta: 0.1, theta: 0.15, alpha: 0.25, beta: 0.35, gamma: 0.15 },
      state
    );

    // Cognitive intent modulation (subtle)
    if (state.cognitiveIntent === 'Yes') {
      weights.beta += 0.1; // Slight increase in beta for decision confirmation
    } else if (state.cognitiveIntent === 'No') {
      weights.beta -= 0.05; // Slight suppression
    } else if (state.cognitiveIntent === 'Help') {
      weights.beta += 0.15;
      weights.gamma += 0.1; // Urgency-related increase
    }

    // Normalize weights
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    Object.keys(weights).forEach(key => {
      weights[key as keyof typeof weights] /= total;
    });

    let signal = this.generateBandMix(weights, amplitude, 0);

    // Blink artifact (frontal strongest)
    if (this.time - this.blinkTime < 0.25 && this.time - this.blinkTime > 0) {
      signal += Math.exp(-(this.time - this.blinkTime) * 15) * 2.5 * amplitude;
    }

    // Add controlled randomness
    signal += (Math.random() - 0.5) * 0.1 * amplitude;

    return signal + noise;
  }

  private generateMotorChannel(state: SignalState): number {
    const amplitude = state.signalStrength / 100;
    const noise = (state.noiseLevel / 100) * (Math.random() - 0.5) * 2;

    let weights = this.applyStateBias(
      { delta: 0.1, theta: 0.15, alpha: 0.2, beta: 0.4, gamma: 0.15 },
      state
    );

    // Motor imagery lateralization (subtle contralateral bias)
    if (state.cognitiveIntent === 'Left') {
      weights.beta += 0.12; // Right motor modulation
    } else if (state.cognitiveIntent === 'Right') {
      weights.beta += 0.12; // Left motor modulation
    }

    // Normalize
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    Object.keys(weights).forEach(key => {
      weights[key as keyof typeof weights] /= total;
    });

    let signal = this.generateBandMix(weights, amplitude, Math.PI / 4);

    // Jaw clench artifact (strong EMG contamination)
    if (this.time - this.jawClenchTime < 0.5 && this.time - this.jawClenchTime > 0) {
      const emgFreq = 60 + Math.random() * 40; // Broadband EMG
      signal += Math.sin(this.time * emgFreq) * Math.exp(-(this.time - this.jawClenchTime) * 4) * 3 * amplitude;
    }

    signal += (Math.random() - 0.5) * 0.1 * amplitude;

    return signal + noise;
  }

  private generateTemporalChannel(state: SignalState): number {
    const amplitude = state.signalStrength / 100;
    const noise = (state.noiseLevel / 100) * (Math.random() - 0.5) * 2;

    let weights = this.applyStateBias(
      { delta: 0.1, theta: 0.2, alpha: 0.25, beta: 0.3, gamma: 0.15 },
      state
    );

    // Internal speech / auditory imagery bias
    if (state.cognitiveIntent === 'Help') {
      weights.theta += 0.08;
      weights.beta += 0.08;
    }

    // Normalize
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    Object.keys(weights).forEach(key => {
      weights[key as keyof typeof weights] /= total;
    });

    let signal = this.generateBandMix(weights, amplitude, Math.PI / 3);

    // Jaw clench spillover (moderate)
    if (this.time - this.jawClenchTime < 0.5 && this.time - this.jawClenchTime > 0) {
      const emgFreq = 65 + Math.random() * 35;
      signal += Math.sin(this.time * emgFreq) * Math.exp(-(this.time - this.jawClenchTime) * 5) * 1.5 * amplitude;
    }

    signal += (Math.random() - 0.5) * 0.1 * amplitude;

    return signal + noise;
  }

  private generateOccipitalChannel(state: SignalState): number {
    const amplitude = state.signalStrength / 100;
    const noise = (state.noiseLevel / 100) * (Math.random() - 0.5) * 2;

    let weights = this.applyStateBias(
      { delta: 0.08, theta: 0.12, alpha: 0.5, beta: 0.2, gamma: 0.1 },
      state
    );

    // Eyes closed dramatically increases alpha (most robust effect)
    if (state.eyeState === 'Closed') {
      weights.alpha += 0.3;
      weights.beta -= 0.1;
    } else {
      // Eyes open suppresses alpha
      weights.alpha -= 0.15;
      weights.beta += 0.05;
    }

    // Normalize
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    Object.keys(weights).forEach(key => {
      weights[key as keyof typeof weights] /= total;
    });

    let signal = this.generateBandMix(weights, amplitude, Math.PI / 2);

    signal += (Math.random() - 0.5) * 0.1 * amplitude;

    return signal + noise;
  }

  private generatePhysiologicalChannel(state: SignalState): number {
    const amplitude = state.signalStrength / 100;
    const noise = (state.noiseLevel / 100) * (Math.random() - 0.5) * 2;

    // Pulse-like rhythm (heart rate approximation)
    const pulseRate = state.emotionalState === 'Stressed' || state.emotionalState === 'Urgent' ? 1.3 : 1.0;
    let signal = Math.sin(this.time * pulseRate) * amplitude * 0.8;

    // Arousal modulation
    let weights = this.applyStateBias(
      { delta: 0.15, theta: 0.2, alpha: 0.3, beta: 0.25, gamma: 0.1 },
      state
    );

    // Stress increases high-frequency variability
    if (state.emotionalState === 'Stressed') {
      weights.beta += 0.15;
      weights.gamma += 0.1;
    } else if (state.emotionalState === 'Urgent') {
      weights.beta += 0.2;
      weights.gamma += 0.15;
    } else if (state.emotionalState === 'Calm') {
      weights.alpha += 0.15;
      weights.delta += 0.05;
    }

    // Normalize
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    Object.keys(weights).forEach(key => {
      weights[key as keyof typeof weights] /= total;
    });

    signal += this.generateBandMix(weights, amplitude * 0.5, Math.PI);

    signal += (Math.random() - 0.5) * 0.15 * amplitude;

    return signal + noise;
  }

  reset() {
    this.time = 0;
    this.blinkTime = -1;
    this.jawClenchTime = -1;
    // Regenerate phase offsets for new randomness
    Object.keys(BANDS).forEach(band => {
      this.phaseOffsets[band] = Math.random() * Math.PI * 2;
    });
  }
}
