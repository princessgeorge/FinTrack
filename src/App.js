import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MonthlyBudget from './components/MonthlyBudget';
import TransactionsList from './components/TransactionsList';
import TransactionFormModal from './components/TransactionFormModal';
import './App.css';
import ChartsSection from './components/ChartsSection';


function App() {
  const [transactions, setTransactions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Income');

  useEffect(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
  if (Array.isArray(savedTransactions)) {
    setTransactions(savedTransactions);
  } else {
    setTransactions([]);
  }
}, []);


  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleAddClick = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <div className="App">
      <Header />
      <Dashboard transactions={transactions} onAdd={handleAddClick} />
  <MonthlyBudget transactions={transactions} />
   <TransactionsList transactions={transactions} onDelete={deleteTransaction} />
      {modalOpen && (
        <TransactionFormModal
          type={modalType}
          onSave={addTransaction}
          onClose={() => setModalOpen(false)}
        />
        
      )}
      <ChartsSection transactions={transactions} />

    </div>
  );
}

export default App;
