import React from 'react';
import TransactionItem from './TransactionItem';
import './TransactionsList.css';


const TransactionsList = ({ transactions, onDelete }) => {
  if (!transactions || transactions.length === 0) {
    return <p className="no-transactions">No transactions yet</p>;
  }

  return (
    <div className="transactions-list">
      <h2 className="transactions-heading">Transaction History</h2>
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
