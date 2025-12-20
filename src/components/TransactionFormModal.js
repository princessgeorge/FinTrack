import React, { useState } from 'react';

const TransactionFormModal = ({ onSave, onClose, type }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    // Validate inputs
    if (!amount || !category || !date || Number(amount) <= 0) {
      alert('Please fill all fields correctly');
      return;
    }

    // Save the transaction
    onSave({
      id: Date.now(),                // unique id
      type,                           // Income or Expense
      amount: Number(amount),         // convert to number
      category,
      date,
      note: note || ''                // default empty string if note not entered
    });

    // Reset form
    setAmount('');
    setCategory('');
    setDate('');
    setNote('');

    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h3>Add {type}</h3>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default TransactionFormModal;
