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
  const [theme, setTheme] = useState('light');

  // Load transactions
  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (Array.isArray(savedTransactions)) setTransactions(savedTransactions);
    else setTransactions([]);
  }, []);

  // Save transactions
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addTransaction = (transaction) => {
    if (editingTransaction) {
      setTransactions(transactions.map(t => t.id === transaction.id ? transaction : t));
      setEditingTransaction(null);
    } else {
      setTransactions([...transactions, transaction]);
    }
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleAddClick = (type) => {
    setModalType(type);
    setModalOpen(true);
    setEditingTransaction(null);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setModalType(transaction.type);
    setModalOpen(true);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleExportCSV = () => {
    if (transactions.length === 0) {
      alert("No transactions to export!");
      return;
    }

    const headers = ["ID", "Type", "Amount", "Category", "Date", "Note"];
    const rows = transactions.map(t => [t.id, t.type, t.amount, t.category, t.date, t.note]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "fintrack_transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Dashboard transactions={transactions} onAdd={handleAddClick} onExport={handleExportCSV} />
      <MonthlyBudget transactions={transactions} />
      <TransactionsList 
        transactions={transactions} 
        onDelete={deleteTransaction} 
        onEdit={handleEditTransaction} 
      />
      {modalOpen && (
        <TransactionFormModal
          type={modalType}
          onSave={addTransaction}
          onClose={() => setModalOpen(false)}
          editingTransaction={editingTransaction}
        />
      )}
      <ChartsSection transactions={transactions} />
    </div>
  );
}

export default App;
