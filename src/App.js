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
    const today = new Date().getDate();
    return initialExpenses.filter((expense) => {
      const expenseDate = new Date(expense.timeStamp);
      return expenseDate.getDate() === today;
    });
  });
  const [totalPrice, setTotalPrice] = useState(() => {
    return initialExpenses.reduce((acc, expense) => acc + parseInt(expense.amount, 10), 0);
  });

  const handleClickModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddExpense = (expense) => {
    // Update expenseLists with the new expense
    const updatedExpenses = [expense, ...expenseLists];
    setExpenseLists(updatedExpenses);

    // Filter the updated list based on selectedDay
    const filtered = updatedExpenses.filter((exp) => {
      const expenseDate = new Date(exp.timeStamp);
      return expenseDate.getDate() === selectedDay;
    });

    // Update filteredExpenses with the newly filtered list
    setFilteredExpenses(filtered);

    // Update total price
    updateTotalPrice(updatedExpenses);

    // Update localStorage
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };


  const handleDeleteExpense = (id) => {
    // Remove the expense from expenseLists
    const updatedList = expenseLists.filter((expense) => expense.id !== id);
    setExpenseLists(updatedList);
    // Filter the updated list based on selectedDay
    const filtered = updatedList.filter((expense) => {
      const expenseDate = new Date(expense.timeStamp);
      return expenseDate.getDate() === selectedDay;
    });

    // Update filteredExpenses with the newly filtered list
    setFilteredExpenses(filtered);

    // Update total price
    updateTotalPrice(updatedList);

    // Update localStorage
    localStorage.setItem('expenses', JSON.stringify(updatedList));
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
