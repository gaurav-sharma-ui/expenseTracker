import { useState } from "react"
import styled from 'styled-components';

const FilterContainer = styled.div`
display: flex;
padding: 5px 0 15px 0;
text-align: center;
justify-content: space-between;

label {
font-size: 12px;
}

select{
    width: 90px;
    padding: 5px 10px;
    font-size: 12px;
    border: 1px solid #282c34;
    border-radius: 10px;
    background-color: white;
    margin-top: 2px;
}
`

export default function FilterPills(){
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedWeek,setSelectedWeek] = useState('Week-1');
    const [selectedDay,setSelectedDay] = useState(1);

    const getDaysInMonth = (month) => {
        const year = new Date().getFullYear(); // Use current year
        return new Date(year, month + 1, 0).getDate();
    };

    const filterMonths = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

    const filterWeeks = ['Week-1', 'Week-2', 'Week-3', 'Week-4', 'Week-5'];
    const filterDays = Array.from({ length: getDaysInMonth(selectedMonth) }, (_, i) => i + 1);

      function handleDayChange(e){
        const newDay = parseInt(e.target.value);
        setSelectedDay(newDay)
      }

      function handleMonthChange(e){
        const newMonth = parseInt(e.target.value);
        setSelectedMonth(newMonth);
      }

      function handleWeekChange(e){
        setSelectedWeek(e.target.value);
      }

      return(
        <FilterContainer>
            <div className="select-container">
                <label>Days</label>
                <select value={selectedDay} onChange={handleDayChange}>
                    {filterDays.map((days,index)=>{
                        return(
                            <option key={index} value={days}>{days}</option>
                        )
                    })   }
                </select>
            </div>
            <div>
                <label>Week</label>
                <select value={selectedWeek} onChange={handleWeekChange}>
                    {filterWeeks.map((week,index)=>{
                        return(
                            <option value={week} key={index}>{week}</option>
                        )
                    })}
                </select>
            </div>
            <div>
                <label>Month</label>
                <select value={selectedMonth} onChange={handleMonthChange}>
                {
                    filterMonths.map((month,index)=>{
                        return (<option value={index} key={index}>{month}</option>)
                    })
                }
                </select>
            </div>
        </FilterContainer>
    )
}