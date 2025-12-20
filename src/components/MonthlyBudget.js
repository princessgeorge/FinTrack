import React, { useState } from 'react';
import './MonthlyBudget.css';

const MonthlyBudget = ({ transactions }) => {
  const [budget, setBudget] = useState('');
  const [currentBudget, setCurrentBudget] = useState(
    localStorage.getItem('monthlyBudget') || 0
  );

  const totalExpenses = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const handleSaveBudget = () => {
    localStorage.setItem('monthlyBudget', budget);
    setCurrentBudget(budget);
    setBudget('');
  };

  const budgetExceeded = totalExpenses > currentBudget;
  const percentageUsed =
    currentBudget > 0 ? Math.min((totalExpenses / currentBudget) * 100, 100) : 0;

  return (
    <div className="monthly-budget">
      <h2>Monthly Budget</h2>
      <div className="budget-controls">
        <input
          type="number"
          placeholder="Enter budget"
          value={budget}
          onChange={e => setBudget(e.target.value)}
        />
        <button onClick={handleSaveBudget}>Save</button>
      </div>
      <p>Current Budget: ${currentBudget}</p>
      <p>Total Expenses: ${totalExpenses}</p>

      {/* Progress bar with percentage */}
      <div className="budget-progress-bar">
        <div
          className={`budget-progress-fill ${budgetExceeded ? 'over' : ''}`}
          style={{ width: `${percentageUsed}%` }}
        >
          <span className="budget-percentage">{Math.round(percentageUsed)}%</span>
        </div>
      </div>

      {budgetExceeded && (
        <p className="budget-warning">⚠ You have exceeded your budget!</p>
      )}
    </div>
  );
};

export default MonthlyBudget;
