import { Component } from 'react';
import * as React from 'react';
import './styles/App.css';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Home from "./Home";
import Timefinder from "./timefinder";

export default class App extends Component<any, any> {
  render() {
    return <Router>
      <div className="App">
        <Route exact path="/" component={Home}/>
        <Route path="/time/:id" component={Timefinder}/>
      </div>
    </Router>;
  }
}
