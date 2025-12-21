import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MonthlyBudget from './components/MonthlyBudget';
import TransactionsList from './components/TransactionsList';
import TransactionFormModal from './components/TransactionFormModal';
import ChartsSection from './components/ChartsSection';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Income');
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Load transactions from localStorage
  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (Array.isArray(savedTransactions)) {
      setTransactions(savedTransactions);
    } else {
      setTransactions([]);
    }
  }, []);

  // Save transactions to localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Add new transaction
  const addTransaction = (transaction) => {
    if (editingTransaction) {
      // Update existing transaction
      setTransactions(
        transactions.map((t) =>
          t.id === editingTransaction.id ? { ...transaction, id: editingTransaction.id } : t
        )
      );
      setEditingTransaction(null);
    } else {
      // Add new transaction
      setTransactions([...transactions, transaction]);
    }
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Open modal to add new transaction
  const handleAddClick = (type) => {
    setModalType(type);
    setEditingTransaction(null);
    setModalOpen(true);
  };

  // Open modal to edit existing transaction
  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setModalType(transaction.type);
    setModalOpen(true);
  };

  return (
    <div className="App">
      <Header />

      {/* Dashboard with Add buttons */}
      <Dashboard transactions={transactions} onAdd={handleAddClick} />

      {/* Monthly Budget section */}
      <MonthlyBudget transactions={transactions} />

      {/* Transaction History with Search, Filter, Edit, Delete */}
      <TransactionsList
        transactions={transactions}
        onDelete={deleteTransaction}
        onEdit={handleEditTransaction}
      />

      {/* Add/Edit Transaction Modal */}
      {modalOpen && (
        <TransactionFormModal
          type={modalType}
          onSave={addTransaction}
          onClose={() => setModalOpen(false)}
          editingTransaction={editingTransaction}
        />
      )}

      {/* Charts Section */}
      <ChartsSection transactions={transactions} />
    </div>
  );
}

export default App;
