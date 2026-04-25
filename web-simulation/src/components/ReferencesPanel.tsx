import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface Reference {
  id: number;
  authors: string;
  year: string;
  title: string;
  note: string;
  tags: string[];
}

const references: Reference[] = [
  {
    id: 1,
    authors: 'Berger, H.',
    year: '1929',
    title: 'On the Electroencephalogram of Man.',
    note: 'Foundational discovery of human EEG and alpha rhythm.',
    tags: ['EEG', 'Alpha'],
  },
  {
    id: 2,
    authors: 'Klimesch, W.',
    year: '1999',
    title: 'EEG alpha and theta oscillations reflect cognitive and memory performance.',
    note: 'Alpha/theta relationships with cognition.',
    tags: ['EEG', 'Cognition', 'Alpha'],
  },
  {
    id: 3,
    authors: 'Engel, A.K. & Fries, P.',
    year: '2010',
    title: 'Beta-band oscillations—signalling the status quo?',
    note: 'Beta activity and active cognitive states.',
    tags: ['Beta', 'Cognition'],
  },
  {
    id: 4,
    authors: 'Fries, P.',
    year: '2009',
    title: 'Neuronal gamma-band synchronization as a fundamental process in cortical computation.',
    note: 'Gamma and cortical processing concepts.',
    tags: ['Gamma', 'Cognition'],
  },
  {
    id: 5,
    authors: 'Pfurtscheller, G. & Neuper, C.',
    year: '2001',
    title: 'Motor imagery and sensorimotor rhythms.',
    note: 'Motor imagery relevance for intent systems.',
    tags: ['Motor Imagery', 'EEG'],
  },
  {
    id: 6,
    authors: 'Thayer, J.F. et al.',
    year: '2012',
    title: 'Heart rate variability and neurovisceral integration.',
    note: 'Stress/arousal physiology relevance.',
    tags: ['Stress', 'Physiology'],
  },
  {
    id: 7,
    authors: 'Luck, S.J.',
    year: '2014',
    title: 'An Introduction to the Event-Related Potential Technique.',
    note: 'Basic electrophysiological interpretation principles.',
    tags: ['EEG', 'Methods'],
  },
  {
    id: 8,
    authors: 'Makeig, S. et al.',
    year: '1996',
    title: 'Independent component analysis of EEG data.',
    note: 'Artifacts and EEG signal separation.',
    tags: ['Artifacts', 'Methods'],
  },
];

const tagColors: { [key: string]: string } = {
  EEG: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Alpha: 'bg-green-500/20 text-green-300 border-green-500/30',
  Beta: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Gamma: 'bg-red-500/20 text-red-300 border-red-500/30',
  Cognition: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Motor Imagery': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  Stress: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  Physiology: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  Methods: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  Artifacts: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
};

export const ReferencesPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass rounded-2xl overflow-hidden border border-white/10">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-neural-600 to-purple-600">
            <BookOpen size={20} className="text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-white">References & Scientific Basis</h3>
            <p className="text-sm text-gray-400">
              Selected literature and established neuroscience concepts that inspired the synthetic simulation logic
            </p>
          </div>
        </div>
        <div className="text-gray-400">
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-white/10">
          {/* Disclaimer */}
          <div className="mt-4 mb-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <p className="text-sm text-gray-300 leading-relaxed">
              These references inform broad tendencies used in the synthetic simulator. The generated 
              signals are illustrative only and do not represent real neural measurements.
            </p>
          </div>

          {/* References List */}
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {references.map((ref) => (
              <div
                key={ref.id}
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <div className="flex gap-3">
                  <div className="text-neural-400 font-semibold text-sm pt-0.5 flex-shrink-0">
                    [{ref.id}]
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-200 text-sm mb-1">
                      <span className="font-medium">{ref.authors}</span> ({ref.year})
                    </p>
                    <p className="text-gray-300 text-sm italic mb-2">{ref.title}</p>
                    <p className="text-gray-400 text-xs mb-3">{ref.note}</p>
                    <div className="flex flex-wrap gap-2">
                      {ref.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 rounded text-xs font-medium border ${
                            tagColors[tag] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Closing Statement */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-sm text-gray-400 italic">
              NOEMA bridges engineering curiosity with neuroscience-inspired experimentation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
