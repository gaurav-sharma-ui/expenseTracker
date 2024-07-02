import styled from 'styled-components';

const TotalPriceStructure = styled.div`
color: #fff;
display: flex;
padding: 15px 15px;
align-items: center;
border-radius: 10px;
justify-content: center;
background-color: #282c34;
flex-direction: column;
`
export default function TotalPrice(){
    return(
        <TotalPriceStructure className="total__price">
            <small>Spend So Far</small>
            <p>Rs.2000</p>
        </TotalPriceStructure>
    )
}