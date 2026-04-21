import React from 'react';
import { SignalState } from '../types';
import { Sparkles } from 'lucide-react';

interface PresetPanelProps {
  onLoadPreset: (preset: Partial<SignalState>) => void;
}

export const PresetPanel: React.FC<PresetPanelProps> = ({ onLoadPreset }) => {
  const presets = [
    {
      name: 'Meditation',
      state: {
        cognitiveIntent: 'Neutral' as const,
        emotionalState: 'Calm' as const,
        eyeState: 'Closed' as const,
        noiseLevel: 10,
        signalStrength: 80,
      },
      color: 'from-green-600 to-emerald-600',
    },
    {
      name: 'Exam Stress',
      state: {
        cognitiveIntent: 'Neutral' as const,
        emotionalState: 'Stressed' as const,
        eyeState: 'Open' as const,
        noiseLevel: 60,
        signalStrength: 70,
      },
      color: 'from-red-600 to-orange-600',
    },
    {
      name: 'Silent Yes',
      state: {
        cognitiveIntent: 'Yes' as const,
        emotionalState: 'Focused' as const,
        eyeState: 'Open' as const,
        noiseLevel: 20,
        signalStrength: 85,
      },
      color: 'from-blue-600 to-cyan-600',
    },
    {
      name: 'Emergency Help',
      state: {
        cognitiveIntent: 'Help' as const,
        emotionalState: 'Urgent' as const,
        eyeState: 'Open' as const,
        noiseLevel: 40,
        signalStrength: 90,
      },
      color: 'from-purple-600 to-pink-600',
    },
  ];

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
        <Sparkles size={20} className="text-neural-400" />
        Scenario Presets
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onLoadPreset(preset.state)}
            className={`bg-gradient-to-r ${preset.color} hover:opacity-90 text-white py-3 px-4 rounded-lg font-medium transition-all text-sm`}
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
};
