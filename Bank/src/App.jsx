import { useState, useEffect } from 'react';
import TransactionList from './components/TransactionList.jsx';
import TransactionForm from './components/TransactionForm.jsx';
import './App.css';
 
function App() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch from db.json
  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error('Error fetching transactions:', error));
  }, []);

  // new transaction
  const handleAddTransaction = (transaction) => {
    fetch('json-server --watch db.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...transaction, id: Date.now() }),
    })
    .then((response) => response.json())
    .then((newTransaction) => {
      setTransactions([...transactions, newTransaction]);
    })
    .catch((error) => console.error('Error adding transaction:', error));
  };

  // Filter transactions 
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1 className="heading">Bank of Flatiron</h1>
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by description"
      />
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
}

export default App;
