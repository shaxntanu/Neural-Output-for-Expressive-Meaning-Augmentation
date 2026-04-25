import React, { useState } from 'react';
import { SignalState } from '../types';
import { Info } from 'lucide-react';

interface BrainVisualizationProps {
  state: SignalState;
}

interface RegionInfo {
  name: string;
  function: string;
  relevance: string;
}

const regionData: { [key: string]: RegionInfo } = {
  frontal: {
    name: 'Frontal Lobe',
    function: 'Executive function, decision-making, planning',
    relevance: 'Relevant to cognitive intent detection and executive control tasks',
  },
  motor: {
    name: 'Motor Cortex',
    function: 'Movement planning and execution',
    relevance: 'Relevant to motor imagery commands (left/right intent)',
  },
  temporal: {
    name: 'Temporal Lobe',
    function: 'Language processing, auditory processing, memory',
    relevance: 'Relevant to internal speech and language-related tasks',
  },
  occipital: {
    name: 'Occipital Lobe',
    function: 'Visual processing',
    relevance: 'Strongly affected by eyes open/closed state (alpha modulation)',
  },
  parietal: {
    name: 'Parietal Lobe',
    function: 'Sensory integration, spatial awareness',
    relevance: 'Relevant to attention and sensory processing',
  },
};

export const BrainVisualization: React.FC<BrainVisualizationProps> = ({ state }) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);

  const getRegionIntensity = (region: string): number => {
    let intensity = 0.3;

    switch (region) {
      case 'frontal':
        if (state.cognitiveIntent !== 'Neutral') intensity = 0.9;
        else if (state.emotionalState === 'Focused') intensity = 0.75;
        else if (state.emotionalState === 'Stressed') intensity = 0.85;
        else if (state.emotionalState === 'Calm') intensity = 0.4;
        break;

      case 'motor':
        if (state.cognitiveIntent === 'Left' || state.cognitiveIntent === 'Right') intensity = 0.95;
        else if (state.emotionalState === 'Focused') intensity = 0.5;
        break;

      case 'temporal':
        if (state.cognitiveIntent === 'Help') intensity = 0.85;
        else if (state.emotionalState === 'Focused') intensity = 0.6;
        else if (state.emotionalState === 'Calm') intensity = 0.45;
        break;

      case 'occipital':
        if (state.eyeState === 'Open') intensity = 0.7;
        else intensity = 0.25; // Eyes closed reduces visual cortex activity
        break;

      case 'parietal':
        if (state.eyeState === 'Closed') intensity = 0.8; // Alpha increase
        else if (state.emotionalState === 'Focused') intensity = 0.65;
        else intensity = 0.5;
        break;
    }

    // Modulate by emotional state
    if (state.emotionalState === 'Stressed' || state.emotionalState === 'Urgent') {
      intensity = Math.min(intensity * 1.2, 1.0);
    } else if (state.emotionalState === 'Fatigued') {
      intensity *= 0.7;
    }

    return intensity;
  };

  const getRegionColor = (region: string): string => {
    const colors: { [key: string]: string } = {
      frontal: '#3B82F6',
      motor: '#10B981',
      temporal: '#8B5CF6',
      occipital: '#F59E0B',
      parietal: '#EC4899',
    };
    return colors[region] || '#6B7280';
  };

  const getAnimationSpeed = (): string => {
    if (state.emotionalState === 'Stressed' || state.emotionalState === 'Urgent') return '1.5s';
    if (state.emotionalState === 'Fatigued') return '3.5s';
    if (state.emotionalState === 'Calm') return '2.5s';
    return '2s';
  };

  const renderRegion = (region: string, pathData: string) => {
    const intensity = getRegionIntensity(region);
    const color = getRegionColor(region);
    const isHovered = hoveredRegion === region;

    return (
      <g key={region}>
        <path
          d={pathData}
          fill={color}
          opacity={intensity}
          className="transition-all duration-500 cursor-pointer"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          onMouseEnter={() => setHoveredRegion(region)}
          onMouseLeave={() => setHoveredRegion(null)}
          style={{
            filter: isHovered
              ? `drop-shadow(0 0 12px ${color}) brightness(1.3)`
              : `drop-shadow(0 0 6px ${color})`,
          }}
        >
          <animate
            attributeName="opacity"
            values={`${intensity};${intensity * 0.7};${intensity}`}
            dur={getAnimationSpeed()}
            repeatCount="indefinite"
          />
        </path>
      </g>
    );
  };

  return (
    <div className="glass rounded-2xl p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-100">Brain Region Activity</h3>
        <button
          onClick={() => setShowLabels(!showLabels)}
          className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-gray-300"
        >
          {showLabels ? 'Hide' : 'Show'} Labels
        </button>
      </div>

      {/* Brain SVG */}
      <div className="flex justify-center items-center relative">
        <svg viewBox="0 0 400 350" className="w-full max-w-lg">
          {/* Parietal Lobe (top-back) */}
          {renderRegion(
            'parietal',
            'M 200 80 Q 250 70 280 90 Q 300 110 295 140 Q 290 160 270 170 L 240 160 Q 220 150 200 145 Q 180 150 160 160 L 130 170 Q 110 160 105 140 Q 100 110 120 90 Q 150 70 200 80 Z'
          )}

          {/* Frontal Lobe */}
          {renderRegion(
            'frontal',
            'M 200 90 Q 160 95 130 120 Q 110 140 115 170 Q 120 195 145 210 L 180 220 Q 200 225 220 220 L 255 210 Q 280 195 285 170 Q 290 140 270 120 Q 240 95 200 90 Z'
          )}

          {/* Motor Cortex (central strip) */}
          {renderRegion(
            'motor',
            'M 200 145 Q 180 150 160 160 L 145 180 Q 140 200 145 220 L 160 240 Q 180 250 200 252 Q 220 250 240 240 L 255 220 Q 260 200 255 180 L 240 160 Q 220 150 200 145 Z'
          )}

          {/* Temporal Lobes (sides) */}
          {renderRegion(
            'temporal',
            'M 115 170 Q 90 180 75 200 Q 65 220 70 245 Q 75 265 95 275 L 120 280 Q 140 275 150 260 L 145 220 Q 140 200 145 180 L 130 170 Z M 285 170 L 270 180 Q 260 200 255 220 L 250 260 Q 260 275 280 280 L 305 275 Q 325 265 330 245 Q 335 220 325 200 Q 310 180 285 170 Z'
          )}

          {/* Occipital Lobe (back) */}
          {renderRegion(
            'occipital',
            'M 200 252 Q 180 255 160 265 Q 145 275 140 295 Q 138 315 155 325 Q 175 335 200 337 Q 225 335 245 325 Q 262 315 260 295 Q 255 275 240 265 Q 220 255 200 252 Z'
          )}

          {/* Labels */}
          {showLabels && (
            <>
              <text x="200" y="75" textAnchor="middle" fill="#E5E7EB" fontSize="11" fontWeight="600">
                Parietal
              </text>
              <text x="200" y="115" textAnchor="middle" fill="#E5E7EB" fontSize="11" fontWeight="600">
                Frontal
              </text>
              <text x="200" y="175" textAnchor="middle" fill="#E5E7EB" fontSize="11" fontWeight="600">
                Motor
              </text>
              <text x="95" y="235" textAnchor="middle" fill="#E5E7EB" fontSize="10">
                Temporal
              </text>
              <text x="305" y="235" textAnchor="middle" fill="#E5E7EB" fontSize="10">
                Temporal
              </text>
              <text x="200" y="310" textAnchor="middle" fill="#E5E7EB" fontSize="11" fontWeight="600">
                Occipital
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Tooltip */}
      {hoveredRegion && (
        <div className="mt-4 p-4 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
          <div className="flex items-start gap-2">
            <Info size={18} className="text-neural-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">
                {regionData[hoveredRegion].name}
              </h4>
              <p className="text-xs text-gray-300 mb-2">
                <span className="text-gray-400">Function:</span> {regionData[hoveredRegion].function}
              </p>
              <p className="text-xs text-gray-400">
                <span className="text-gray-300">NOEMA Relevance:</span>{' '}
                {regionData[hoveredRegion].relevance}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
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
          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
          <span className="text-gray-400">Parietal: Sensory</span>
        </div>
      </div>

      {/* Activity Indicator */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <span>Activity Level</span>
          <span className="text-gray-300">
            {state.emotionalState === 'Stressed' || state.emotionalState === 'Urgent'
              ? 'High'
              : state.emotionalState === 'Fatigued'
              ? 'Low'
              : 'Medium'}
          </span>
        </div>
        <div className="flex gap-1">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                i <
                (state.emotionalState === 'Stressed' || state.emotionalState === 'Urgent'
                  ? 9
                  : state.emotionalState === 'Fatigued'
                  ? 3
                  : 6)
                  ? 'bg-gradient-to-r from-neural-500 to-purple-500'
                  : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
