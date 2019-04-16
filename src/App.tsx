import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';

import HeaderComponent from './components/header';
import store from './store'

const _App = () => <Provider store={store}><HeaderComponent /></Provider>

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderComponent />
      </div>
    );
  }
}

export default _App;
