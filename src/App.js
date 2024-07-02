import Greetings from './components/Greetings';
import TotalPrice from './components/TotalPrice';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 10px 10px;
`;

function App() {
  return (
    <div className="App">
      <Container>
        <header className="App-header">
          <Greetings />
          <TotalPrice />
        </header>
      </Container>
    </div>
  );
}

export default App;
