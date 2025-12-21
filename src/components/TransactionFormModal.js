import React, { useState, useEffect } from 'react';
import './TransactionFormModal.css';

const TransactionFormModal = ({ type, onSave, onClose, editingTransaction }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  // Pre-fill form if editing
  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount);
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date);
      setNote(editingTransaction.note || '');
    } else {
      setAmount('');
      setCategory('');
      setDate('');
      setNote('');
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!amount || !category || !date || Number(amount) <= 0) {
      alert('Please fill all fields correctly');
      return;
    }

    onSave({
      id: editingTransaction ? editingTransaction.id : Date.now(),
      type,
      amount,
      category,
      date,
      note
    });

    // Reset form & close modal
    setAmount('');
    setCategory('');
    setDate('');
    setNote('');
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h3>{editingTransaction ? `Edit ${type}` : `Add ${type}`}</h3>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="modal-buttons">
          <button type="submit">{editingTransaction ? 'Save Changes' : 'Add Transaction'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TransactionFormModal;
