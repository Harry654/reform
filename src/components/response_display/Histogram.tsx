import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HistogramProps {
  data: Array<{ bin: string; frequency: number }>;
}

const Histogram: React.FC<HistogramProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="bin" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="frequency" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Histogram;