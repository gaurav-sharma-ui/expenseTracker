import { useState } from 'react';
import styled from 'styled-components';
import Greetings from './components/Greetings';
import TotalPrice from './components/TotalPrice';
import TimePillList from './components/TimePillList';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

const Container = styled.div`
  max-width: 375px;
  margin: 0 auto;
  height: 100vh;
  position: relative;
  padding: 15px 30px;
  background-color: #f6f8fa;
`;

function App() {
  const savedExpenses = localStorage.getItem('expenses');
  const initialExpenses = savedExpenses ? JSON.parse(savedExpenses) : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseLists, setExpenseLists] = useState(initialExpenses);
  const [totalPrice, setTotalPrice] = useState(() => {
    // Initialize total price based on existing expenses
    return initialExpenses.reduce((acc, expense) => acc + parseInt(expense.amount, 10), 0);
  });

  const handleClickModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddExpense = (expense) => {
    const updatedExpenses = [expense, ...expenseLists];
    setExpenseLists(updatedExpenses);
    updateTotalPrice(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const handleDeleteExpense = (id) => {
    const updatedList = expenseLists.filter((expense) => expense.id !== id);
    setExpenseLists(updatedList);
    updateTotalPrice(updatedList);
    localStorage.setItem('expenses', JSON.stringify(updatedList));
  };

  const updateTotalPrice = (expenses) => {
    const total = expenses.reduce((acc, expense) => acc + parseInt(expense.amount, 10), 0);
    setTotalPrice(total);
  };

  return (
    <div className="App">
      <Container>
        <header className="App-header">
          <Greetings />
          <TimePillList />
          <TotalPrice totalPrice={totalPrice} />
        </header>
        <main>
          <ExpenseList expenseLists={expenseLists} onDeleteExpense={handleDeleteExpense} />
          <ExpenseForm isOpen={isModalOpen} handleClickModal={handleClickModal} onAddExpense={handleAddExpense} />
          <button className="add__expense" onClick={handleClickModal}>
            Add Expense
          </button>
        </main>
      </Container>
    </div>
  );
}

export default App;
