import React from 'react';
import { SignalDataPoint, SignalState } from '../types';
import { Download, Camera, FileText } from 'lucide-react';

interface ExportPanelProps {
  data: SignalDataPoint[];
  state: SignalState;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ data, state }) => {
  const saveSnapshot = () => {
    const snapshot = {
      timestamp: new Date().toISOString(),
      state,
      dataPoints: data.length,
    };
    
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `noema-snapshot-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const headers = ['time', 'frontal', 'motor', 'temporal', 'physiological'];
    const csv = [
      headers.join(','),
      ...data.map(d => `${d.time},${d.frontal},${d.motor},${d.temporal},${d.physiological}`)
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `noema-signals-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPNG = () => {
    alert('PNG export would capture the current visualization. This requires additional canvas rendering logic.');
  };

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Export Tools</h3>
      <div className="space-y-3">
        <button
          onClick={saveSnapshot}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
        >
          <FileText size={18} />
          Save Scenario Snapshot
        </button>
        <button
          onClick={exportCSV}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Export CSV Signals
        </button>
        <button
          onClick={exportPNG}
          className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
        >
          <Camera size={18} />
          Export PNG Graph
        </button>
      </div>
    </div>
  );
};
