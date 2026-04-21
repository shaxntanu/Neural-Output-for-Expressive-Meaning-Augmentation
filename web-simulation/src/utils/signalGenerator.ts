import { SignalState, SignalDataPoint } from '../types';

export class SignalGenerator {
  private time = 0;
  private blinkTime = -1;
  private jawClenchTime = -1;

  generateSignal(state: SignalState): SignalDataPoint {
    this.time += 0.05;

    const baseFreq = this.getBaseFrequency(state);
    const amplitude = state.signalStrength / 100;
    const noise = (state.noiseLevel / 100) * (Math.random() - 0.5) * 2;

    const frontal = this.generateFrontalChannel(state, baseFreq, amplitude, noise);
    const motor = this.generateMotorChannel(state, baseFreq, amplitude, noise);
    const temporal = this.generateTemporalChannel(state, baseFreq, amplitude, noise);
    const physiological = this.generatePhysiologicalChannel(state, baseFreq, amplitude, noise);

    return {
      time: this.time,
      frontal,
      motor,
      temporal,
      physiological,
    };
  }

  triggerBlink() {
    this.blinkTime = this.time;
  }

  triggerJawClench() {
    this.jawClenchTime = this.time;
  }

  private getBaseFrequency(state: SignalState): number {
    switch (state.emotionalState) {
      case 'Calm': return 10; // Alpha-like
      case 'Focused': return 20; // Beta-like
      case 'Stressed': return 25;
      case 'Fatigued': return 6; // Theta-like
      case 'Urgent': return 30;
      default: return 12;
    }
  }

  private generateFrontalChannel(state: SignalState, baseFreq: number, amplitude: number, noise: number): number {
    let signal = Math.sin(this.time * baseFreq) * amplitude;
    
    // Cognitive intent modulation
    if (state.cognitiveIntent === 'Yes') {
      signal += Math.sin(this.time * 15) * 0.3 * amplitude;
    } else if (state.cognitiveIntent === 'No') {
      signal -= Math.sin(this.time * 15) * 0.3 * amplitude;
    } else if (state.cognitiveIntent === 'Help') {
      signal += Math.sin(this.time * 25) * 0.5 * amplitude;
    }

    // Emotional state effects
    if (state.emotionalState === 'Stressed') {
      signal += Math.sin(this.time * 40) * 0.4 * amplitude;
    } else if (state.emotionalState === 'Calm') {
      signal *= 0.8;
    }

    // Blink artifact
    if (this.time - this.blinkTime < 0.2 && this.time - this.blinkTime > 0) {
      signal += Math.exp(-(this.time - this.blinkTime) * 20) * 3;
    }

    return signal + noise;
  }

  private generateMotorChannel(state: SignalState, baseFreq: number, amplitude: number, noise: number): number {
    let signal = Math.sin(this.time * baseFreq * 1.2) * amplitude;

    // Intent-based lateralization
    if (state.cognitiveIntent === 'Left') {
      signal += Math.sin(this.time * 18) * 0.6 * amplitude;
    } else if (state.cognitiveIntent === 'Right') {
      signal += Math.sin(this.time * 22) * 0.6 * amplitude;
    }

    // Jaw clench artifact
    if (this.time - this.jawClenchTime < 0.5 && this.time - this.jawClenchTime > 0) {
      signal += Math.sin(this.time * 80) * Math.exp(-(this.time - this.jawClenchTime) * 5) * 4;
    }

    return signal + noise;
  }

  private generateTemporalChannel(state: SignalState, baseFreq: number, amplitude: number, noise: number): number {
    let signal = Math.sin(this.time * baseFreq * 0.9) * amplitude;

    // Language/internal processing
    if (state.cognitiveIntent === 'Help') {
      signal += Math.sin(this.time * 12) * 0.4 * amplitude;
    }

    if (state.emotionalState === 'Focused') {
      signal += Math.sin(this.time * 16) * 0.3 * amplitude;
    }

    return signal + noise;
  }

  private generatePhysiologicalChannel(state: SignalState, baseFreq: number, amplitude: number, noise: number): number {
    let signal = Math.sin(this.time * 1.2) * amplitude; // Heart rate-like

    // Eyes closed increases alpha
    if (state.eyeState === 'Closed') {
      signal += Math.sin(this.time * 10) * 0.5 * amplitude;
    }

    // Stress increases variability
    if (state.emotionalState === 'Stressed') {
      signal += Math.sin(this.time * 35) * 0.6 * amplitude;
    } else if (state.emotionalState === 'Calm') {
      signal *= 0.7;
    }

    // Urgent state
    if (state.emotionalState === 'Urgent') {
      signal += Math.sin(this.time * 45) * 0.8 * amplitude;
    }

    return signal + noise;
  }

  reset() {
    this.time = 0;
    this.blinkTime = -1;
    this.jawClenchTime = -1;
  }
}
