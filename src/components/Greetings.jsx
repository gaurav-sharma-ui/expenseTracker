import styled from 'styled-components';
import myImage from '../images/user-image.jpg';

const Image = styled.img`
width:50px;
height:50px;
border-radius:50%;
margin-right: 10px;
`
export default function Greetings(){
    return(
        <div className="user__greeting">
            <Image src={myImage} alt="User Image" />
            <p>
                <strong>{new Date().getHours() > 12 ? 'Good Evening' : 'Good Morning'} Gaurav</strong>
                <br/><small>Track your expenses</small>
            </p>
        </div>
    )
}