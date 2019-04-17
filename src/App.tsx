import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import MainComponent from './components/_main';
import store from './store'

const _App = () => <Provider store={store}><App /></Provider>

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainComponent />
      </div>
    );
  }
}

export default _App;
