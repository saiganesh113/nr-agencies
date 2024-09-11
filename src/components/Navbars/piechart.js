// src/components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ acService, washingMachineService, workCompletionRate, customerRating, timeCommitment }) => {
  // Calculate percentages
  const total = acService + washingMachineService + workCompletionRate + customerRating + timeCommitment;
  const acServicePercentage = (acService / total) * 100;
  const washingMachineServicePercentage = (washingMachineService / total) * 100;
  const workCompletionRatePercentage = (workCompletionRate / total) * 100;
  const customerRatingPercentage = (customerRating / total) * 100;
  const timeCommitmentPercentage = (timeCommitment / total) * 100;

  const data = {
    labels: [
      'AC Service',
      'Washing Machine Service',
      'Work Completion Rate',
      'Customer Rating',
      'Time Commitment'
    ],
    datasets: [
      {
        label: 'Metrics Distribution',
        data: [
          acServicePercentage,
          washingMachineServicePercentage,
          workCompletionRatePercentage,
          customerRatingPercentage,
          timeCommitmentPercentage
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="my-4">
      <Pie data={data} />
    </div>
  );
};

export default PieChart;