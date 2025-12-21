import React, { useState } from 'react';
import TransactionItem from './TransactionItem';
import './TransactionsList.css';

const TransactionsList = ({ transactions, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All'); // All, Income, Expense

  // Filter transactions based on search and type
  const filteredTransactions = transactions.filter((transaction) => {
    const text = searchTerm.toLowerCase();

    const desc = transaction.note ? transaction.note.toLowerCase() : '';
    const cat = transaction.category ? transaction.category.toLowerCase() : '';
    const date = transaction.date ? transaction.date.toLowerCase() : '';
    const amount = transaction.amount ? transaction.amount.toString() : '';

    const matchesSearch =
      desc.includes(text) || cat.includes(text) || date.includes(text) || amount.includes(text);

    const matchesFilter =
      filterType === 'All' ? true : transaction.type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="transactions-list">
      <h2 className="transactions-heading">Transaction History</h2>

      {/* 🔍 Search Box */}
      <input
        type="text"
        placeholder="Search transactions..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🔘 Filter Buttons */}
      <div className="filter-buttons">
        {['All', 'Income', 'Expense'].map((type) => (
          <button
            key={type}
            className={filterType === type ? 'active' : ''}
            onClick={() => setFilterType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 🧾 Filtered Results */}
      {filteredTransactions.length > 0 ? (
  filteredTransactions.map((transaction) => (
    <TransactionItem
      key={transaction.id}
      transaction={transaction}
      onDelete={onDelete}
      onEdit={onEdit}
      className="fade-in"
    />
  ))
) : (
  <p className="no-transactions">No matching transactions</p>
)}

    </div>
  );
};

export default TransactionsList;
