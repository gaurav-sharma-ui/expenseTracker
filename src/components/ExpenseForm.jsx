import styled from 'styled-components';
import {useState,useRef} from 'react';

// Container for the form elements
const FormGroup = styled.div`
  margin-bottom: 1rem;
  span{
  display:none;
  &.error{
  display: block;
  color:#D51D25;
  font-size: 12px;
  }
}
`;

const Button = styled.button`
    width: 100%;
    background: #282c34;
    padding: 10px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`

// Styled label
const Label = styled.label`
    font-size:13px;
    display: block;
    font-weight: 700;
    margin-bottom: 0.5rem;
`;

// Styled input
const Input = styled.input`
    width: 100%;
    height: 40px;
    padding: 0.8rem;
    font-size: 14px;
    border-radius: 6px;
    border: solid 1px transparent;
    background-color:#f6f8fa;

  &:focus {
    border: solid 1px #4683f2;
    outline: none;
  }
`;

export default function ExpenseForm({isOpen,handleClickModal,onAddExpense}){
    const [name,setName] = useState('');
    const inputRef = useRef(null);
    const [amount,setAmount] = useState('');
    const [counter,setCounter] = useState(0);
    const [nameValidation,setNameValidation] =useState(false);
    const [amountValidation,setAmountValidation] =useState(false);

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-based, so add 1
    const year = today.getFullYear();
    const monthName = today.toLocaleString('default', { month: 'long' });
    const formattedDate = `${day}/${month}/${year}`;
    const displayDate = `${monthName} ${day},${year}`

    function handleNameChange(e){
        setName(e.target.value);
        setNameValidation(false); // Reset validation on change
    }
    function handleAmountChange(e){
        setAmount(e.target.value);
        setAmountValidation(false); // Reset validation on change
    }
    function handleFormSubmit(e){
        e.preventDefault();

        let isValid = true;
        if(name.length === 0){
            setNameValidation(true);
            isValid = false;
        }
        if(amount.length === 0){
            setAmountValidation(true)
            isValid = false;
        }

        if(!isValid){
            return;
        }
        const id=counter;
        let expenseData={
            id,
            name,
            amount,
            date:formattedDate,
            displayDate:displayDate
        }
        onAddExpense(expenseData)
        setCounter(counter+1);
        setName('');
        setAmount('');
        handleClickModal();
    }

    // Ensure input focus when modal opens
    if (isOpen) {
        setTimeout(() => {
        inputRef.current.focus();
        }, 0); // Delay to ensure modal DOM update
    }

    return(
        <div className={`${isOpen ? 'active' : ''} expense__form`}>
            <span onClick={handleClickModal} className="expense__form-cancel">X</span>
            <h2>Add any new Expense</h2>
            <small>Enter the details of your expense</small>
            <form onSubmit={handleFormSubmit} style={{marginTop: '25px'}}>
                <FormGroup>
                    <Label>Description</Label>
                    <Input
                        type="text"
                        value={name}
                        ref={inputRef}
                        onChange={handleNameChange}
                        />
                    <span className={`${nameValidation ? 'error' : ''}`}>Please fill in the value</span>
                </FormGroup>
                <FormGroup>
                    <Label>Enter Amount</Label>
                    <Input
                        type="number"
                        value={amount}
                        min="0"
                        onChange={handleAmountChange}
                        />
                    <span className={`${amountValidation ? 'error' : ''}`}>Please fill in the value</span>
                </FormGroup>
                <FormGroup>
                    <Label>Date</Label>
                    <Input
                        type="type"
                        readOnly
                        value={displayDate}
                    />
                </FormGroup>
                <FormGroup style={{marginTop: '30px'}}>
                    <Button>SUBMIT</Button>
                </FormGroup>
            </form>
        </div>
    )
}