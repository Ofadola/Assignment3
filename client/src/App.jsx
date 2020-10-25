import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Game from './components/Game';
import Home from './components/Home';
import Host from './components/Host';
import Join from './components/Join';
import Select from './components/Select';
import GameProvider from './contexts/GameContext';

function App() {
  return (
    <GameProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/join" component={Join}/>
          <Route exact path="/host" component={Host}/>
          <Route exact path="/select" component={Select}/>
          <Route exact path="/game" component={Game}/>
        </Switch>
      </Router>
    </GameProvider>
  );
}

export default App;
