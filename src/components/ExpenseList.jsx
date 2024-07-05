import Expenses from './Expenses';
import styled from 'styled-components';

const NoList = styled.p`
text-align: center;
max-width: 280px;
margin: 0 auto;
margin-top: 2rem;
`
export default function ExpenseList({expenseLists,onDeleteExpense}){
    return(
        <div>
            {expenseLists.length === 0 ? (
                <NoList>Start adding expenses, no expenses added up till now</NoList>
            ) : (
            <ul className="expense__list">
                {expenseLists.map((expense)=>{
                    return(
                        <Expenses
                            key={expense.id}
                            id={expense.id}
                            name={expense.name}
                            amount={expense.amount}
                            date={expense.date}
                            displayDate={expense.displayDate}
                            onDeleteExpense={onDeleteExpense}
                        />
                    )
                })}
            </ul>
            )}
        </div>
    )
}