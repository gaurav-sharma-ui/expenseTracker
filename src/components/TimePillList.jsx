import { useState} from "react"
import TimePill from './TimePill';
export default function TimePillList(){
    const [activePill,setActivePill] = useState(null);
    const pills = ['W-One','W-Two','W-Three','W-Four','Month'];

    function handlePillClick(pill){
        setActivePill(pill);
    }
    return(
        <ul className='time__pill'>
            {pills.map((pill)=>{
                return(
                    <TimePill
                        key={pill}
                        title={pill}
                        isActive={activePill === pill}
                        onPillClick={()=>handlePillClick(pill)}
                    />
            )
            })}
        </ul>
    )
}