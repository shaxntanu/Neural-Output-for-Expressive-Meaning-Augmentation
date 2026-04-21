import React from 'react';
import { SignalState } from '../types';

interface BrainVisualizationProps {
  state: SignalState;
}

export const BrainVisualization: React.FC<BrainVisualizationProps> = ({ state }) => {
  const getRegionOpacity = (region: string): number => {
    let opacity = 0.3;

    switch (region) {
      case 'frontal':
        if (state.cognitiveIntent !== 'Neutral') opacity = 0.9;
        else if (state.emotionalState === 'Focused') opacity = 0.7;
        break;
      case 'motor':
        if (state.cognitiveIntent === 'Left' || state.cognitiveIntent === 'Right') opacity = 0.9;
        break;
      case 'temporal':
        if (state.cognitiveIntent === 'Help') opacity = 0.8;
        else if (state.emotionalState === 'Focused') opacity = 0.6;
        break;
      case 'occipital':
        if (state.eyeState === 'Open') opacity = 0.7;
        else opacity = 0.2;
        break;
      case 'limbic':
        if (state.emotionalState === 'Stressed' || state.emotionalState === 'Urgent') opacity = 0.9;
        else if (state.emotionalState === 'Calm') opacity = 0.4;
        break;
    }

    return opacity;
  };

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Brain Region Activity</h3>
      <div className="flex justify-center items-center">
        <svg viewBox="0 0 300 300" className="w-full max-w-md">
          {/* Frontal Lobe */}
          <ellipse
            cx="150"
            cy="100"
            rx="60"
            ry="50"
            fill="#3B82F6"
            opacity={getRegionOpacity('frontal')}
            className="transition-opacity duration-500"
          >
            <animate
              attributeName="opacity"
              values={`${getRegionOpacity('frontal')};${getRegionOpacity('frontal') * 0.7};${getRegionOpacity('frontal')}`}
              dur="2s"
              repeatCount="indefinite"
            />
          </ellipse>
          
          {/* Motor Cortex */}
          <ellipse
            cx="150"
            cy="150"
            rx="70"
            ry="40"
            fill="#10B981"
            opacity={getRegionOpacity('motor')}
            className="transition-opacity duration-500"
          >
            <animate
              attributeName="opacity"
              values={`${getRegionOpacity('motor')};${getRegionOpacity('motor') * 0.7};${getRegionOpacity('motor')}`}
              dur="2s"
              repeatCount="indefinite"
            />
          </ellipse>
          
          {/* Temporal Lobe */}
          <ellipse
            cx="90"
            cy="180"
            rx="40"
            ry="50"
            fill="#8B5CF6"
            opacity={getRegionOpacity('temporal')}
            className="transition-opacity duration-500"
          >
            <animate
              attributeName="opacity"
              values={`${getRegionOpacity('temporal')};${getRegionOpacity('temporal') * 0.7};${getRegionOpacity('temporal')}`}
              dur="2s"
              repeatCount="indefinite"
            />
          </ellipse>
          
          <ellipse
            cx="210"
            cy="180"
            rx="40"
            ry="50"
            fill="#8B5CF6"
            opacity={getRegionOpacity('temporal')}
            className="transition-opacity duration-500"
          >
            <animate
              attributeName="opacity"
              values={`${getRegionOpacity('temporal')};${getRegionOpacity('temporal') * 0.7};${getRegionOpacity('temporal')}`}
              dur="2s"
              repeatCount="indefinite"
            />
          </ellipse>
          
          {/* Occipital Lobe */}
          <ellipse
            cx="150"
            cy="220"
            rx="50"
            ry="40"
            fill="#F59E0B"
            opacity={getRegionOpacity('occipital')}
            className="transition-opacity duration-500"
          >
            <animate
              attributeName="opacity"
              values={`${getRegionOpacity('occipital')};${getRegionOpacity('occipital') * 0.7};${getRegionOpacity('occipital')}`}
              dur="2s"
              repeatCount="indefinite"
            />
          </ellipse>
          
          {/* Limbic System (center) */}
          <circle
            cx="150"
            cy="160"
            r="25"
            fill="#EF4444"
            opacity={getRegionOpacity('limbic')}
            className="transition-opacity duration-500"
          >
            <animate
              attributeName="opacity"
              values={`${getRegionOpacity('limbic')};${getRegionOpacity('limbic') * 0.7};${getRegionOpacity('limbic')}`}
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Labels */}
          <text x="150" y="95" textAnchor="middle" fill="#E5E7EB" fontSize="12" fontWeight="bold">
            Frontal
          </text>
          <text x="150" y="145" textAnchor="middle" fill="#E5E7EB" fontSize="12" fontWeight="bold">
            Motor
          </text>
          <text x="70" y="185" textAnchor="middle" fill="#E5E7EB" fontSize="10">
            Temporal
          </text>
          <text x="230" y="185" textAnchor="middle" fill="#E5E7EB" fontSize="10">
            Temporal
          </text>
          <text x="150" y="215" textAnchor="middle" fill="#E5E7EB" fontSize="12" fontWeight="bold">
            Occipital
          </text>
          <text x="150" y="165" textAnchor="middle" fill="#E5E7EB" fontSize="10">
            Limbic
          </text>
        </svg>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-gray-400">Frontal: Decisions</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-400">Motor: Movement</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-gray-400">Temporal: Language</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-gray-400">Occipital: Visual</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-gray-400">Limbic: Emotion</span>
        </div>
      </div>
    </div>
  );
};
