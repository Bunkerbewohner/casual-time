import React, { Component } from 'react';
import './App.css';
class App extends Component {
    render() {
        return (React.createElement("div", { className: "App" },
            React.createElement("div", { className: "App-header" },
                React.createElement("h2", null, "Welcome to React!")),
            React.createElement("p", { className: "App-intro" },
                "To get started, edit ",
                React.createElement("code", null, "src/App.js"),
                " and save to reload.")));
    }
}
export default App;
