import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render(){

        return (
            <div className="App">
               <Home />
            </div>
        );
    }
}
