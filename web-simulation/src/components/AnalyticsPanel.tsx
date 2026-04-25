import React from 'react';
import { Analytics } from '../types';
import { TrendingUp, Brain, Activity, Waves, Target, Zap, Eye, EyeOff } from 'lucide-react';

interface AnalyticsPanelProps {
  analytics: Analytics;
}

export const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ analytics }) => {
  const metrics = [
    {
      label: 'Stress Index',
      value: analytics.stressIndex,
      icon: TrendingUp,
      color: 'from-red-500 to-orange-500',
    },
    {
      label: 'Internal Focus',
      value: analytics.internalFocus,
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'External Vigilance',
      value: analytics.externalVigilance,
      icon: Eye,
      color: 'from-teal-500 to-green-500',
    },
    {
      label: 'Signal Stability',
      value: analytics.signalStability,
      icon: Activity,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Intent Confidence',
      value: analytics.intentConfidence,
      icon: Target,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      label: 'Alpha/Beta Ratio',
      value: Math.min(analytics.alphaBetaRatio / 3, 1),
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      displayValue: analytics.alphaBetaRatio.toFixed(2),
    },
  ];

  const bandPowers = [
    { label: 'Delta', value: analytics.bandPowers.delta, color: 'bg-purple-600' },
    { label: 'Theta', value: analytics.bandPowers.theta, color: 'bg-blue-600' },
    { label: 'Alpha', value: analytics.bandPowers.alpha, color: 'bg-green-600' },
    { label: 'Beta', value: analytics.bandPowers.beta, color: 'bg-yellow-600' },
    { label: 'Gamma', value: analytics.bandPowers.gamma, color: 'bg-red-600' },
  ];

  return (
    <div className="space-y-4">
      {/* Main Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const percentage = Math.round(metric.value * 100);
          
          return (
            <div key={metric.label} className="glass rounded-2xl p-4 sm:p-5 hover:bg-white/10 transition-all">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${metric.color}`}>
                  <Icon size={16} className="sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-400 mb-1 truncate">{metric.label}</div>
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    {metric.displayValue || `${percentage}%`}
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${metric.color} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Band Power Visualization */}
      <div className="glass rounded-2xl p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Waves className="text-neural-400" size={20} />
          <h3 className="text-lg font-semibold text-white">Frequency Band Powers</h3>
        </div>
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {bandPowers.map((band) => {
            const percentage = Math.round(band.value * 100);
            return (
              <div key={band.label} className="text-center">
                <div className="mb-2 h-32 bg-gray-800 rounded-lg overflow-hidden flex flex-col-reverse">
                  <div
                    className={`${band.color} transition-all duration-500`}
                    style={{ height: `${percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 mb-1">{band.label}</div>
                <div className="text-sm font-semibold text-white">{percentage}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
