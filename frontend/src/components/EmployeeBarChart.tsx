import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  permanentCount: number;
  contractCount: number;
}

const EmployeeBarChart: React.FC<Props> = ({ permanentCount, contractCount}) => {
  const data = {
    labels: ['Permanent', 'Contract'],
    datasets: [
      {
        label: 'Number of Employees',
        data: [permanentCount, contractCount],
        backgroundColor: ['#e8f5ddff', '#f7f6d4ff'],
        borderColor: ['#4caf50', '#f3f02dff'],
        borderWidth: 1,
         // pixel-based bar width
        barThickness: 40,        
        maxBarThickness: 40,     // max width
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Employee Types' }
    },
    scales: {
      y: { 
        beginAtZero: true,
        ticks: {
            stepSize: 1
         } 
        }
    }
  };

  return <Bar data={data} options={options} height={350}/>;
};

export default EmployeeBarChart;
