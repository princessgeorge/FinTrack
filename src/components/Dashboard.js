// src/components/Dashboard.js
import React from 'react';

const Dashboard = ({ transactions, onAdd }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="dashboard">
      <div className="summary-card">
        <h3>Total Income</h3>
        <p>${totalIncome}</p>
      </div>
      <div className="summary-card">
        <h3>Total Expenses</h3>
        <p>${totalExpenses}</p>
      </div>
      <div className="summary-card">
        <h3>Balance</h3>
        <p>${balance}</p>
      </div>
      <div className="actions">
        <button onClick={() => onAdd('Income')}>Add Income</button>
        <button onClick={() => onAdd('Expense')}>Add Expense</button>
      </div>
    </div>
  );
};

export default Dashboard;
