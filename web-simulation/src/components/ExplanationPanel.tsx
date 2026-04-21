import React from 'react';
import { SignalState } from '../types';
import { Info } from 'lucide-react';

interface ExplanationPanelProps {
  state: SignalState;
}

export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ state }) => {
  const generateExplanation = (): string => {
    const parts: string[] = [];

    // Emotional state
    switch (state.emotionalState) {
      case 'Calm':
        parts.push('Calm state promotes alpha-like rhythmic stability and reduced high-frequency noise.');
        break;
      case 'Stressed':
        parts.push('Stress introduces irregularity, increased beta activity, and physiological artifacts.');
        break;
      case 'Fatigued':
        parts.push('Fatigue shows slower theta-like oscillations and reduced signal amplitude.');
        break;
      case 'Focused':
        parts.push('Focused attention enhances beta activity and frontal-temporal coherence.');
        break;
      case 'Urgent':
        parts.push('Urgent state creates high-amplitude instability and elevated arousal markers.');
        break;
    }

    // Eye state
    if (state.eyeState === 'Closed') {
      parts.push('Eyes closed typically increases alpha rhythm (8-12 Hz) and reduces occipital activity.');
    } else {
      parts.push('Eyes open maintains visual processing load and suppresses alpha rhythm.');
    }

    // Cognitive intent
    if (state.cognitiveIntent !== 'Neutral') {
      parts.push(`Intent "${state.cognitiveIntent}" modulates frontal and motor regions with task-specific patterns.`);
    }

    // Noise and strength
    if (state.noiseLevel > 60) {
      parts.push('High noise levels simulate environmental interference and electrode artifacts.');
    }

    if (state.signalStrength < 40) {
      parts.push('Low signal strength may indicate poor electrode contact or weak neural activity.');
    }

    return parts.join(' ');
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-neural-600/20">
          <Info size={20} className="text-neural-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-2">Current Scenario</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {generateExplanation()}
          </p>
        </div>
      </div>
    </div>
  );
};
