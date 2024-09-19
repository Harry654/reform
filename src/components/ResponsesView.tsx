import React, { useState } from "react";
import BarChart from "@/components/response_display/BarChart";
import PieChart from "@/components/response_display/PieChart";
import DonutChart from "@/components/response_display/DonutChart";
// import StackedBarChart from "@/components/response_display/StackedBarChart";
import LineGraph from "@/components/response_display/LineGraph";
import HeatMap from "@/components/response_display/HeatMap";
import RadarChart from "@/components/response_display/RadarChart";
import WordCloud from "@/components/response_display/WordCloud";
import Histogram from "@/components/response_display/Histogram";
import GaugeChart from "@/components/response_display/GaugeChart";
import { responseVisualizations } from "@/constants/responseVisualizations";
import { TQuestionResponse } from "@/types/response";
import { BaseQuestion } from "@/types/question";
import { surveyQuestions } from "@/constants/question_types";

export type ChartQuestion = BaseQuestion & { responses: TQuestionResponse[] };

interface ResponsesViewProps {
  questions: ChartQuestion[];
}

const ResponsesView: React.FC<ResponsesViewProps> = ({ questions }) => {
  const [chartTypes, setChartTypes] = useState<{ [key: string]: string }>({});

  const getDefaultChartType = (questionType: string) => {
    return responseVisualizations[
      questionType as keyof typeof responseVisualizations
    ][0];
  };

  const handleChartTypeChange = (questionId: string, chartType: string) => {
    setChartTypes((prev) => ({ ...prev, [questionId]: chartType }));
  };

  //   const renderChart = (question: Question, chartType: string) => {
  //     // This is a simplified example. You'll need to process the response data
  //     // to fit the format required by each chart type.
  //     const data = question.responses.reduce((acc, response) => {
  //       acc[response] = (acc[response] || 0) + 1;
  //       return acc;
  //     }, {} as { [key: string]: number });

  //     const chartData = Object.entries(data).map(([name, value]) => ({
  //       name,
  //       value,
  //     }));

  //     switch (chartType) {
  //       case "bar-chart":
  //         return <BarChart data={chartData} />;
  //       case "pie-chart":
  //         return <PieChart data={chartData} />;
  //       case "donut-chart":
  //         return <DonutChart data={chartData} />;
  //       case "stacked-bar-chart":
  //         // You'll need to process the data differently for stacked bar charts
  //         return <StackedBarChart data={chartData} keys={Object.keys(data)} />;
  //       case "line-graph":
  //         return <LineGraph data={chartData} />;
  //       case "heat-map":
  //         // You'll need to process the data differently for heat maps
  //         return <HeatMap data={[]} />;
  //       case "radar-chart":
  //         // You'll need to process the data differently for radar charts
  //         return <RadarChart data={[]} />;
  //       case "word-cloud":
  //         return <WordCloud words={chartData} />;
  //       case "histogram":
  //         return <Histogram data={chartData} />;
  //       case "gauge-chart":
  //         // You'll need to process the data differently for gauge charts
  //         return <GaugeChart value={0} min={0} max={100} />;
  //       default:
  //         return <p>Unsupported chart type</p>;
  //     }
  //   };

  const renderChart = (question: ChartQuestion, chartType: string) => {
    // Process the responses based on the question type
    const data = question.responses.reduce((acc, response) => {
      const { answer } = response;

      if (typeof answer === "string" || typeof answer === "number") {
        // Handle single string or number answers
        acc[answer] = (acc[answer] || 0) + 1;
      } else if (typeof answer === "boolean") {
        // Convert boolean to string and count
        const boolAsString = answer ? "true" : "false";
        acc[boolAsString] = (acc[boolAsString] || 0) + 1;
      } else if (Array.isArray(answer)) {
        // Handle multiple choice (array of answers)
        answer.forEach((ans) => {
          acc[ans] = (acc[ans] || 0) + 1;
        });
      } else if (typeof answer === "object" && !(answer instanceof File)) {
        // Handle object answers (e.g., key-value pairs)
        Object.entries(answer).forEach(([key, value]) => {
          const combinedAnswer = `${key}: ${value}`;
          acc[combinedAnswer] = (acc[combinedAnswer] || 0) + 1;
        });
      }
      return acc;
    }, {} as { [key: string]: number });

    // Convert processed data into a format suitable for charts
    const chartData = Object.entries(data).map(([name, value]) => ({
      name,
      value,
    }));

    switch (chartType) {
      case "bar-chart":
        return <BarChart data={chartData} yAxisLabel="Number of Respondents" />;
      case "pie-chart":
        return <PieChart data={chartData} />;
      case "donut-chart":
        return <DonutChart data={chartData} />;
      case "stacked-bar-chart":
        return null;
      // <StackedBarChart data={chartData} keys={Object.keys(data)} />;
      case "line-graph":
        return <LineGraph data={chartData} />;
      case "heat-map":
        return <HeatMap data={[]} />;
      case "radar-chart":
        return <RadarChart data={[]} />;
      case "word-cloud":
        const wordData = chartData.map(({ name, value }) => ({
          text: name,
          value,
        }));
        return <WordCloud words={wordData} />;
      case "histogram":
        const histogramData = chartData.map(({ name, value }) => ({
          bin: name,
          frequency: value,
        }));
        return <Histogram data={histogramData} />;
      case "gauge-chart":
        // You'll need to calculate an average or aggregate value for gauge charts
        const totalResponses = chartData.reduce(
          (acc, { value }) => acc + value,
          0
        );
        const averageValue = totalResponses / chartData.length;
        return <GaugeChart value={averageValue} min={0} max={100} />;
      default:
        return <p>Unsupported chart type</p>;
    }
  };

  return (
    <div className="space-y-8">
      {questions.map((question) => {
        const currentChartType =
          chartTypes[question.id] || getDefaultChartType(question.type);
        const availableChartTypes =
          responseVisualizations[
            question.type as keyof typeof responseVisualizations
          ];

        return (
          <div key={question.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">{question.text}</h2>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">
                Type:{" "}
                {
                  surveyQuestions.find(({ type }) => type === question.type)
                    ?.label
                }
              </p>
              <select
                value={currentChartType}
                onChange={(e) =>
                  handleChartTypeChange(question.id, e.target.value)
                }
                className="border rounded px-2 py-1"
              >
                {availableChartTypes.map((type) => (
                  <option key={type} value={type}>
                    {type
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-64">
              {renderChart(question, currentChartType)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResponsesView;
