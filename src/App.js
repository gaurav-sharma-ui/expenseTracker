/*
1 - Value added should come first and not last - DONE
2 - cancel button should delete the record - DONE


3 - once the iexpense is added it should update the total
4 - user can filter as week wise and month wise
5 - when i click on add expense the description field
should get the focus automatically
6 - Form validation
*/

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
  // Initialize state with data from localStorage or an empty array
  const savedExpenses = localStorage.getItem('expenses');
  const initialExpenses = savedExpenses ? JSON.parse(savedExpenses) : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseLists, setExpenseLists] = useState(initialExpenses);

  function handleClickModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleAddExpense(expense) {
    const updatedExpenses = [expense, ...expenseLists];
    setExpenseLists(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  }

  function handleDeleteExpense(id) {
    const updatedList = expenseLists.filter((list) => {
      return list.id !== id;
    })
    setExpenseLists(updatedList);
    localStorage.setItem('expenses', JSON.stringify(updatedList));
  }

  return (
    <div className="App">
      <Container>
        <header className="App-header">
          <Greetings />
          <TimePillList />
          <TotalPrice />
        </header>
        <main>
          <ExpenseList
            expenseLists={expenseLists}
            onDeleteExpense={handleDeleteExpense}
          />
          <ExpenseForm
            isOpen={isModalOpen}
            handleClickModal={handleClickModal}
            onAddExpense={handleAddExpense}
          />
          <button className="add__expense" onClick={handleClickModal}>Add Expense</button>
        </main>
      </Container>
    </div>
  );
}

export default App;
