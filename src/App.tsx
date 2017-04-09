import { Component } from 'react';
import * as React from 'react';
import './styles/App.css';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Home from "./Home";
import Timefinder from "./timefinder";
import {User} from "./model/User";

import classNames from "classnames"

interface AppState {
  user: User;
}

export default class App extends Component<any, AppState> {
  state = {
    user: null
  }

  render() {
    const className = classNames("App", {authenticated: this.state.user != null})

    return <Router>
      <div className={className}>
        <div id="firebaseui-auth-container"/>

        <Route exact path="/" component={Home}/>
        <Route path="/time/:id" component={Timefinder}/>
      </div>
    </Router>;
  }
}
