import React from 'react';

const TransactionItem = ({ transaction, onDelete }) => {
  return (
    <div className="transaction-item">
      <div>
        <strong>{transaction.type}</strong> - {transaction.category}
      </div>
      <div>
        ${transaction.amount} | {transaction.date}
      </div>
      <button onClick={() => onDelete(transaction.id)}>Delete</button>
    </div>
  );
};

export default TransactionItem;
