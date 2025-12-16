import React from 'react';
import TransactionItem from './TransactionItem';

const TransactionsList = ({ transactions, onDelete }) => {
  if (transactions.length === 0) return <p>No transactions yet</p>;

  return (
    <div className="transactions-list">
      {transactions.map(transaction => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TransactionsList;
