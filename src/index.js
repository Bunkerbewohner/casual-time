import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';
import * as firebase from "firebase"
import * as firebaseui from "firebaseui"

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDSX523R89FMytrGL48G8RqBxJwq_j0xNM",
    authDomain: "casualtime-acb5c.firebaseapp.com",
    databaseURL: "https://casualtime-acb5c.firebaseio.com",
    projectId: "casualtime-acb5c",
    storageBucket: "casualtime-acb5c.appspot.com",
    messagingSenderId: "424399027284"
};
firebase.initializeApp(config);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
