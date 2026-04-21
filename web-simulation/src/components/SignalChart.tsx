import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { SignalDataPoint } from '../types';

interface SignalChartProps {
  data: SignalDataPoint[];
  title: string;
  dataKey: keyof Omit<SignalDataPoint, 'time'>;
  color: string;
}

export const SignalChart: React.FC<SignalChartProps> = ({ data, title, dataKey, color }) => {
  return (
    <div className="glass rounded-2xl p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-100 mb-3 sm:mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#6B7280"
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
            tickFormatter={(value) => value.toFixed(1)}
          />
          <YAxis 
            stroke="#6B7280"
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
            domain={[-3, 3]}
          />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
