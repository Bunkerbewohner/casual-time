import { Component } from 'react';
import * as React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./Home";
import Timefinder from "./timefinder";
export default class App extends Component {
    render() {
        return React.createElement(Router, null,
            React.createElement("div", { className: "App" },
                React.createElement(Route, { exact: true, path: "/", component: Home }),
                React.createElement(Route, { path: "/:id", component: Timefinder })));
    }
}
