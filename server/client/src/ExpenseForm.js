// client/src/ExpenseForm.js
import React, { useState } from 'react';
import axios from 'axios';

function ExpenseForm() {
  const [dateTime, setDateTime] = useState('');
  const [author, setAuthor] = useState('');
  const [sum, setSum] = useState('');
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/transactions', {
        dateTime,
        author,
        sum,
        category,
        comment,
      });
      console.log(response.data);
      alert('Transaction added successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input type="date" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
      </label>
      <label>
        Author:
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </label>
      <label>
        Sum:
        <input type="number" value={sum} onChange={(e) => setSum(e.target.value)} />
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        Comment:
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
