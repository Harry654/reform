import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface HeatMapProps {
  data: Array<{ x: number; y: number; z: number }>;
}

const HeatMap: React.FC<HeatMapProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis type="number" dataKey="x" name="X" />
        <YAxis type="number" dataKey="y" name="Y" />
        <ZAxis type="number" dataKey="z" range={[0, 500]} name="value" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Values" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default HeatMap;