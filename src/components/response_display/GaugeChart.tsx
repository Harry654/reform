import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  value: number;
  min: number;
  max: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, min, max }) => {
  const data = [
    { name: 'Value', value: value - min },
    { name: 'Remaining', value: max - value },
  ];

  const COLORS = ['#0088FE', '#EEEEEE'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="24">
          {value}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GaugeChart;