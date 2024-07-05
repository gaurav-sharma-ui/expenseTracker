import styled from 'styled-components';

const List = styled.li`
    list-style: none;
    background: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 1rem;
    position: relative;
    p{
     label{
            display: block;
            font-size: 10px;
            font-weight: 700;
            color: #0f274d;
        }
    }
    button {
        right: 2px;
        top: -11px;
        border: none;
        font-size: 9px;
        cursor: pointer;
        padding: 4px 6px;
        border-radius: 10px;
        position: absolute;
        background: #D51D25;
        color: #fff;
    }
    `
export default function Expenses({id,name,amount,date,onDeleteExpense,displayDate}){
    return(
        <List id={id} data-date={date}>
            <p>
                <label>Spend On</label>
                <span>{name.charAt(0).toUpperCase()+name.slice(1)}</span>
            </p>
            <p>
                <label>Date</label>
                <span>{displayDate}</span>
            </p>
            <p>
                <label>Amount</label>
                <span>Rs.{amount}</span>
            </p>
            <button onClick={()=>onDeleteExpense(id)}>X</button>
        </List>
    )
}