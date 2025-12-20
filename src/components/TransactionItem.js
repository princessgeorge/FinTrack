import React from 'react';
import './TransactionItem.css';

const TransactionItem = ({ transaction, onDelete }) => {
  // Safety checks
  if (!transaction || !transaction.type || !transaction.amount || !transaction.id) return null;

  const isIncome = transaction.type === 'Income';
  const formattedDate = new Date(transaction.date).toLocaleDateString();

  return (
    <div className={`transaction-item ${isIncome ? 'income-transaction' : 'expense-transaction'}`}>
      
      {/* Top-right badge */}
      <span className={`transaction-type-badge ${isIncome ? 'income-badge' : 'expense-badge'}`}>
        {transaction.type}
      </span>

      <div className="transaction-left">
        <span className="transaction-category">{transaction.category}</span>
        {transaction.note && <span className="transaction-note">{transaction.note}</span>}
        <span className="transaction-date">{formattedDate}</span>
      </div>

      <div className="transaction-right">
        <span className="transaction-amount">${transaction.amount.toLocaleString()}</span>
        <button className="delete-btn" onClick={() => onDelete(transaction.id)}>✖</button>
      </div>
    </div>
  );
};

export default TransactionItem;
