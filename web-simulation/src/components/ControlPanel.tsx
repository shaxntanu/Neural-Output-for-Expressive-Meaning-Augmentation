import React from 'react';
import { SignalState, CognitiveIntent, EmotionalState, EyeState } from '../types';
import { Play, Pause, Zap, Activity, Shuffle } from 'lucide-react';

interface ControlPanelProps {
  state: SignalState;
  onStateChange: (updates: Partial<SignalState>) => void;
  onBlink: () => void;
  onJawClench: () => void;
  onRandomize: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  state,
  onStateChange,
  onBlink,
  onJawClench,
  onRandomize,
}) => {
  return (
    <div className="space-y-6">
      {/* Cognitive Intent */}
      <div className="glass rounded-2xl p-6">
        <label className="block text-sm font-medium text-neural-300 mb-3">
          Cognitive Intent
        </label>
        <select
          value={state.cognitiveIntent}
          onChange={(e) => onStateChange({ cognitiveIntent: e.target.value as CognitiveIntent })}
          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-neural-500 transition-all"
        >
          <option value="Neutral">Neutral</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Help">Help</option>
          <option value="Left">Left</option>
          <option value="Right">Right</option>
        </select>
      </div>

      {/* Emotional State */}
      <div className="glass rounded-2xl p-6">
        <label className="block text-sm font-medium text-neural-300 mb-3">
          Emotional State
        </label>
        <select
          value={state.emotionalState}
          onChange={(e) => onStateChange({ emotionalState: e.target.value as EmotionalState })}
          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-neural-500 transition-all"
        >
          <option value="Calm">Calm</option>
          <option value="Stressed">Stressed</option>
          <option value="Fatigued">Fatigued</option>
          <option value="Focused">Focused</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      {/* Eye State */}
      <div className="glass rounded-2xl p-6">
        <label className="block text-sm font-medium text-neural-300 mb-3">
          Eyes
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => onStateChange({ eyeState: 'Open' })}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              state.eyeState === 'Open'
                ? 'bg-neural-600 text-white'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
            }`}
          >
            Open
          </button>
          <button
            onClick={() => onStateChange({ eyeState: 'Closed' })}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              state.eyeState === 'Closed'
                ? 'bg-neural-600 text-white'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
            }`}
          >
            Closed
          </button>
        </div>
      </div>

      {/* Noise Level */}
      <div className="glass rounded-2xl p-6">
        <label className="block text-sm font-medium text-neural-300 mb-3">
          Noise Level: {state.noiseLevel}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={state.noiseLevel}
          onChange={(e) => onStateChange({ noiseLevel: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Signal Strength */}
      <div className="glass rounded-2xl p-6">
        <label className="block text-sm font-medium text-neural-300 mb-3">
          Signal Strength: {state.signalStrength}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={state.signalStrength}
          onChange={(e) => onStateChange({ signalStrength: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Event Triggers */}
      <div className="glass rounded-2xl p-6 space-y-3">
        <button
          onClick={onBlink}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
        >
          <Zap size={18} />
          Trigger Blink Spike
        </button>
        <button
          onClick={onJawClench}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
        >
          <Activity size={18} />
          Trigger Jaw Clench
        </button>
      </div>

      {/* Control Buttons */}
      <div className="glass rounded-2xl p-6 space-y-3">
        <button
          onClick={() => onStateChange({ isRunning: !state.isRunning })}
          className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            state.isRunning
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {state.isRunning ? (
            <>
              <Pause size={18} />
              Pause Simulation
            </>
          ) : (
            <>
              <Play size={18} />
              Start Simulation
            </>
          )}
        </button>
        <button
          onClick={onRandomize}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
        >
          <Shuffle size={18} />
          Randomize Scenario
        </button>
      </div>
    </div>
  );
};
