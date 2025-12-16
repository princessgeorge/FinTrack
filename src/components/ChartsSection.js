import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ChartsSection = ({ transactions }) => {

  // Prepare data for Pie Chart (Expenses by Category)
  const expenseTransactions = transactions.filter(t => t.type === 'Expense');
  const categories = [...new Set(expenseTransactions.map(t => t.category))];

  const expenseData = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: categories.map(cat => 
          expenseTransactions
            .filter(t => t.category === cat)
            .reduce((acc, t) => acc + Number(t.amount), 0)
        ),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FF9800', '#9C27B0'
        ],
        borderWidth: 1
      }
    ]
  };

  // Prepare data for Bar Chart (Income vs Expense per Month)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const incomePerMonth = months.map((month, index) => {
    return transactions
      .filter(t => t.type === 'Income' && new Date(t.date).getMonth() === index)
      .reduce((acc, t) => acc + Number(t.amount), 0);
  });

  const expensePerMonth = months.map((month, index) => {
    return transactions
      .filter(t => t.type === 'Expense' && new Date(t.date).getMonth() === index)
      .reduce((acc, t) => acc + Number(t.amount), 0);
  });

  const barData = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: incomePerMonth,
        backgroundColor: '#36A2EB'
      },
      {
        label: 'Expenses',
        data: expensePerMonth,
        backgroundColor: '#FF6384'
      }
    ]
  };

  return (
    <div className="charts-section">
      <h3>Expenses by Category</h3>
      <Pie data={expenseData} />
      
      <h3 className="bar-chart-title">Income vs Expenses (Monthly)</h3>
      <Bar data={barData} />
    </div>
  );
};

export default ChartsSection;
