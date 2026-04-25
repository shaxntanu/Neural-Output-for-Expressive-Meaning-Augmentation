import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const DisclaimerPanel: React.FC = () => {
  return (
    <div className="glass rounded-2xl p-6 border-2 border-yellow-500/30">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-yellow-500/20">
          <AlertTriangle size={20} className="text-yellow-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Synthetic Data Disclaimer</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            This simulator generates <strong>synthetic illustrative biosignals</strong> loosely inspired 
            by common patterns observed in neuroscience research. These are <strong>NOT real EEG recordings</strong>, 
            NOT medical data, and NOT diagnostic outputs.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            All signals use probabilistic multi-band mixture models for educational exploration and 
            interface prototyping. Real brain activity is far more complex, variable, and individual-specific 
            than this simplified simulation can represent.
          </p>
        </div>
      </div>
    </div>
  );
};
