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
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Important Disclaimer</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            This platform generates <strong>synthetic illustrative biosignals</strong> for prototyping, 
            visualization, and NOEMA research planning. These signals are inspired by common EEG and 
            physiological patterns but do <strong>NOT represent real human brain measurements</strong> or 
            medical diagnostics. All data is algorithmically generated for educational and research 
            demonstration purposes only.
          </p>
        </div>
      </div>
    </div>
  );
};
