import React from 'react';

interface LikertScaleChartProps {
  data: Array<{ question: string; responses: number[] }>;
  labels: string[];
}

const LikertScaleChart: React.FC<LikertScaleChartProps> = ({ data, labels }) => {
  const totalResponses = (responses: number[]) => responses.reduce((a, b) => a + b, 0);
  const percentages = (responses: number[]) => {
    const total = totalResponses(responses);
    return responses.map(r => (r / total) * 100);
  };

  return (
    <div className="w-full">
      {data.map((item, index) => (
        <div key={index} className="mb-4">
          <p className="font-semibold mb-2">{item.question}</p>
          <div className="flex">
            {percentages(item.responses).map((percentage, i) => (
              <div
                key={i}
                style={{ width: `${percentage}%` }}
                className={`h-8 ${i % 2 === 0 ? 'bg-blue-500' : 'bg-blue-300'}`}
                title={`${labels[i]}: ${item.responses[i]} (${percentage.toFixed(1)}%)`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs mt-1">
            {labels.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LikertScaleChart;