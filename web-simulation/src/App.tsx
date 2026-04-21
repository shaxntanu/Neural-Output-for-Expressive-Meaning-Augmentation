import React, { useState, useEffect, useRef } from 'react';
import { SignalState, SignalDataPoint, Analytics, CognitiveIntent, EmotionalState } from './types';
import { SignalGenerator } from './utils/signalGenerator';
import { calculateAnalytics } from './utils/analytics';
import { SignalChart } from './components/SignalChart';
import { ControlPanel } from './components/ControlPanel';
import { AnalyticsPanel } from './components/AnalyticsPanel';
import { ExplanationPanel } from './components/ExplanationPanel';
import { BrainVisualization } from './components/BrainVisualization';
import { PresetPanel } from './components/PresetPanel';
import { DisclaimerPanel } from './components/DisclaimerPanel';
import { ExportPanel } from './components/ExportPanel';
import { Brain } from 'lucide-react';

const MAX_DATA_POINTS = 100;

function App() {
  const [state, setState] = useState<SignalState>({
    cognitiveIntent: 'Neutral',
    emotionalState: 'Calm',
    eyeState: 'Open',
    noiseLevel: 30,
    signalStrength: 75,
    isRunning: false,
    blinkTrigger: 0,
    jawClenchTrigger: 0,
  });

  const [signalData, setSignalData] = useState<SignalDataPoint[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    stressIndex: 0,
    focusLevel: 0,
    signalStability: 0,
    noiseRatio: 0,
    intentConfidence: 0,
    alphaBetaRatio: 0,
  });

  const generatorRef = useRef(new SignalGenerator());

  useEffect(() => {
    if (!state.isRunning) return;

    const interval = setInterval(() => {
      const newPoint = generatorRef.current.generateSignal(state);
      
      setSignalData(prev => {
        const updated = [...prev, newPoint];
        if (updated.length > MAX_DATA_POINTS) {
          return updated.slice(-MAX_DATA_POINTS);
        }
        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [state]);

  useEffect(() => {
    if (signalData.length > 0) {
      const newAnalytics = calculateAnalytics(state, signalData);
      setAnalytics(newAnalytics);
    }
  }, [signalData, state]);

  const handleStateChange = (updates: Partial<SignalState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleBlink = () => {
    generatorRef.current.triggerBlink();
    setState(prev => ({ ...prev, blinkTrigger: prev.blinkTrigger + 1 }));
  };

  const handleJawClench = () => {
    generatorRef.current.triggerJawClench();
    setState(prev => ({ ...prev, jawClenchTrigger: prev.jawClenchTrigger + 1 }));
  };

  const handleRandomize = () => {
    const intents: CognitiveIntent[] = ['Yes', 'No', 'Help', 'Left', 'Right', 'Neutral'];
    const emotions: EmotionalState[] = ['Calm', 'Stressed', 'Fatigued', 'Focused', 'Urgent'];
    
    setState(prev => ({
      ...prev,
      cognitiveIntent: intents[Math.floor(Math.random() * intents.length)],
      emotionalState: emotions[Math.floor(Math.random() * emotions.length)],
      eyeState: Math.random() > 0.5 ? 'Open' : 'Closed',
      noiseLevel: Math.floor(Math.random() * 100),
      signalStrength: Math.floor(Math.random() * 50) + 50,
    }));
  };

  const handleLoadPreset = (preset: Partial<SignalState>) => {
    setState(prev => ({ ...prev, ...preset }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-neural-600 to-purple-600">
              <Brain size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-neural-400 to-purple-400 bg-clip-text text-transparent">
                NOEMA Signal Sandbox
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Synthetic Biosignal Visualization for Cognitive State Prototyping
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-3 space-y-6">
            <ControlPanel
              state={state}
              onStateChange={handleStateChange}
              onBlink={handleBlink}
              onJawClench={handleJawClench}
              onRandomize={handleRandomize}
            />
            <PresetPanel onLoadPreset={handleLoadPreset} />
            <ExportPanel data={signalData} state={state} />
          </div>

          {/* Right Panel - Visualizations */}
          <div className="lg:col-span-9 space-y-6">
            {/* Disclaimer */}
            <DisclaimerPanel />

            {/* Analytics */}
            <AnalyticsPanel analytics={analytics} />

            {/* Signal Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <SignalChart
                data={signalData}
                title="Frontal Channel"
                dataKey="frontal"
                color="#3B82F6"
              />
              <SignalChart
                data={signalData}
                title="Motor Channel"
                dataKey="motor"
                color="#10B981"
              />
              <SignalChart
                data={signalData}
                title="Temporal Channel"
                dataKey="temporal"
                color="#8B5CF6"
              />
              <SignalChart
                data={signalData}
                title="Physiological Channel"
                dataKey="physiological"
                color="#F59E0B"
              />
            </div>

            {/* Brain Visualization and Explanation */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <BrainVisualization state={state} />
              <ExplanationPanel state={state} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl mt-12">
        <div className="max-w-[1800px] mx-auto px-6 py-6 text-center text-sm text-gray-500">
          <p>NOEMA Signal Sandbox © 2024 | Research Prototype | Synthetic Data Only</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
