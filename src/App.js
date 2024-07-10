import { useState } from 'react';
import styled from 'styled-components';
import Greetings from './components/Greetings';
import TotalPrice from './components/TotalPrice';
import FilterPills from './components/FilterPills';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

const Container = styled.div`
  max-width: 375px;
  margin: 0 auto;
  height: 95vh;
  position: relative;
  padding: 15px 30px;
  background-color: #f6f8fa;
`;

function App() {
  const savedExpenses = localStorage.getItem('expenses');
  const initialExpenses = savedExpenses ? JSON.parse(savedExpenses) : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseLists, setExpenseLists] = useState(initialExpenses);
  const [filteredExpenses, setFilteredExpenses] = useState(() => {
    const filtered = initialExpenses.filter((expense) => {
      const expenseDate = new Date(expense.timeStamp);
      return expenseDate.getDate() === new Date().getDate();
    });
    return filtered;
  });
  const [totalPrice, setTotalPrice] = useState(() => {
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
    filterExpenses(updatedExpenses, selectedDay);
  };

  const handleDeleteExpense = (id) => {
    const updatedList = expenseLists.filter((expense) => expense.id !== id);
    setExpenseLists(updatedList);
    updateTotalPrice(updatedList);
    localStorage.setItem('expenses', JSON.stringify(updatedList));
    filterExpenses(updatedList, selectedDay);
  };

  const updateTotalPrice = (expenses) => {
    const total = expenses.reduce((acc, expense) => acc + parseInt(expense.amount, 10), 0);
    setTotalPrice(total);
  };

  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const filterExpenses = (expenses, day) => {
    const filtered = expenses.filter((expense) => {
      const expenseDate = new Date(expense.timeStamp);
      return expenseDate.getDate() === day;
    });
    setFilteredExpenses(filtered);
    updateTotalPrice(filtered);
  };

  const onFilterChange = (day) => {
    setSelectedDay(day);
    filterExpenses(expenseLists, day);
  };

  return (
    <div className="App">
      <Container>
        <header className="App-header">
          <Greetings />
          <FilterPills onFilterChange={onFilterChange} />
          <TotalPrice totalPrice={totalPrice} />
        </header>
        <main>
          <ExpenseList expenseLists={filteredExpenses} onDeleteExpense={handleDeleteExpense} />
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
