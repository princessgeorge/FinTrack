import React from 'react';
import './TransactionItem.css';

const TransactionItem = ({ transaction, onDelete, onEdit, className }) => {
  const itemClass =
    (transaction.type === 'Income' ? 'income-transaction ' : 'expense-transaction ') +
    'transaction-item ' +
    (className || '');

  return (
    <div className={itemClass}>
      <div className="transaction-left">
        <span
          className={`transaction-type-label ${
            transaction.type === 'Income' ? 'income-label' : 'expense-label'
          }`}
        >
          {transaction.type}
        </span>
        <span className="transaction-category">{transaction.category}</span>
        <span className="transaction-note">{transaction.note}</span>
        <span className="transaction-date">{transaction.date}</span>
      </div>
      
      <div className="transaction-right">
        <span className="transaction-amount">${transaction.amount}</span>
        <button className="delete-btn" onClick={() => onDelete(transaction.id)}>×</button>
        <button className="edit-btn" onClick={() => onEdit(transaction)}>✎</button>
      </div>
    </div>
  );
};

export default TransactionItem;
