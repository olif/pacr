import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { TimePicker, DistancePicker, PaceResult } from './Components';
import './App.css';

const GlobalStyle = createGlobalStyle`
  margin: 0;
  padding: 0;
`

const Page = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`

const Content = styled.div`
`

const Row = styled.div`
  margin: 20px 0;
`

const Header = styled.h1`
  font-size: 68px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  font-family: 'Pacifico', cursive;
  margin: 20px;
`

const GoButton = styled.button`
  padding: 10px;
  width: 100%;
  outline: none;
  background: #465775;
  box-shadow: 3px 3px rgb(174, 86, 115);
  font-size: 32px;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  &:active {
    background-color: #51b493;
    transform: translateY(2px);
  }
  &:hover {
    color: #eee;
  }
`

const App: React.FC = () => {

  const [time, setTime] = useState(80.25)
  const [distance, setDistance] = useState(21.0975)
  const [pace, setPace] = useState(time / distance)

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setPace(time / distance)
    }
  }

  return (
    <Page onKeyPress={handleKeyPress}>
      <Header>Pacr.</Header>
      <Content>
        <GlobalStyle />
        <Row>
          <TimePicker defaultMinutes={time} onChange={(minutes) => setTime(minutes)} />
        </Row>
        <Row>
          <DistancePicker defaultDistance={distance} onChange={setDistance} />
        </Row>
        <Row>
          <GoButton onClick={() => setPace(time / distance)}>GO!</GoButton>
        </Row>
        <Row>
          <PaceResult paceInMinutes={pace} />
        </Row>
      </Content>
    </Page>
  );
}

export default App;
