import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

type State = {
  breweries: string[];
}

class App extends React.Component<{}, State> {
  state: State = {
    breweries: [],
  }




  render() {
    const { breweries } = this.state
    return (
      <div>
      <h1>HI</h1>
      <p>{breweries}</p>
      </div>
    )
  }
}

export default App;
