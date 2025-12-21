import React, { useState } from 'react';
import TransactionItem from './TransactionItem';
import './TransactionsList.css';

const TransactionsList = ({ transactions, onDelete }) => {
  // 🔹 State for search
  const [searchTerm, setSearchTerm] = useState("");
  // 🔹 State for filter type
  const [filterType, setFilterType] = useState("All"); // All, Income, Expense

  // 🔹 Filter transactions based on type and search term
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by type
    if (filterType !== "All" && transaction.type !== filterType) return false;

    // Filter by search term
    const text = searchTerm.toLowerCase();
    const desc = transaction.description ? transaction.description.toLowerCase() : "";
    const cat = transaction.category ? transaction.category.toLowerCase() : "";
    const date = transaction.date ? transaction.date.toLowerCase() : "";
    const amount = transaction.amount ? transaction.amount.toString() : "";

    return (
      desc.includes(text) ||
      cat.includes(text) ||
      date.includes(text) ||
      amount.includes(text)
    );
  });

  return (
    <div className="transactions-list">
      <h2 className="transactions-heading">Transaction History</h2>

      {/* 🔹 Filter Buttons */}
      <div className="filter-buttons">
        <button 
          className={filterType === "All" ? "active" : ""} 
          onClick={() => setFilterType("All")}>
          All
        </button>
        <button 
          className={filterType === "Income" ? "active" : ""} 
          onClick={() => setFilterType("Income")}>
          Income
        </button>
        <button 
          className={filterType === "Expense" ? "active" : ""} 
          onClick={() => setFilterType("Expense")}>
          Expense
        </button>
      </div>

      {/* 🔍 Search Box */}
      <input
        type="text"
        placeholder="Search transactions..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🧾 Filtered Results */}
      {filteredTransactions.length > 0 ? (
        filteredTransactions.map(transaction => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p className="no-transactions">No matching transactions</p>
      )}
    </div>
  );
};

export default TransactionsList;
